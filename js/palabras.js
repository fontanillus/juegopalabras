const CANTIDAD_PALABRAS = document.getElementById('cantPalabras');
const PALABRAS = document.getElementById("palabras");
const secuencia = [];
let cantidad;

// Lista de palabras posibles
const listaPalabras = ["escenario", "luces", "astros", "oceano", "flores", "clielo", "amor", "rosa", "hielo", "campo", "bosque", "desierto", "refresco", "alegría", "verano"];

function crearSecuencia() {
    PALABRAS.innerHTML = '';
    document.getElementById("respuesta").innerHTML = '';
    document.getElementById("resultado").innerText = '';
    secuencia.length = 0;
    cantidad = parseInt(CANTIDAD_PALABRAS.value);

    // Escoge palabras aleatorias sin repetir
    const seleccionadas = listaPalabras.sort(() => 0.5 - Math.random()).slice(0, cantidad);

    console.log("Palabras mostradas:", seleccionadas);

    seleccionadas.forEach(palabra => {
        secuencia.push(palabra);

        let span = document.createElement("span");
        span.innerHTML = palabra;
        PALABRAS.appendChild(span);
    });

    document.getElementById("comprobar").disabled = true;
    document.getElementById("reiniciar").disabled = true;

    setTimeout(() => {
        PALABRAS.style.display = "none";
        mostrarInputsUsuario();
        document.getElementById("comprobar").disabled = false;
    }, 5000);
}

function mostrarInputsUsuario() {
    const respuestaDiv = document.getElementById("respuesta");
    respuestaDiv.innerHTML = '';

    for (let i = 0; i < cantidad; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.id = "pal" + i;
        input.setAttribute("oninput", "ajustarAncho(this)"); //para que ancho del input sea tan grande como la palabras escrita por usuario
        input.style.width = "6ch"; // ancho mínimo inicial
        respuestaDiv.appendChild(input);
    }
}

function ajustarAncho(input) {//que se adapte al largo de la palabra que escribe el usuario
    input.style.width = (input.value.length + 1) + 'ch';
}

function comprobar() {
    let aciertos = 0;

    for (let i = 0; i < cantidad; i++) {
        const entrada = document.getElementById("pal" + i).value.trim().toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const original = secuencia[i].toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (entrada === original) {
            aciertos++;
        }
    }

    const porcentaje = (aciertos / secuencia.length) * 100; //para poder dar mensaje según el % de acertados
    const imgElemento = document.getElementById("imagenResultado");

    //esto sería en el caso de que solo hubiera una opcion de jugar con x palabras
    //if (aciertos < 2) {
    // nivel = "Deberías ejercitar más tu memoria";
    // } else if (aciertos >= 2 && aciertos <= 4) {
    //nivel = "Necesitas ejercitar un poco tu memoria";
    // } else if (aciertos > 4 && aciertos <= 6) {
    //nivel = "Tu memoria está bastante bien ejercitada";
    //} else if (aciertos > 6 && aciertos <= 8) {
    // nivel = "Tu memoria tiene un nivel alto de agilidad";
    // } else if (aciertos > 8) {
    //nivel = "Felicidades! Tienes una agilidad mental excelente";
    //} else {
    // nivel = "Datos no válidos";
    //}

    let nivel; // Este es en el caso que nos ocupa donde el juego puede ser de 5 a 9 palabras
    let imagen = "";

    if (porcentaje < 30) {
        nivel = "Deberías ejercitar más tu memoria";
        imagen = "img/1.png";
    } else if (porcentaje < 60) {
        nivel = "Necesitas ejercitar un poco tu memoria";
        imagen = "img/2.png";
    } else if (porcentaje < 80) {
        nivel = "Tu memoria está bastante bien ejercitada";
        imagen = "img/3.png";
    } else if (porcentaje < 100) {
        nivel = "Tu memoria tiene un nivel alto de agilidad";
        imagen = "img/4.png";
    } else if (porcentaje === 100) {
        nivel = "¡Felicidades! Tienes una agilidad mental excelente";
        imagen = "img/5.png";
    } else {
        nivel = "Datos no válidos";
    }

    // Mostrar resultados una vez definidos
    document.getElementById("imagenResultado").src = imagen;
    document.getElementById("imagenResultado").style.display = "block";


    document.getElementById("resultado").innerText =
        `Aciertos: ${aciertos} de ${secuencia.length} — ${nivel}`;


    document.getElementById("palabras").style.display = "block";
    document.getElementById("comprobar").disabled = true;
    document.getElementById("reiniciar").disabled = false;
}


function nuevoJuego() {
    secuencia.length = 0;
    // Oculta la imagen
    const imgElem = document.getElementById("imagenResultado");
    imgElem.style.display = "none";
    // Limpia la imagen
    imgElem.src = "";
    imgElem.alt = "";
    document.getElementById("palabras").innerHTML = '';
    document.getElementById("palabras").style.display = 'block';
    document.getElementById("respuesta").innerHTML = '';
    document.getElementById("resultado").innerText = '';
    document.getElementById("comprobar").disabled = true;
    document.getElementById("reiniciar").disabled = true;
}