import { GradingService } from '../services/gradingService.js';
import { SYSTEMS } from '../utils/gradingSystems.js';
import type { Request, Response } from 'express';

export function getSystems(_req: Request, res: Response) {
  res.json({ success: true, systems: Object.values(SYSTEMS) });
}

export function convertGrade(req: Request, res: Response) {
  const from = String(req.query.from || '');
  const to = String(req.query.to || '');
  const value = Number(req.query.value);

  const fromSystem = SYSTEMS[from];
  const toSystem = SYSTEMS[to];

  if (!fromSystem || !toSystem) {
    return res.status(400).json({ success: false, error: 'Invalid grading system' });
  }

  if (Number.isNaN(value)) {
    return res.status(400).json({ success: false, error: 'Invalid value provided' });
  }

  const percentage = GradingService.toPercentage(value, fromSystem);
  const grade = toSystem.grades.find((g) => percentage >= g.minPercentage && (g.maxPercentage === undefined || percentage <= g.maxPercentage));

  const convertedValue = grade ? grade.points : 0;

  res.json({
    success: true,
    conversion: {
      originalValue: value,
      originalSystem: fromSystem.id,
      convertedValue,
      convertedSystem: toSystem.id,
      method: 'percentage-based grade mapping'
    }
  });
}
