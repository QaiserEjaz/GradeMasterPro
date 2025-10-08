import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generateInsights(req: Request & { user?: { userId: string } }, res: Response) {
  const { calculationId } = req.body as { calculationId: string };
  const calc = await prisma.calculation.findFirst({ where: { id: calculationId, userId: req.user!.userId }, include: { semesters: { include: { courses: true } } } });
  if (!calc) return res.status(404).json({ success: false, error: 'Calculation not found' });

  // Stubbed insights
  const insights = await prisma.insight.createMany({
    data: [
      { userId: req.user!.userId, calculationId, type: 'trend', content: 'Your GPA shows a stable trend.' },
      { userId: req.user!.userId, calculationId, type: 'suggestion', content: 'Focus on core major courses next semester.' },
    ]
  });
  res.json({ success: true, insights });
}

export async function predictions(req: Request & { user?: { userId: string } }, res: Response) {
  const calculationId = String(req.query.calculationId || '');
  const calc = await prisma.calculation.findFirst({ where: { id: calculationId, userId: req.user!.userId } });
  if (!calc) return res.status(404).json({ success: false, error: 'Calculation not found' });
  res.json({ success: true, predictions: { nextSemester: { requiredGPA: 3.5, probability: 0.7, recommendations: [] }, graduation: { projectedCGPA: calc.cgpa ?? 3.2, confidence: 0.8 } } });
}

