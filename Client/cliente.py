import requests
import time
import os
from datetime import datetime

correo_ingresado = None
clave_ingresada = None

#####################################################################################################################
# Menús

menu_inicial = """
-----------------------------------------
| ₊˚⊹☆ ¡Bienvenid@ a CommuniKen! ☆⊹˚₊ |
-----------------------------------------
Elige una de las siguientes opciones:
1. Registrarse
2. Iniciar sesión
3. Salir

"""
menu_opciones = """
--------------------------------------------
|  ⋆˚☆˖° ¡Hola! ¿Qué deseas hacer? °˖☆˚⋆  |
--------------------------------------------
Elige una de las siguientes opciones:
1. Ver informacion sobre un correo electronico
2. Ver correos marcados como favoritos
3. Marcar correo como favorito
4. Desmarcar correo como favorito
5. Bloquear usuario
6. Salir

"""
menu_salida = """
--------------------------------------------
|  ๋࣭ ⭑⚝ ¡Gracias por usar CommuniKen! ⚝⭑ ࣭ ๋ |
--------------------------------------------
"""

# PRINTS
def print_error(mensaje, end="\n", press_enter=True):
    print(f"\033[38;5;1mERROR: {mensaje}\033[0m")
    if not press_enter:
        return
    input("\nPresiona enter para continuar...")

def print_success(mensaje, end="\n"):
    print(f"\033[38;5;2m{mensaje}\033[0m")
    time.sleep(1)

def print_warning(mensaje, end="\n"):
    text = f"\033[38;5;3m{mensaje}\033[0m"
    print(text)


#####################################################################################################################
# Funciones de opciones
def opcion_inicial():
    os.system('clear')
    print(menu_inicial, end="")
    opcion = input("Ingrese el número de la opción que desea: ")

    try:
        return int(opcion)
    except:
        return opcion_inicial()

def opcion_menu():
    os.system('clear')
    print(menu_opciones)
    opcion = input("Ingrese el número de la opción que desea: ")
    try:
        return int(opcion)
    except:
        return opcion_menu()
#####################################################################################################################
# Funciones

# Función registro: Esta función recibe los datos del usuario, verifica que los campos obligatorios no estén vacíos y 
# envía los datos al servidor para registrar al usuario. Luego entrega por consola la respectiva respuesta del servidor.

def registro():
    global correo_ingresado
    global clave_ingresada
    os.system('clear')
    print("\nRegistro de usuario\n")
    print_warning("* Campos obligatorios")
    nombre_usuario = input("\033[38;5;3m*\033[0m "+"Ingrese su nombre: ")
    correo_ingresado = input("\033[38;5;3m*\033[0m "+"Ingrese su correo electronico: ")
    clave_ingresada = input("\033[38;5;3m*\033[0m "+"Ingrese su clave: ")
    descripcion = input("Ingrese una descripción: ")
    
    if not nombre_usuario or not correo_ingresado or not clave_ingresada:
        os.system('clear')
        print_warning("\nPor favor, llene los campos obligatorios")
        time.sleep(1)
        registro()
        return

    #Se registra el usuario
    url = 'http://localhost:3000/api/registrar'
    data = {
        "nombre": nombre_usuario,
        "direccion_correo": correo_ingresado,
        "clave": clave_ingresada,
        "descripcion": descripcion
    }
    response = requests.post(url, json=data).json()
    print(response)
    if response['estado'] == 400:
        os.system('clear')

        print_error(response['mensaje'])
        os.system('clear')

        return main()
    elif response['estado'] == 500:
        os.system('clear')

        print_error(response['mensaje'])
        os.system('clear')

        return main()

    os.system('clear')
    print_success(response['mensaje'])

    os.system('clear')

# Función iniciar_sesion: Esta función recibe los datos del usuario, si los datos están vacíos, el usuario puede volver 
# a intentar iniciar sesión. Luego envía los datos al servidor para verificar si el usuario existe y si la clave es correcta.
# Luego entrega por consola la respectiva respuesta del servidor.

def iniciar_sesion():
    global correo_ingresado
    global clave_ingresada
    os.system('clear')
    print("\nInicio de sesión\n")
    correo_ingresado = input("Ingrese su correo electronico: ")
    clave_ingresada = input("Ingrese su clave: ")
    try:
        url='http://localhost:3000/api/iniciarsesion/{}'.format(correo_ingresado)
        response = requests.get(url)
        datos = response.json()

        if datos['estado'] != 200:
            os.system('clear')
            print_error(f"\n{datos['mensaje']}", press_enter=False)
            if input("¿Desea intentar de nuevo? (s/n): ").lower() == 's':
                os.system('clear')
                return iniciar_sesion()
            else:
                os.system('clear')
                return main()

        if datos['clave'] != clave_ingresada:
            os.system('clear')
            print_error("\nLas credenciales ingresadas no coinciden.", press_enter=False)
            if input("¿Desea intentar de nuevo? (s/n): ").lower() == 's':
                os.system('clear')
                return iniciar_sesion()
            else:
                os.system('clear')
                return main()

        os.system('clear')
        print_success(f"\nInicio de sesión exitoso. Bienvenido, {datos['nombre']}.")
    except:
        os.system('clear')
        print_error("\nHubo un error al intentar iniciar sesión.")

        return main()

