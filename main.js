import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 1. ESCENA

const escena = new THREE.Scene();

escena.background = new THREE.Color(0x2b245a);
// 2. CAMARA

const camara = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / 650,
    0.1,
    1000
);

camara.position.set(8, 6, 10);

// 3. RENDERER
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    650
);

renderer.setPixelRatio(
    window.devicePixelRatio
);

document
    .getElementById("contenedor3D")
    .appendChild(renderer.domElement);

// 4. ORBIT CONTROLS
const controles = new OrbitControls(
    camara,
    renderer.domElement
);

controles.enableDamping = true;

controles.target.set(
    0,
    1,
    0
);

// 5. LUCES
const luzAmbiental = new THREE.AmbientLight(
    0xffffff,
    1.5
);

escena.add(luzAmbiental);


const luzDireccional = new THREE.DirectionalLight(
    0xffffff,
    3
);

luzDireccional.position.set(
    5,
    10,
    5
);

escena.add(luzDireccional);

// 6. PLANO

const geometriaPlano = new THREE.PlaneGeometry(
    20,
    20
);

const materialPlano = new THREE.MeshStandardMaterial({
    color: 0x374151
});

const plano = new THREE.Mesh(
    geometriaPlano,
    materialPlano
);

plano.rotation.x = -Math.PI / 2;

plano.name = "Plano";

plano.userData.info = {
    tipo: "Plano",
    descripcion: "Superficie utilizada como base de la escena.",
    dato: "Tamaño: 20 x 20 :)"
};

escena.add(plano);

// 7. CUBO

const geometriaCubo = new THREE.BoxGeometry(
    2,
    2,
    2
);

const materialCubo = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    roughness: 0.5,
    metalness: 0.2
});

const cubo = new THREE.Mesh(
    geometriaCubo,
    materialCubo
);

cubo.position.set(
    -4,
    1,
    0
);

cubo.name = "Cubo";

cubo.userData.info = {
    tipo: "BoxGeometry",
    descripcion: "Objeto tridimensional formado por seis caras cuadradas.",
    dato: "Tamaño: 2 x 2 x 2  :)"
};

escena.add(cubo);
// 8. ESFERA

const geometriaEsfera = new THREE.SphereGeometry(
    1.2,
    32,
    32
);

const materialEsfera = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    roughness: 0.3,
    metalness: 0.4
});

const esfera = new THREE.Mesh(
    geometriaEsfera,
    materialEsfera
);

esfera.position.set(
    0,
    1.2,
    0
);

esfera.name = "Esfera";

esfera.userData.info = {
    tipo: "SphereGeometry",
    descripcion: "Objeto redondo formado por una superficie curva.",
    dato: "Radio: 1.2  :)"
};

escena.add(esfera);

// 9. CILINDRO
const geometriaCilindro = new THREE.CylinderGeometry(
    1,
    1,
    2.5,
    32
);

const materialCilindro = new THREE.MeshStandardMaterial({
    color: 0x22c55e,
    roughness: 0.5
});

const cilindro = new THREE.Mesh(
    geometriaCilindro,
    materialCilindro
);

cilindro.position.set(
    4,
    1.25,
    0
);

cilindro.name = "Cilindro";

cilindro.userData.info = {
    tipo: "CylinderGeometry",
    descripcion: "Objeto con dos bases circulares y una superficie lateral.",
    dato: "Altura: 2.5 :)"
};

escena.add(cilindro);

// 10. CONO
const geometriaCono = new THREE.ConeGeometry(
    1.2,
    2.5,
    32
);

const materialCono = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    roughness: 0.4
});

const cono = new THREE.Mesh(
    geometriaCono,
    materialCono
);

cono.position.set(
    -2,
    1.25,
    -3
);

cono.name = "Cono";

cono.userData.info = {
    tipo: "ConeGeometry",
    descripcion: "Objeto tridimensional con una base circular y un vertice.",
    dato: "Altura: 2.5 :)"
};

escena.add(cono);

// 11. TOROIDE
const geometriaToroide = new THREE.TorusGeometry(
    1.2,
    0.4,
    16,
    40
);

const materialToroide = new THREE.MeshStandardMaterial({
    color: 0xa855f7,
    roughness: 0.4,
    metalness: 0.2
});

const toroide = new THREE.Mesh(
    geometriaToroide,
    materialToroide
);

toroide.position.set(
    2,
    1.2,
    -3
);

toroide.name = "Toroide";

toroide.userData.info = {
    tipo: "TorusGeometry",
    descripcion: "Objeto con forma de anillo tridimensional.",
    dato: "Radio principal: 1.2 :)"
};

escena.add(toroide);
// 12. OBJETOS SELECCIONABLES

const objetosSeleccionables = [
    cubo,
    esfera,
    cilindro,
    cono,
    toroide,
    plano
];

// 13. RAYCASTING

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

let objetoSeleccionado = null;

// FUNCION PARA MOSTRAR INFORMACION
function mostrarInformacion(objeto) {

    document.getElementById(
        "nombreObjeto"
    ).textContent = objeto.name;

    document.getElementById(
        "tipoObjeto"
    ).textContent = objeto.userData.info.tipo;

    document.getElementById(
        "descripcionObjeto"
    ).textContent = objeto.userData.info.descripcion;

    document.getElementById(
        "datoObjeto"
    ).textContent = objeto.userData.info.dato;
}

