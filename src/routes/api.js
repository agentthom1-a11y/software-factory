import { Router } from 'express';
import { z } from 'zod';
import { addRevision, createProject, listProjects } from '../services/project-service.js';

export const api = Router();

const projectSchema = z.object({
  customerName: z.string().min(2),
  source: z.enum(['SHOPEE','WHATSAPP','WEB','EMAIL','OTHER']).default('WEB'),
  productType: z.string().min(2),
  requirements: z.record(z.any()).optional()
});

const revisionSchema = z.object({
  page: z.string().min(1),
  section: z.string().min(1),
  request: z.string().min(3),
  priority: z.enum(['LOW','NORMAL','HIGH']).default('NORMAL')
});

api.get('/health', (_req,res) => res.json({ ok: true, service: 'tokofile-software-factory' }));
api.get('/projects', async (_req,res,next) => { try { res.json(await listProjects()); } catch (e) { next(e); } });
api.post('/projects', async (req,res,next) => {
  try { const data = projectSchema.parse(req.body); res.status(201).json(await createProject(data)); }
  catch (e) { next(e); }
});
api.post('/projects/:code/revisions', async (req,res,next) => {
  try { const data = revisionSchema.parse(req.body); res.status(201).json(await addRevision(req.params.code, data)); }
  catch (e) { next(e); }
});
