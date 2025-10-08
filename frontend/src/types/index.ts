export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Course {
  id?: string;
  courseName: string;
  courseCode?: string;
  credits: number;
  gradeValue: string;
  gradePoints?: number;
  qualityPoints?: number;
  category?: string;
  isPassed?: boolean;
}

export interface Semester {
  id?: string;
  semesterNumber: number;
  semesterName: string;
  year?: number;
  gpa?: number;
  percentage?: number;
  credits: number;
  qualityPoints?: number;
  courses: Course[];
}

export interface Calculation {
  id?: string;
  title: string;
  gradingSystem: string;
  totalCredits: number;
  cgpa?: number;
  gpa?: number;
  percentage?: number;
  qualityPoints?: number;
  createdAt?: string;
  updatedAt?: string;
  semesterYears?: (number | null)[];
  semesters: Semester[];
}

export interface GradingSystem {
  id: string;
  name: string;
  country: string;
  maxPoints: number;
  grades: { letter: string; points: number; minPercentage: number; maxPercentage?: number }[];
}

export interface CalculationResults {
  cgpa: number;
  totalCredits: number;
  qualityPoints: number;
  percentage: number;
  semesterGPAs: number[];
  semesterYears?: (number | null)[];
}
