import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body as { email: string; password: string; name: string };
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, error: 'Email already registered' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hash, name } });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRY || '7d' });
    res.status(201).json({ success: true, user: { id: user.id, email: user.email, name: user.name }, token });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRY || '7d' });
    res.json({ success: true, token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}


