import Elysia from "elysia";
import { PrismaClient } from '@prisma/client';
import api from './routes';

const app = new Elysia();

app
    .group('/api', (app) => app.use(api))
    .listen(3000, () => console.log('Server running on http://localhost:3000'));

app.handle(new Request('http://localhost:3000/')).then(console.log)