# Función ver_informacion: Esta función recibe un correo electrónico, verifica que no esté vacío y envía el correo al 
# servidor, si el correo existe, el servidor devuelve la información del correo, de lo contrario, el servidor devuelve
# un mensaje de error.

def ver_informacion():
    correo = input("Ingrese el correo electronico que desea buscar: ")
    if not correo:
        print("No ingresaste nada, intenta de nuevo.")
        ver_informacion()
    url = 'http://localhost:3000/api/informacion/'+correo

    response = requests.get(url).json()

    if response['estado'] == 400:
        os.system('clear')
        print_error(f"\n{response['mensaje']}")
        return
    elif response['estado'] == 500:
        os.system('clear')
        print_error(f"\n{response['mensaje']}")
        return

    informacion = f"INFORMACIÓN DE {correo.upper()}\n\nNombre: {response['nombre']}\nDescripción: {response['descripcion']}"

    os.system('clear')
    print(informacion)
    input("\nPresiona enter para continuar...")


def marcar():
    id_correo = int(input("Ingrese el id del correo que desea marcar como favorito: "))
    if not id_correo:
        print("No ingresaste nada, intenta de nuevo.")
        marcar()
    url = 'http://localhost:3000/api/marcarcorreo'
    data = {
        'direccion_correo': correo_ingresado,
        'clave': clave_ingresada,
        'id_correo_fav': id_correo
    }
    response = requests.post(url, json=data).json()

    os.system('clear')
    print()

    if response['estado'] == 400:
	    print_error(response['mensaje'])
	    return
    elif response['estado'] == 500:
        print_error(response['mensaje'])
        return

    print_success(response['mensaje'])

def bloquear():
    correo_bloqueado = input("Ingrese el correo que desea bloquear: ")
    url = 'http://localhost:3000/api/bloquear'
    data = {
        'direccion_correo': correo_ingresado,
        'clave': clave_ingresada,
        'direccion_bloqueada': correo_bloqueado
    }
    response = requests.post(url, json=data).json()

    os.system('clear')
    print()

    if response['estado'] == 400:
        print_error(response['mensaje'])
        return
    elif response['estado'] == 500:
        print_error(response['mensaje'])
        return

    print_success(response['mensaje'])

def desmarcar():
    id_correo = int(input("Ingrese el id del correo que desea desmarcar como favorito: "))
    if not id_correo:
        print("No ingresaste nada, intenta de nuevo.")
        desmarcar()
    url = 'http://localhost:3000/api/desmarcarcorreo'
    data = {
        'direccion_correo': correo_ingresado,
        'clave': clave_ingresada,
        'id_correo_fav': id_correo
    }
    response = requests.delete(url, json=data).json()

    os.system('clear')
    print()

    if response['estado'] == 400:
        print_error(response['mensaje'])
        return
    elif response['estado'] == 500:
        print_error(response['mensaje'])
        return

    print_success(response['mensaje'])

def ver_favoritos():
    try:
        url = 'http://localhost:3000/api/ver_favoritos/'+correo_ingresado
        response = requests.get(url).json()
        print(response)

        if response['estado'] == 500:
            os.system('clear')
            print_error(response['mensaje'])
            return
        if response['estado'] == 400:
            print_warning("\n"+response['mensaje'])
            input("\nPresiona enter para continuar...")
            return

        os.system('clear')

        correos = response['correos']
        text_correos = [correo['correo'] for correo in correos]
        print("CORREOS MARCADOS COMO FAVORITOS\n")

        if len(text_correos) == 0:
            print_warning("\nNo tienes correos marcados como favoritos.")
            input("Presiona enter para continuar...")
            return

        print(f"|{'ID':^5}|{'Asunto':^16}|{'Fecha':^20}|")
        for correo in text_correos:
            print(f"|{correo['correo_id']:^5}|{correo['asunto']:^16}|{datetime.strptime(correo['fecha_envio'], '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%d/%m/%Y'):^20}|")

        input("\nPresiona enter para continuar...")
    except Exception as e:
        print_error(e)

#####################################################################################################################
# Función principal del programa. esta función muestra el menú principal y las opciones que el usuario puede elegir.
# Luego, según la opción elegida, se ejecuta la función correspondiente.
def main():
    os.system('clear')
    opcioni = opcion_inicial()
    if opcioni<=3 and opcioni>=1: 
        if opcioni == 1:
            registro()
        if opcioni == 2:
            iniciar_sesion()
        if opcioni == 3:
            os.system('clear')
            print(menu_salida)
            return
    else:
        print("Opción no válida, intenta de nuevo.")
        main()
    print(correo_ingresado, clave_ingresada)
    while True:
        os.system('clear')
        opcion = opcion_menu()
        if opcion == 1:
            ver_informacion()
        elif opcion == 2:
            ver_favoritos()
        elif opcion == 3:
            marcar()
        elif opcion == 4:
            desmarcar()
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
