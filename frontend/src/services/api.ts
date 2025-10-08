import axios from 'axios';
import type { User, Calculation, GradingSystem } from '../types';

const API_BASE = ((import.meta as any).env?.VITE_API_URL as string | undefined) || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

export const calculationAPI = {
  create: async (calculation: Omit<Calculation, 'id'>) => {
    const response = await api.post('/calculations', calculation);
    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get(`/calculations/${id}`);
    return response.data;
  },
  list: async (page = 1, limit = 10) => {
    const response = await api.get(`/calculations?page=${page}&limit=${limit}`);
    return response.data;
  },
};

export const insightsAPI = {
  generate: async (calculationId: string) => {
    const response = await api.post('/insights/generate', { calculationId });
    return response.data;
  },
  predictions: async (calculationId: string) => {
    const response = await api.get(`/insights/predictions?calculationId=${calculationId}`);
    return response.data;
  },
};

export const gradingAPI = {
  getSystems: async (): Promise<GradingSystem[]> => {
    try {
      const response = await api.get('/grading-systems');
      const systems = response.data?.systems as GradingSystem[] | undefined;
      if (Array.isArray(systems) && systems.length > 0) {
        return systems;
      }
      throw new Error('Invalid grading systems response');
    } catch (error) {
      console.warn('Falling back to static grading systems', error);
      return STATIC_GRADING_SYSTEMS;
    }
  },
  convert: async (
    params: { from: string; to: string; value: number }
  ): Promise<ConversionResult> => {
    const response = await api.get(`/grading-systems/${params.to}/convert`, {
      params,
    });
    return response.data?.conversion as ConversionResult;
  },
};

const STATIC_GRADING_SYSTEMS: GradingSystem[] = [
  {
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
      { letter: 'F', points: 0.0, minPercentage: 0, maxPercentage: 59 },
    ],
  },
  {
    id: 'INDIA_10_POINT',
    name: 'India CGPA (10-Point)',
    country: 'India',
    maxPoints: 10.0,
    grades: [
      { letter: 'O', points: 10.0, minPercentage: 90, maxPercentage: 100 },
      { letter: 'A+', points: 9.0, minPercentage: 80, maxPercentage: 89 },
      { letter: 'A', points: 8.0, minPercentage: 70, maxPercentage: 79 },
      { letter: 'B+', points: 7.0, minPercentage: 60, maxPercentage: 69 },
      { letter: 'B', points: 6.0, minPercentage: 50, maxPercentage: 59 },
      { letter: 'C', points: 5.0, minPercentage: 40, maxPercentage: 49 },
      { letter: 'P', points: 4.0, minPercentage: 35, maxPercentage: 39 },
      { letter: 'F', points: 0.0, minPercentage: 0, maxPercentage: 34 },
    ],
  },
  {
    id: 'UK_DEGREE',
    name: 'UK Degree Classification',
    country: 'United Kingdom',
    maxPoints: 4.0,
    grades: [
      { letter: '1st', points: 4.0, minPercentage: 70 },
      { letter: '2:1', points: 3.3, minPercentage: 60 },
      { letter: '2:2', points: 2.7, minPercentage: 50 },
      { letter: '3rd', points: 2.0, minPercentage: 40 },
      { letter: 'Fail', points: 0.0, minPercentage: 0 },
    ],
  },
  {
    id: 'GERMANY_5_POINT',
    name: 'Germany Grade Scale',
    country: 'Germany',
    maxPoints: 5.0,
    grades: [
      { letter: '1.0', points: 4.0, minPercentage: 95 },
      { letter: '1.3', points: 3.9, minPercentage: 92 },
      { letter: '1.7', points: 3.7, minPercentage: 88 },
      { letter: '2.0', points: 3.5, minPercentage: 85 },
      { letter: '2.3', points: 3.3, minPercentage: 82 },
      { letter: '2.7', points: 3.0, minPercentage: 78 },
      { letter: '3.0', points: 2.8, minPercentage: 75 },
      { letter: '3.3', points: 2.5, minPercentage: 72 },
      { letter: '3.7', points: 2.2, minPercentage: 68 },
      { letter: '4.0', points: 2.0, minPercentage: 65 },
      { letter: '5.0', points: 0.0, minPercentage: 0 },
    ],
  },
  {
    id: 'AUSTRALIA_HD',
    name: 'Australia HD/D/C/P/F',
    country: 'Australia',
    maxPoints: 7.0,
    grades: [
      { letter: 'HD', points: 7.0, minPercentage: 85, maxPercentage: 100 },
      { letter: 'D', points: 6.0, minPercentage: 75, maxPercentage: 84 },
      { letter: 'C', points: 5.0, minPercentage: 65, maxPercentage: 74 },
      { letter: 'P', points: 4.0, minPercentage: 50, maxPercentage: 64 },
      { letter: 'F', points: 0.0, minPercentage: 0, maxPercentage: 49 },
    ],
  },
];

export interface ConversionResult {
  originalValue: number;
  originalSystem: string;
  convertedValue: number;
  convertedSystem: string;
  method?: string;
}
