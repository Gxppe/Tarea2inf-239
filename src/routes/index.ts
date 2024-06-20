import { Elysia, t } from "elysia";
import { getInformacion, registrar, marcarcorreo, bloquear, main_test } from './handlers';


const api = new Elysia()
    .get('/', () => main_test())
    .post('/registrar', ({ body }) => registrar(body), {
        body: t.Object({
            nombre: t.String(),
            direccion_correo: t.String(),
            clave: t.String(),
            descripcion: t.String()
        })
    })
    .post('/bloquear', ({ body } ) => bloquear(body), {
        body: t.Object({
            direccion_correo: t.String(),
            clave: t.String(),
            direccion_bloqueada: t.String()
        })
    })
    .post('/marcarcorreo', ({ body } ) => marcarcorreo(body), {
        body: t.Object({
            direccion_correo: t.String(),
            clave: t.String(),
            id_correo_fav: t.Number()
        })
    })
    .get('/informacion/:correo', ({ params: { correo } }) => getInformacion(correo), {
        params: t.Object({
            correo: t.String()
        })
    });

export default api;