# TOKOFILE Software Factory

Automation-first software delivery platform for **customer intake, requirements, project orchestration, revisions, deployment, and maintenance**.

## MVP included

- Node.js/Express factory API
- PostgreSQL project + revision data model
- Project code generator (`TKF-YYMMDD-XXXX`)
- Requirement intake API
- Revision intake API
- Factory dashboard landing page
- Docker Compose: app + PostgreSQL + Redis + n8n
- GitHub Actions CI
- Environment template
- n8n workflow architecture notes

## Run on ThinkPad / VPS

```bash
cp .env.example .env
docker compose up -d
```

Open:

- Factory UI: `http://localhost:8080`
- API health: `http://localhost:8080/api/health`
- n8n: `http://localhost:5678`

## Create project

```bash
curl -X POST http://localhost:8080/api/projects \
  -H 'content-type: application/json' \
  -d '{
    "customerName":"Dunia Bayi",
    "source":"SHOPEE",
    "productType":"ECOMMERCE_WEBSITE",
    "requirements":{"cms":true,"whatsapp":true,"seo":true}
  }'
```

## Create revision

```bash
curl -X POST http://localhost:8080/api/projects/TKF-260830-AB12/revisions \
  -H 'content-type: application/json' \
  -d '{
    "page":"/",
    "section":"hero",
    "request":"Ganti gambar hero dengan foto toko",
    "priority":"NORMAL"
  }'
```

## Architecture direction

`Shopee / WhatsApp / Web → n8n → Factory API → PostgreSQL → GitHub/AI workers → preview → revision → production → monitoring`

The ThinkPad acts as the **control room**; 24/7 workers should run on a VPS/cloud environment.

## Next production milestones

- Authentication + customer portal
- Visual revision commenting
- GitHub repository bootstrap worker
- Queue worker using Redis/BullMQ
- Product/SKU knowledge base and guarded reply assistant
- Deployment adapters
- Uptime/error monitoring + maintenance incident loop
