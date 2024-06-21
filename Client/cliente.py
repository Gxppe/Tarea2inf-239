import requests
import json
import time
import os
global correo_ingresado, clave_ingresada

#####################################################################################################################
# Menús

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
------------------------------------------------
|⋆˚☆˖°¡Hola de nuevo! ¿Qué deseas hacer? °˖☆˚⋆|
------------------------------------------------
Elige una de las siguientes opciones:
1. Ver informacion sobre un correo electronico
2. Ver correos marcados como favoritos
3. Marcar correo como favorito
4. Desmarcar correo como favorito
5. Bloquear usuario
6. Salir

"""
menu_salida = """
---------------------------------------
| ๋࣭ ⭑⚝¡Gracias por usar CommuniKen!⚝⭑ ࣭ ๋|
---------------------------------------
"""
#####################################################################################################################
# Funciones de opciones
def opcion_inicial():
    print(menu_inicial)
    opcion = int(input("Ingrese el número de la opción que desea: "))
    return opcion

def opcion_menu():
    print(menu_opciones)
    opcion = int(input("Ingrese el número de la opción que desea: "))
    return opcion
#####################################################################################################################
# Funciones
def registro():
    print("* Obligatorio")
    nombre_usuario = input("*Ingrese su nombre de usuario: ")
    correo_ingresado = input("*Ingrese su correo electronico: ")
    clave_ingresada = input("*Ingrese su clave: ")
    descripcion = input("Ingrese una descripción: ")
    
    if not nombre_usuario or not correo_ingresado or not clave_ingresada:
        print("Por favor, llene los campos obligatorios")
        registro()
        return
    
    url = 'http://localhost:3000/api/registrar'
    data = {
        "nombre": nombre_usuario,
        "direccion_correo": correo_ingresado,
        "clave": clave_ingresada,
        "descripcion": descripcion
    }
    
    response = requests.post(url, json=data)
    print(response.json())

def iniciar_sesion():
    correo_ingresado = input("Ingrese su correo electronico: ")
    clave_ingresada = input("Ingrese su clave: ")
    try:
        url='http://localhost:3000/api/iniciarsesion/{}'.format(correo_ingresado)
        response = requests.get(url)    
        datos = response.json()
        if datos['clave'] == clave_ingresada:
            os.system('clear')

            print("Inicio de sesión exitoso")
            time.sleep(1)

            return
        else:
            os.system('clear')
            print("Inicio de sesión fallido.")
            time.sleep(1)
            if input("¿Desea intentar de nuevo? (s/n): ") == 's':
                os.system('clear')  
                return iniciar_sesion()
            else:
                os.system('clear')
                return main()

    except:
        os.system('clear')
        print("Correo no encontrado.")
        time.sleep(1)
        return iniciar_sesion()


def ver_informacion():
    correo = input("Ingrese el correo electronico que desea buscar: ")
    if not correo:
        print("No ingresaste nada, intenta de nuevo.")
        ver_informacion()
    url = 'http://localhost:3000/api/informacion'
    data = {
        'correo': correo
    }
    response = requests.get(url, params=data)
    print(response.json())

def marcar():
    id_correo = int(input("Ingrese el id del correo que desea marcar como favorito: "))
    url = 'http://localhost:3000/api/marcarcorreo'
    data = {
        'correo': correo_ingresado,
        'clave': clave_ingresada,
        'id_correo': id_correo
    }
    response = requests.post(url, params=data)
    print(response.json())

def bloquear():
    correo_bloqueado = input("Ingrese el correo que desea bloquear: ")
    url = 'http://localhost:3000/api/bloquear'
    data = {
        'correo': correo_ingresado,
        'clave': clave_ingresada,
        'correo_bloqueado': correo_bloqueado
    }
    response = requests.post(url, params=data)
    print(response.json())

def desmarcar():
    id_correo = int(input("Ingrese el id del correo que desea desmarcar como favorito: "))
    url = 'http://localhost:3000/api/desmarcarcorreo'
    data = {
        'correo': correo_ingresado,
        'clave': clave_ingresada,
        'id_correo': id_correo
    }
    response = requests.delete(url, params=data)
    print(response.json())


#####################################################################################################################
# Main
def main():
    opcioni = opcion_inicial()
    if opcioni<=3 and opcioni>=1: 
        if opcioni == 1:
            registro()
        if opcioni == 2:
            iniciar_sesion()
        if opcioni == 3:
            print(menu_salida)
            return
    else:
        print("Opción no válida, intenta de nuevo.")
        main()

    while True:
        opcion = opcion_menu()
        if opcion == 1:
            ver_informacion()
        elif opcion == 2:
            print("Ver correos marcados como favoritos")
        elif opcion == 3:
            marcar()
        elif opcion == 4:
            print("Desmarcar correo como favorito")
        elif opcion == 5:
            bloquear()
        elif opcion == 6:
            print(menu_salida)
            break
        else:
            print("Opción no válida, intenta de nuevo.")
            continue
    return


response = requests.get('https://api.github.com')
print(response.status_code)
main()