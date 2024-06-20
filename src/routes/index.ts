import Elysia from "elysia";
import { getInformacion, registrar, marcarcorreo} from './handlers';


const api = new Elysia()
    .post('/registrar', ({ body }) => registrar(body))
    .post('/marcarcorreo', ({params: {fav}} ) => marcarcorreo(fav))
    .get('/informacion/:correo', ({ params: { correo } }) => getInformacion(correo));

export default api;