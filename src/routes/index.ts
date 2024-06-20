import Elysia from "elysia";
import { getInformacion, registrar, marcarcorreo, bloquear} from './handlers';


const api = new Elysia()
    .post('/registrar', ({params: { body }}) => registrar(body))
    .post('/bloquear', ({params: {body}} ) => bloquear(body))
    .post('/marcarcorreo', ({params: {fav}} ) => marcarcorreo(fav))
    .get('/informacion/:correo', ({ params: { correo } }) => getInformacion(correo));

export default api;