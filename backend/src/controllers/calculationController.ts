import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { GradingService } from '../services/gradingService.js';

const prisma = new PrismaClient();

export async function createCalculation(req: Request & { user?: { userId: string } }, res: Response) {
  try {
    const userId = req.user!.userId;
    const { title, gradingSystem, semesters } = req.body as any;
    const system = GradingService.getSystem(gradingSystem);
    if (!system) return res.status(400).json({ success: false, error: 'Invalid grading system' });

    const calc = await prisma.calculation.create({
      data: {
        userId,
        title,
        gradingSystem,
        totalCredits: 0,
        semesters: {
          create: (semesters || []).map((s: any) => ({
            semesterNumber: s.semesterNumber,
            semesterName: s.semesterName,
            credits: 0,
            courses: {
              create: (s.courses || []).map((c: any) => {
                const gp = GradingService.getGradePoints(c.gradeValue, system);
                const qp = GradingService.calculateQualityPoints(gp, c.credits);
                return {
                  courseName: c.courseName,
                  courseCode: c.courseCode,
                  credits: c.credits,
                  gradeValue: c.gradeValue,
                  gradePoints: gp,
                  qualityPoints: qp,
                  category: c.category,
                  isPassed: gp > 0,
                };
              })
            }
          }))
        }
      },
      include: { semesters: { include: { courses: true } } }
    });

    // aggregate
    let totalQP = 0;
    let totalCredits = 0;
    calc.semesters.forEach(s => {
      let semQP = 0;
      let semCredits = 0;
      s.courses.forEach(c => { semQP += c.qualityPoints; semCredits += c.credits; });
      totalQP += semQP;
      totalCredits += semCredits;
      // update semester aggregates
    });
    const cgpa = totalCredits ? totalQP / totalCredits : 0;
    const percentage = GradingService.toPercentage(cgpa, system);

    const updated = await prisma.calculation.update({
      where: { id: calc.id },
      data: { totalCredits, qualityPoints: totalQP, cgpa, gpa: cgpa, percentage },
      include: { semesters: { include: { courses: true } } }
    });

    res.status(201).json({ success: true, calculation: updated });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

export async function getCalculation(req: Request & { user?: { userId: string } }, res: Response) {
  const { id } = req.params;
  const calc = await prisma.calculation.findFirst({
    where: { id, userId: req.user!.userId },
    include: { semesters: { include: { courses: true } }, insights: true }
  });
  if (!calc) return res.status(404).json({ success: false, error: 'Not found' });
  res.json({ success: true, calculation: calc });
}

export async function listCalculations(req: Request & { user?: { userId: string } }, res: Response) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    prisma.calculation.findMany({ where: { userId: req.user!.userId }, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.calculation.count({ where: { userId: req.user!.userId } })
  ]);
  res.json({ success: true, calculations: items, pagination: { total, page, pages: Math.ceil(total / limit) } });
}

