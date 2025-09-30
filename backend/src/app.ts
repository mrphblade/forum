import express from 'express';
import AuthRoutes from '@routes/auth.routes';
import notfoundMiddleware from '@middlewares/notfound.middleware';
import errorMiddleware from '@middlewares/error.middleware';

const app = express();

app.use('/api/v1/auth', AuthRoutes);
app.use(errorMiddleware);
app.use(notfoundMiddleware);

export default app;
