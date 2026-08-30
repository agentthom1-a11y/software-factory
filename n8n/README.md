# n8n workflows

Recommended first workflows:

1. `order-intake`: normalize Shopee/Web/WhatsApp lead into `/api/projects`.
2. `revision-intake`: convert portal/chat revision into `/api/projects/:code/revisions`.
3. `project-bootstrap`: create GitHub repo/branch/tasks from approved requirements.
4. `maintenance-watch`: receive uptime/error webhooks and create incidents.

Use official APIs/webhooks wherever available. Keep Shopee messaging human-in-the-loop unless the seller/API scope explicitly permits automated sends.
