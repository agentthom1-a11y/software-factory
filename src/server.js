import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { api } from './routes/api.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use('/api', api);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use((err,_req,res,_next) => {
  if (err?.issues) return res.status(400).json({ error: 'validation_error', details: err.issues });
  console.error(err);
  res.status(500).json({ error: 'internal_error' });
});
const port = Number(process.env.PORT || 8080);
app.listen(port, () => console.log(`TOKOFILE Software Factory running on :${port}`));
