import Elysia from "elysia";
import { getInformacion } from './handlers';


const api = new Elysia()
    .get('/informacion/:correo', ({ params: { correo } }) => getInformacion(correo));

export default api;