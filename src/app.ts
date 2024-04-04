import express from 'express';
import dotenv from 'dotenv';
import { apiRouter } from './routers';
import { connect } from './db/db';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/status', (_req, res) => res.send('OK!'));
app.use('/api', apiRouter);

connect();

export default app;
