import express from 'express';
import AuthRoutes from '@routes/auth.routes';
import notfoundMiddleware from '@middlewares/notfound.middleware';
import errorMiddleware from '@middlewares/error.middleware';
import CategoryRoutes from '@routes/category.routes';
import TopicRoutes from '@routes/topic.routes';
import PostRoutes from '@routes/post.routes';

const app = express();

app.use(express.json());
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/categories', CategoryRoutes);
app.use('/api/v1/topics', TopicRoutes);
app.use('/api/v1/posts', PostRoutes);
app.use(errorMiddleware);
app.use(notfoundMiddleware);

export default app;
