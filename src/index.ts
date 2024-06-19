import Elysia from "elysia";
import { PrismaClient } from '@prisma/client';

import registrar from './routes/registrar';
//import bloquear from './routes/bloquear';
import informacion from './routes/informacion';
//import marcarcorreo from './routes/marcarcorreo';
//import desmarcarcorreo from './routes/desmarcarcorreo';

const prisma = new PrismaClient();

const app = new Elysia()
    .post('/api/registrar', async({body}) => registrar(prisma,body));


// app.get('/api/informacion/:correo', informacion(prisma));
// app.post('/api/bloquear', bloquear(prisma));
// app.post('/api/marcarcorreo', marcarcorreo(prisma));
// app.delete('/api/desmarcarcorreo', desmarcarcorreo(prisma));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));