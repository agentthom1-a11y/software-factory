import crypto from 'node:crypto';
import { pool } from '../db/pool.js';

export function projectCode() {
  const d = new Date();
  const y = String(d.getUTCFullYear()).slice(-2);
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `TKF-${y}${m}${day}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
}

export async function createProject(input) {
  const code = projectCode();
  const q = `insert into projects (code, customer_name, source, product_type, status, requirements)
             values ($1,$2,$3,$4,'INTAKE',$5::jsonb) returning *`;
  const { rows } = await pool.query(q, [code, input.customerName, input.source, input.productType, JSON.stringify(input.requirements ?? {})]);
  return rows[0];
}

export async function listProjects() {
  const { rows } = await pool.query('select * from projects order by created_at desc limit 100');
  return rows;
}

export async function addRevision(projectCode, input) {
  const { rows } = await pool.query(
    `insert into revisions (project_code, page, section, request, priority, status)
     values ($1,$2,$3,$4,$5,'OPEN') returning *`,
    [projectCode, input.page, input.section, input.request, input.priority]
  );
  return rows[0];
}
