import requests
global correo_ingresado, clave_ingresada





menu_inicial = """
------------------------------------
|₊˚⊹☆¡Bienvenid@ a CommuniKen!☆⊹˚₊|
------------------------------------
Elige una de las siguientes opciones:
1. Registrarse
2. Iniciar sesión
3. Salir

"""
menu_opciones = """
------------------------------------
|¡Hola de nuevo! ¿Qué deseas hacer?|
------------------------------------
Elige una de las siguientes opciones:
1. Ver informacion sobre un correo electronico
2. Ver correos marcados como favoritos
3. Marcar correo como favorito
4. Salir

"""
menu_salida = """
--------------------------------------
|๋࣭ ⭑⚝¡Gracias por usar CommuniKen!⚝⭑ ࣭ ๋|
--------------------------------------
"""
def opcion_inicial():
    print(menu_inicial)
    opcion = int(input("Ingrese el número de la opción que desea: "))
    return opcion

def opcion_menu():
    print(menu_opciones)
    opcion = int(input("Ingrese el número de la opción que desea: "))
    return opcion

def registro():
    print("* Obligatorio")
    nombre_usuario = input("*Ingrese su nombre de usuario: ")
    correo = input("*Ingrese su correo electronico: ")
    clave = input("*Ingrese su clave: ")
    descripcion = input("Ingrese una descripción: ")
    if not nombre or not correo or not clave:
        print("Por favor, llene los campos obligatorios")
        registro()
    url = 'http://localhost:3000/api/registrar'
    data = {
        'nombre_usuario': nombre_usuario,
        'correo': correo,
        'clave': clave,
        'descripcion': descripcion
    }
    response = requests.post(url, data=data)
    print(response.json())

def iniciar_sesion():
    correo_ingresado = input("Ingrese su correo electronico: ")
    clave_ingresada = input("Ingrese su clave: ")
    # Check if the user exists in the database, there is not an url
    return

def ver_informacion():
    correo = input("Ingrese el correo electronico que desea buscar: ")
    if not correo:
        print("No ingresaste nada :c")
        return
    url = 'http://localhost:3000/api/informacion'
    data = {
        'correo': correo
    }





response = requests.get('https://api.github.com')
print(response.status_code)
