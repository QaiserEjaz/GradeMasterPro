import { create } from 'zustand';
import type { User, Calculation, GradingSystem, Semester, Course } from '../types';

interface Store {
  user: User | null;
  currentCalculation: Calculation | null;
  gradingSystem: GradingSystem | null;
  semesters: Semester[];
  setUser: (user: User | null) => void;
  setCalculation: (calc: Calculation | null) => void;
  setGradingSystem: (system: GradingSystem | null) => void;
  addSemester: () => void;
  removeSemester: (index: number) => void;
  updateSemester: (index: number, semester: Partial<Semester>) => void;
  addCourse: (semesterIndex: number) => void;
  removeCourse: (semesterIndex: number, courseIndex: number) => void;
  updateCourse: (semesterIndex: number, courseIndex: number, course: Partial<Course>) => void;
  calculateResults: () => void;
  clearCalculation: () => void;
}

export const useStore = create<Store>((set, get) => ({
  user: null,
  currentCalculation: null,
  gradingSystem: null,
  semesters: [],

  setUser: (user) => set({ user }),
  setCalculation: (calc) => set({ currentCalculation: calc }),
  setGradingSystem: (system) => set({ gradingSystem: system }),

  addSemester: () => {
    const { semesters } = get();
    const newSemester: Semester = {
      id: `sem-${Date.now()}`,
      semesterNumber: semesters.length + 1,
      semesterName: `Semester ${semesters.length + 1}`,
      credits: 0,
      courses: []
    };
    set({ semesters: [...semesters, newSemester] });
  },

  removeSemester: (index) => {
    const { semesters } = get();
    const newSemesters = semesters.filter((_, i) => i !== index);
    // Renumber semesters
    newSemesters.forEach((sem, i) => {
      sem.semesterNumber = i + 1;
      sem.semesterName = `Semester ${i + 1}`;
    });
    set({ semesters: newSemesters });
  },

  updateSemester: (index, updates) => {
    const { semesters } = get();
    const newSemesters = [...semesters];
    newSemesters[index] = { ...newSemesters[index], ...updates };
    set({ semesters: newSemesters });
  },

  addCourse: (semesterIndex) => {
    const { semesters } = get();
    const newSemesters = [...semesters];
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      courseName: '',
      courseCode: '',
      credits: 3,
      gradeValue: 'A',
      category: 'Major'
    };
    newSemesters[semesterIndex].courses.push(newCourse);
    set({ semesters: newSemesters });
  },

  removeCourse: (semesterIndex, courseIndex) => {
    const { semesters } = get();
    const newSemesters = [...semesters];
    newSemesters[semesterIndex].courses.splice(courseIndex, 1);
    set({ semesters: newSemesters });
  },

  updateCourse: (semesterIndex, courseIndex, updates) => {
    const { semesters } = get();
    const newSemesters = [...semesters];
    newSemesters[semesterIndex].courses[courseIndex] = {
      ...newSemesters[semesterIndex].courses[courseIndex],
      ...updates
    };
    set({ semesters: newSemesters });
  },

  calculateResults: () => {
    const { semesters, gradingSystem } = get();
    if (!gradingSystem) return;

    let totalQP = 0;
    let totalCredits = 0;
    const semesterGPAs: number[] = [];
    const semesterPercentages: number[] = [];
    const semesterYears: (number | null)[] = [];

    semesters.forEach(semester => {
      let semQP = 0;
      let semCredits = 0;

      semester.courses.forEach(course => {
        const gradeConfig = gradingSystem.grades.find(g => g.letter === course.gradeValue);
        const gradePoints = gradeConfig?.points || 0;
        const qualityPoints = gradePoints * course.credits;
        
        semQP += qualityPoints;
        semCredits += course.credits;
      });

      totalQP += semQP;
      totalCredits += semCredits;
      
      const semesterGPA = semCredits > 0 ? semQP / semCredits : 0;
      const semesterPercentage = gradingSystem.maxPoints > 0
        ? (semesterGPA / gradingSystem.maxPoints) * 100
        : 0;

      semesterGPAs.push(semesterGPA);
      semesterPercentages.push(semesterPercentage);
      semesterYears.push(semester.year ?? null);

      semester.gpa = Number.isFinite(semesterGPA) ? Number(semesterGPA.toFixed(2)) : 0;
      semester.percentage = Number.isFinite(semesterPercentage) ? Number(semesterPercentage.toFixed(2)) : 0;
    });

    const cgpa = totalCredits > 0 ? totalQP / totalCredits : 0;
    const percentage = gradingSystem.id === 'USA_4_POINT' 
      ? (cgpa / gradingSystem.maxPoints) * 100
      : gradingSystem.id === 'INDIA_10_POINT'
      ? cgpa * 9.5
      : cgpa;

    const results = {
      cgpa,
      totalCredits,
      qualityPoints: totalQP,
      percentage,
      semesterGPAs,
      semesterYears
    };

    set({ currentCalculation: { 
      title: 'Current Calculation',
      gradingSystem: gradingSystem.id,
      ...results,
      semesters: semesters.map((semester, index) => ({
        ...semester,
        gpa: semesterGPAs[index],
        percentage: semesterPercentages[index]
      })) 
    } });
  },

  clearCalculation: () => {
    set({ currentCalculation: null, semesters: [] });
  }
}));
