import { GradingSystem, SYSTEMS } from '../utils/gradingSystems.js';

export class GradingService {
  static getSystem(systemId: string): GradingSystem | undefined {
    return SYSTEMS[systemId];
  }

  static getGradePoints(grade: string, system: GradingSystem): number {
    const gradeConfig = system.grades.find(g => g.letter === grade);
    return gradeConfig?.points ?? 0;
  }

  static calculateQualityPoints(gradePoints: number, credits: number): number {
    return gradePoints * credits;
  }

  static toPercentage(value: number, system: GradingSystem): number {
    switch (system.id) {
      case 'USA_4_POINT':
        return (value / system.maxPoints) * 100;
      case 'INDIA_10_POINT':
        return value * 9.5;
      default:
        return value;
    }
  }
}

