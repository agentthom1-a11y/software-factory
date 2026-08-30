create extension if not exists pgcrypto;

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  customer_name text not null,
  source text not null,
  product_type text not null,
  status text not null default 'INTAKE',
  requirements jsonb not null default '{}'::jsonb,
  preview_url text,
  production_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists revisions (
  id uuid primary key default gen_random_uuid(),
  project_code text not null references projects(code) on delete cascade,
  page text not null,
  section text not null,
  request text not null,
  priority text not null default 'NORMAL',
  status text not null default 'OPEN',
  created_at timestamptz not null default now()
);

create table if not exists automation_runs (
  id uuid primary key default gen_random_uuid(),
  project_code text,
  workflow text not null,
  status text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