// FUNCION PARA QUITAR SELECCION

function quitarSeleccion() {

    if (objetoSeleccionado === cubo) {
        cubo.material.color.set(0x3b82f6);
    }

    if (objetoSeleccionado === esfera) {
        esfera.material.color.set(0xef4444);
    }

    if (objetoSeleccionado === cilindro) {
        cilindro.material.color.set(0x22c55e);
    }

    if (objetoSeleccionado === cono) {
        cono.material.color.set(0xf59e0b);
    }

    if (objetoSeleccionado === toroide) {
        toroide.material.color.set(0xa855f7);
    }

    if (objetoSeleccionado === plano) {
        plano.material.color.set(0x374151);
    }

    objetoSeleccionado = null;
}
// CLICK DEL MOUSE

window.addEventListener(
    "click",
    seleccionarObjeto
);


function seleccionarObjeto(event) {

    const rect =
        renderer.domElement.getBoundingClientRect();


    mouse.x =
        ((event.clientX - rect.left) /
            rect.width) * 2 - 1;


    mouse.y =
        -((event.clientY - rect.top) /
            rect.height) * 2 + 1;


    raycaster.setFromCamera(
        mouse,
        camara
    );


    const intersecciones =
        raycaster.intersectObjects(
            objetosSeleccionables
        );


    if (intersecciones.length > 0) {

        const objeto =
            intersecciones[0].object;


        quitarSeleccion();


        objetoSeleccionado = objeto;


        // Color rosa de seleccion

        objetoSeleccionado.material.color.set(
            0xef5baa
        );


        mostrarInformacion(
            objetoSeleccionado
        );

    } else {

        quitarSeleccion();

        document.getElementById(
            "nombreObjeto"
        ).textContent =
            "Ningun objeto seleccionado :(";

        document.getElementById(
            "tipoObjeto"
        ).textContent = "-";

        document.getElementById(
            "descripcionObjeto"
        ).textContent =
            "Haz clic sobre un objeto.";

        document.getElementById(
            "datoObjeto"
        ).textContent = "-";
    }
}

// 14. MODELO GLB
const loader = new GLTFLoader();

let modelo3D = null;


loader.load(

    "models/modelo.glb",

    function(gltf) {

        modelo3D = gltf.scene;

        modelo3D.position.set(
            0,
            0,
            -5
        );

        modelo3D.scale.set(
            1,
            1,
            1
        );

        modelo3D.name = "Modelo GLB";

        modelo3D.userData.info = {
            tipo: "Modelo externo GLB",
            descripcion: "Modelo 3D externo cargado mediante GLTFLoader.",
            dato: "Formato: GLB"
        };


        escena.add(
            modelo3D
        );


        console.log(
            "Modelo 3D cargado correctamente"
        );

    },

    undefined,

    function(error) {

        console.error(
            "Error al cargar el modelo GLB:",
            error
        );

    }
);

// 15. ANIMACION

let animacionActiva = true;


function animar() {

    requestAnimationFrame(
        animar
    );


    if (animacionActiva) {

        cubo.rotation.y += 0.01;

        esfera.rotation.y += 0.01;

        cilindro.rotation.y += 0.01;

        cono.rotation.y += 0.01;

        toroide.rotation.y += 0.01;

    }


    controles.update();


    renderer.render(
        escena,
        camara
    );
}


animar();

// 16. BOTON ANIMACION

const btnAnimacion =
    document.getElementById(
        "btnAnimacion"
    );


btnAnimacion.addEventListener(
    "click",
    function() {

        animacionActiva =
            !animacionActiva;


        if (animacionActiva) {

            btnAnimacion.textContent =
                "Detener animacion";

        } else {

            btnAnimacion.textContent =
                "Activar animacion";

        }

    }
);

// 17. BOTON CAMBIAR COLOR

document.getElementById(
    "btnColor"
).addEventListener(
    "click",
    function() {

        cubo.material.color.set(
            Math.random() * 0xffffff
        );

    }
);

// 18. OCULTAR / MOSTRAR MODELO

let modeloVisible = true;


document.getElementById(
    "btnModelo"
).addEventListener(
    "click",
    function() {

        if (modelo3D !== null) {

            modeloVisible =
                !modeloVisible;

            modelo3D.visible =
                modeloVisible;


            if (modeloVisible) {

                this.textContent =
                    "Ocultar modelo";

            } else {

                this.textContent =
                    "Mostrar modelo";

            }

        }

    }
);

// 19. INTENSIDAD DE LUZ

document.getElementById(
    "intensidadLuz"
).addEventListener(
    "input",
    function() {

        luzDireccional.intensity =
            Number(this.value);

    }
);
// 20. REINICIAR CAMARA
document.getElementById(
    "btnCamara"
).addEventListener(
    "click",
    function() {

        camara.position.set(
            8,
            6,
            10
        );

        controles.target.set(
            0,
            1,
            0
        );

        controles.update();

    }
);

// 21. RESPONSIVE

window.addEventListener(
    "resize",
    function() {

        camara.aspect =
            window.innerWidth / 650;

        camara.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            650
        );

    }
);