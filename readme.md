# Practica 02: Visor 3D Interactivo con Información de Objetos (MFGG)

En esta practica basicamente se realizo como un tipo de aplicacion web interactiva desarrollada para visualizar modelos 3D y mostrar informacion detallada de los objetos al interactuar con ellos se visualiza un cubo, una esfera, un cilindro, un cono, un toroide, el plano y pues nuestro patito que es un modelo glb.

## Tecnologias utilizadas
- **HTML5 / CSS3**: Estructura y diseño de la interfaz.
- **JavaScript**: Logica de interacción y control del visor.
- **Three.js**: Renderizado del modelo 3D en el navegador.

## Estructura del Proyecto
- `index.html`: Pagina principal de la interfaz.
- `style.css`: Estilos visuales y diseño responsivo.
- `main.js`: Logica de carga del modelo 3D y eventos de interacción.
- `models/`: Carpeta que almacena los archivos de los modelos 3D (`modelo.glb`).

##  ¿Como funciona?
1. La aplicacion carga la estructura HTML y aplica los estilos visuales.
2. El script de JavaScript inicializa la escena 3D y carga el modelo ubicado en la carpeta `models`.
3. Permite al usuario rotar/hacer zoom en el objeto y visualizar información complementaria asociada.