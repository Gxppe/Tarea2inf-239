import { Elysia, t } from "elysia";
import { getInformacion, registrar, marcarcorreo, bloquear, main_test, iniciarsesion, desmarcarcorreo, ver_favoritos } from './handlers';

// Definición de la api con sus rutas y validaciones

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
    })
    .get('/iniciarsesion/:correo', ({ params: { correo } }) => iniciarsesion(correo), {
        params: t.Object({
            correo: t.String()
        })
    })
    .delete('/desmarcarcorreo', ({body} ) => desmarcarcorreo(body), {
        body: t.Object({
            direccion_correo: t.String(),
            clave: t.String(),
            id_correo_fav: t.Number()
        })
    })
    .get('/ver_favoritos/:correo', ({params: { correo }}) => ver_favoritos(correo), {
        params: t.Object({
            correo: t.String()
        })
    })
    ;



export default api;