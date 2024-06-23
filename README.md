El codigo fue ejecutado con la terminal de Ubuntu 22.04 

Para inciar a correr la base de datos:

Entrar a la carpeta "api" y correr
Para generar las tablas, recuerde modificar la contraseña en el .env y seguido a eso correr:
```
npx prisma migrate dev
```
No es importante el nombre de la migracion, elija el que mas le acomode.Para que funcionen los endpoints:
```
bun run dev
```
Ahora descargaremos las dependencias del codigo
```
pip install -r requirements.txt
```
Finalmente para correr
```
python cliente.py
```