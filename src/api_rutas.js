import { Elysia } from 'elysia';
const app =new Elysia()

import registrarRuta from './routes/registrar';
import bloquearRuta from './routes/bloquear';
import informacionRuta from './routes/informacion';
import marcarcorreoRuta from './routes/marcarcorreo';
import desmarcarcorreoRuta from './routes/desmarcarcorreo';

app.use('/api', registrarRuta);
app.use('/api', bloquearRuta);
app.use('/api', informacionRuta);
app.use('/api', marcarcorreoRuta);
app.use('/api', desmarcarcorreoRuta);


export default app;