import Elysia from "elysia";
import { getInformacion, registrar } from './handlers';


const api = new Elysia()
    .post('/registrar', ({ body }) => registrar(body))
    //.post('/marcarcorreo', ({ body }) => marcarcorreo(body))
    .get('/informacion/:correo', ({ params: { correo } }) => getInformacion(correo));

export default api;