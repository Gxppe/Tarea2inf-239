import { Elysia, Router } from '@elysiajs/core';
import { BodyParser } from '@elysiajs/body-parser';
import { registrarUsuario } from './routes/registrar';

const api = new Elysia();
const router = new Router();

router.post('/registrar', registrarUsuario);

api.use(BodyParser.json());
api.use('/api', router);

api.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000/api');
});
