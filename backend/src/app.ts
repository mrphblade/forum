import express from 'express';
import AuthRoutes from '@routes/auth.routes';

const app = express();

app.use('/api/v1/auth', AuthRoutes);

export default app;
