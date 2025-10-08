export type LetterGrade = { letter: string; points: number; minPercentage: number; maxPercentage?: number };

export interface GradingSystem {
  id: string;
  name: string;
  country: string;
  maxPoints: number;
  grades: LetterGrade[];
}

export const USA_4_POINT: GradingSystem = {
  id: 'USA_4_POINT',
  name: 'USA 4.0 GPA Scale',
  country: 'USA',
  maxPoints: 4.0,
  grades: [
    { letter: 'A+', points: 4.0, minPercentage: 97, maxPercentage: 100 },
    { letter: 'A', points: 4.0, minPercentage: 93, maxPercentage: 96 },
    { letter: 'A-', points: 3.7, minPercentage: 90, maxPercentage: 92 },
    { letter: 'B+', points: 3.3, minPercentage: 87, maxPercentage: 89 },
    { letter: 'B', points: 3.0, minPercentage: 83, maxPercentage: 86 },
    { letter: 'B-', points: 2.7, minPercentage: 80, maxPercentage: 82 },
    { letter: 'C+', points: 2.3, minPercentage: 77, maxPercentage: 79 },
    { letter: 'C', points: 2.0, minPercentage: 73, maxPercentage: 76 },
    { letter: 'C-', points: 1.7, minPercentage: 70, maxPercentage: 72 },
    { letter: 'D+', points: 1.3, minPercentage: 67, maxPercentage: 69 },
    { letter: 'D', points: 1.0, minPercentage: 63, maxPercentage: 66 },
    { letter: 'D-', points: 0.7, minPercentage: 60, maxPercentage: 62 },
    { letter: 'F', points: 0.0, minPercentage: 0, maxPercentage: 59 }
  ]
};

export const INDIA_10_POINT: GradingSystem = {
  id: 'INDIA_10_POINT',
  name: 'India CGPA (10-Point)',
  country: 'India',
  maxPoints: 10,
  grades: [
    { letter: 'O', points: 10.0, minPercentage: 90, maxPercentage: 100 },
    { letter: 'A+', points: 9.0, minPercentage: 80, maxPercentage: 89 },
    { letter: 'A', points: 8.0, minPercentage: 70, maxPercentage: 79 },
    { letter: 'B+', points: 7.0, minPercentage: 60, maxPercentage: 69 },
    { letter: 'B', points: 6.0, minPercentage: 50, maxPercentage: 59 },
    { letter: 'C', points: 5.0, minPercentage: 40, maxPercentage: 49 },
    { letter: 'P', points: 4.0, minPercentage: 35, maxPercentage: 39 },
    { letter: 'F', points: 0.0, minPercentage: 0, maxPercentage: 34 }
  ]
};

export const SYSTEMS: Record<string, GradingSystem> = {
  [USA_4_POINT.id]: USA_4_POINT,
  [INDIA_10_POINT.id]: INDIA_10_POINT,
};


