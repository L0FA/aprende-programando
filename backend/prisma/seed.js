import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Fundamentos', slug: 'fundamentos', description: 'Conceptos básicos de programación', icon: 'book', order: 1 },
  { name: 'Frontend', slug: 'frontend', description: 'HTML, CSS, JavaScript, React, Next.js', icon: 'globe', order: 2 },
  { name: 'Backend', slug: 'backend', description: 'Node.js, Python, Express, APIs', icon: 'server', order: 3 },
  { name: 'Videojuegos', slug: 'videojuegos', description: 'Desarrollo de juegos con Python y JavaScript', icon: 'gamepad', order: 4 },
  { name: 'Frameworks', slug: 'frameworks', description: 'Tailwind, Bootstrap, Vite', icon: 'package', order: 5 },
  { name: 'Bases de Datos', slug: 'bases-datos', description: 'MongoDB, MySQL', icon: 'database', order: 6 },
  { name: 'Herramientas', slug: 'herramientas', description: 'Git, npm, Docker', icon: 'tool', order: 7 },
  { name: 'IA', slug: 'ia', description: 'Inteligencia Artificial', icon: 'brain', order: 8 },
  { name: 'Proyectos', slug: 'proyectos', description: 'Proyectos prácticos', icon: 'rocket', order: 9 }
];

const courses = [
  { title: 'Conceptos Básicos', slug: 'conceptos-basicos', description: 'Qué es código, variables, funciones y lógica.', difficulty: 'BEGINNER', duration: '5 horas', order: 1, categorySlug: 'fundamentos', lessons: [
    { title: '¿Qué es Programar?', slug: 'que-es-programar', content: '# ¿Qué es Programar?\n\nProgramar es darle instrucciones a una computadora para que haga algo.\n\n## Ejemplo\n```javascript\n// Decirle a la computadora: "Hola Mundo"\nconsole.log("Hola Mundo");\n```\n\n## Lenguajes\n- JavaScript, Python, Java, etc.\n- Cada uno tiene su sintaxis\n- Todos hacen lo mismo (lógica)', order: 1 },
    { title: 'Variables', slug: 'var-basico', content: '# Variables\n\nSon como cajas donde guardamos información.\n\n```javascript\nlet nombre = "Juan";  // guardo texto\nlet edad = 25;        // guardo número\nlet activo = true;    // guardo verdadero/falso\n```', order: 2 },
    { title: 'Funciones', slug: 'func-basico', content: '# Funciones\n\nSon recetas: listas de pasos que podemos reutilizar.\n\n```javascript\nfunction saludar() {\n    console.log("Hola!");\n}\n\nsaludar();  // ejecutar la función\n```', order: 3 }
  ]},
  { title: 'JSON Junior', slug: 'json-junior', description: 'Sintaxis JSON, tipos de datos.', difficulty: 'BEGINNER', duration: '3 horas', order: 2, categorySlug: 'fundamentos', lessons: [
    { title: 'Sintaxis JSON', slug: 'json-sintaxis', content: '# JSON\n\n```json\n{\n    "nombre": "Juan",\n    "edad": 25,\n    "activo": true,\n    "hobbies": ["leer", "correr"],\n    "direccion": {\n        "ciudad": "Madrid"\n    }\n}\n```\n\n## Tipos\n- Strings ("texto")\n- Numbers (25)\n- Booleans (true/false)\n- Arrays ([])\n- Objects ({})', order: 1 }
  ]},
  { title: 'Colores Web', slug: 'colores-web', description: 'Hex, RGB, HSL, opacity.', difficulty: 'BEGINNER', duration: '3 horas', order: 3, categorySlug: 'fundamentos', lessons: [
    { title: 'Colores Hex', slug: 'colores-hex', content: '# Colores Hex\n\n## Formato Hexadecimal\n```css\n#FFFFFF  /* Blanco */\n#000000  /* Negro */\n#FF0000  /* Rojo */\n#00FF00  /* Verde */\n#0000FF  /* Azul */\n```\n\n## Con Opacidad\n```css\n#FF000080  /* Rojo 50% opacidad */\n```\n\n## RGB\n```css\nrgb(255, 0, 0)      /* Rojo */\nrgba(255, 0, 0, 0.5)  /* Rojo 50% */\n```\n\n## HSL\n```css\nhsl(0, 100%, 50%)   /* Rojo */\nhsl(120, 100%, 50%) /* Verde */\n```', order: 1 }
  ]},
  { title: 'Sintaxis Básica', slug: 'sintaxis-basica', description: 'Llaves, paréntesis, corchetes.', difficulty: 'BEGINNER', duration: '3 horas', order: 4, categorySlug: 'fundamentos', lessons: [
    { title: 'Tipos de Parntesis', slug: 'sintaxis-tipos', content: '# Tipos de Paréntesis\n\n## { } Llaves (Curly Braces)\nBloques de código:\n\n```javascript\nif (x > 5) {\n    console.log("Mayor que 5");\n}\n```\n\n## ( ) Paréntesis\nFunciones y condiciones:\n\n```javascript\nmiFuncion(arg1, arg2);\nif (x === y) { }\n```\n\n## [ ] Corchetes\nArrays y propiedades:\n\n```javascript\nconst numeros = [1, 2, 3, 4];\nobjeto["propiedad"];\n```', order: 1 },
    { title: 'Punto y Coma', slug: 'sintaxis-punto-coma', content: '# Punto y Coma\n\n## ¿Obligatorio?\nEn JS moderno es opcional (ASI).\n\n```javascript\n// Con ;\nconst a = 1;\nconst b = 2;\n\n// Sin ; (funciona igual)\nconst a = 1\nconst b = 2\n```\n\n## Cuándo importa\n```javascript\nconst fn = () => {\n    return  // ASI no añade ; aquí\n    { nombre: "Juan" }  // ERROR!\n}\n\n// Correcto\nconst fn = () => {\n    return { nombre: "Juan" }\n}\n```\n\n## Best Practice\n- Proyectos grandes: USAR siempre\n- Consistencia > preferencia', order: 2 },
    { title: 'Comas y Separadores', slug: 'sintaxis-comas', content: '# Comas y Separadores\n\n## En Objetos\n```javascript\nconst persona = {\n    nombre: "Juan",\n    edad: 25,\n    ciudad: "Madrid"  // SIN coma al final\n};\n```\n\n## En Arrays\n```javascript\nconst numeros = [1, 2, 3, 4, 5];\n```\n\n## Errores Comunes\n```javascript\n// ERROR - coma al final\nconst nums = [1, 2, 3,];\n\n// ERROR - falta coma\nconst obj = {\n    nombre: "Juan"\n    edad: 25\n};\n```', order: 3 }
  ]},
  { title: 'Operadores', slug: 'operadores', description: 'Aritméticos, comparación, lógicos.', difficulty: 'BEGINNER', duration: '3 horas', order: 5, categorySlug: 'fundamentos', lessons: [
    { title: 'Aritméticos', slug: 'op-aritmeticos', content: '# Operadores Aritméticos\n\n```javascript\n+   // Suma\n-   // Resta\n*   // Multiplicación\n/   // División\n%   // Módulo (resto)\n**  // Exponente\n```\n\n## Ejemplos\n```javascript\n5 + 3      // 8\n10 - 4     // 6\n3 * 4      // 12\n15 / 3     // 5\n17 % 5     // 2 (resto)\n2 ** 3     // 8 (2 al cubo)\n```', order: 1 },
    { title: 'Comparación', slug: 'op-comparacion', content: '# Operadores de Comparación\n\n```javascript\n==   // Igual (con conversión)\n===  // Exactamente igual (recomendado)\n!=   // Distinto\n!==  // Exactamente distinto\n>    // Mayor que\n<    // Menor que\n>=   // Mayor o igual\n<=   // Menor o igual\n```\n\n## Ejemplos\n```javascript\n5 == "5"    // true (convierte)\n5 === "5"   // false (tipos distintos)\n10 > 5      // true\n```', order: 2 },
    { title: 'Lógicos', slug: 'op-logicos', content: '# Operadores Lógicos\n\n```javascript\n&&  // AND (y)\n||  // OR (o)\n!   // NOT (no)\n```\n\n## Truthy y Falsy\n**Falsy**: `false`, `0`, `""`, `null`, `undefined`, `NaN`\n\nTodo lo demás es **truthy**.\n\n```javascript\ntrue && true    // true\nfalse || true   // true\n!true           // false\n```', order: 3 }
  ]},
  { title: 'Variables', slug: 'variables', description: 'var, let, const, tipos de datos.', difficulty: 'BEGINNER', duration: '4 horas', order: 6, categorySlug: 'fundamentos', lessons: [
    { title: 'var, let, const', slug: 'var-let-const', content: '# Variables\n\n## var (NO usar)\n```javascript\nvar nombre = "Juan";\n```\n- Function scope\n\n## let (para cambiar)\n```javascript\nlet edad = 25;\nedad = 26;  // OK\n```\n- Block scope\n\n## const (fijo)\n```javascript\nconst PI = 3.1416;\n// PI = 3;  // ERROR\n```\n- Block scope\n\n## Cuál usar?\n- **const** → por defecto\n- **let** → si necesitas cambiar\n- **var** → NUNCA', order: 1 },
    { title: 'Tipos de Datos', slug: 'tipos-datos', content: '# Tipos de Datos\n\n## Primitivos\n```javascript\nconst nombre = "Juan";    // String\nconst edad = 25;          // Number\nconst activo = true;     // Boolean\nconst nada = null;       // Null\nlet sinValor;            // Undefined\nconst id = Symbol("id"); // Symbol\nconst grande = 9007199254740991n; // BigInt\n```\n\n## typeof\n```javascript\ntypeof "Hola"     // "string"\ntypeof 42         // "number"\ntypeof true       // "boolean"\ntypeof null      // "object" (bug histórico)\n```', order: 2 }
  ]},
  { title: 'HTML5 Junior', slug: 'html-junior', description: 'Fundamentos de HTML5. Estructura páginas web.', difficulty: 'BEGINNER', duration: '6 horas', order: 1, categorySlug: 'frontend', lessons: [
    { title: '¿Qué es HTML?', slug: 'html-que-es', content: '# Introducción a HTML\n\nHTML (HyperText Markup Language) es el lenguaje base para crear páginas web.\n\n## Estructura básica\n```html\n<!DOCTYPE html>\n<html lang="es">\n<head>\n    <meta charset="UTF-8">\n    <title>Mi Página</title>\n</head>\n<body>\n    <h1>¡Hola Mundo!</h1>\n</body>\n</html>\n```', order: 1 },
    { title: 'Encabezados y Párrafos', slug: 'html-encabezados', content: '# Encabezados y Párrafos\n\n## Encabezados (h1-h6)\n```html\n<h1>Título principal</h1>\n<h2>Subtítulo</h2>\n<h3>Sección</h3>\n```\n\n## Párrafos\n```html\n<p>Este es un párrafo.</p>\n```', order: 2 },
    { title: 'Listas', slug: 'html-listas', content: '# Listas en HTML\n\n## Lista ordenada\n```html\n<ol>\n    <li>Primer paso</li>\n    <li>Segundo paso</li>\n</ol>\n```\n\n## Lista desordenada\n```html\n<ul>\n    <li>Manzana</li>\n    <li>Naranja</li>\n</ul>\n```', order: 3 },
    { title: 'Enlaces e Imágenes', slug: 'html-enlaces', content: '# Enlaces\n\n```html\n<a href="https://ejemplo.com">Visitar sitio</a>\n```\n\n## Imágenes\n```html\n<img src="foto.jpg" alt="Descripción">\n```', order: 4 }
  ]},
  { title: 'HTML5 Senior', slug: 'html-senior', description: 'HTML semántico, formularios, SEO.', difficulty: 'INTERMEDIATE', duration: '8 horas', order: 2, categorySlug: 'frontend', lessons: [
    { title: 'HTML Semántico', slug: 'html-semantico', content: '# HTML Semántico\n\n```html\n<header>Encabezado</header>\n<nav>Navegación</nav>\n<main>Contenido principal</main>\n<article>Artículo</article>\n<section>Sección</section>\n<aside>Contenido lateral</aside>\n<footer>Pie de página</footer>\n```', order: 1 },
    { title: 'Formularios Avanzados', slug: 'html-formularios', content: '# Formularios\n\n## Tipos de input\n```html\n<input type="email" required>\n<input type="date">\n<input type="color">\n<input type="range">\n```', order: 2 },
    { title: 'SEO y Metadatos', slug: 'html-seo', content: '# SEO\n\n## Meta tags\n```html\n<meta name="description" content="Descripción para SEO">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n```', order: 3 }
  ]},
  { title: 'HTML5 Master', slug: 'html-master', description: 'Web Components, SVG, Canvas.', difficulty: 'ADVANCED', duration: '10 horas', order: 3, categorySlug: 'frontend', lessons: [
    { title: 'Web Components', slug: 'html-web-components', content: '# Web Components\n\n```javascript\nclass MiBoton extends HTMLElement {\n    connectedCallback() {\n        this.innerHTML = `<button>Click</button>`;\n    }\n}\ncustomElements.define("mi-boton", MiBoton);\n```', order: 1 },
    { title: 'SVG', slug: 'html-svg', content: '# SVG\n\n```html\n<svg width="100" height="100">\n    <circle cx="50" cy="50" r="40" fill="red" />\n</svg>\n```', order: 2 },
    { title: 'Canvas API', slug: 'html-canvas', content: '# Canvas\n\n```javascript\nconst canvas = document.getElementById("canvas");\nconst ctx = canvas.getContext("2d");\nctx.fillStyle = "blue";\nctx.fillRect(10, 10, 100, 50);\n```', order: 3 }
  ]},
  { title: 'HTML5 Tech Lead', slug: 'html-tech-lead', description: 'PWA, Performance.', difficulty: 'EXTREME', duration: '12 horas', order: 4, categorySlug: 'frontend', lessons: [
    { title: 'PWA', slug: 'html-pwa', content: '# Progressive Web Apps\n\n## Manifest\n```json\n{\n    "name": "Mi App",\n    "short_name": "App",\n    "display": "standalone"\n}\n```\n\n## Service Worker\n```javascript\nif ("serviceWorker" in navigator) {\n    navigator.serviceWorker.register("/sw.js");\n}\n```', order: 1 },
    { title: 'Performance', slug: 'html-performance', content: '# Performance\n\n## Lazy Loading\n```html\n<img src="img.jpg" loading="lazy">\n```\n\n## Preload\n```html\n<link rel="preload" href="fuente.woff2" as="font">\n```', order: 2 }
  ]},
  { title: 'CSS3 Junior', slug: 'css-junior', description: 'Selectores, modelo de caja, colores.', difficulty: 'BEGINNER', duration: '6 horas', order: 1, categorySlug: 'frontend', lessons: [
    { title: 'Selectores', slug: 'css-selectores', content: '# Selectores CSS\n\n```css\n* { margin: 0; }\np { color: blue; }\n.mi-clase { font-size: 16px; }\n#mi-id { background: yellow; }\n```', order: 1 },
    { title: 'Modelo de Caja', slug: 'css-caja', content: '# Box Model\n\n```css\n.box {\n    width: 200px;\n    padding: 20px;\n    border: 2px solid black;\n    margin: 10px;\n    box-sizing: border-box;\n}\n```', order: 2 },
    { title: 'Colores y Fondos', slug: 'css-colores', content: '# Colores\n\n```css\ncolor: #ff0000;\ncolor: rgb(255, 0, 0);\ncolor: rgba(255,0,0,0.5);\nbackground: linear-gradient(red, blue);\n```', order: 3 },
    { title: 'Display y Position', slug: 'css-display', content: '# Display\n\n```css\ndisplay: flex;\ndisplay: grid;\ndisplay: none;\nposition: static;\nposition: relative;\nposition: absolute;\n```', order: 4 }
  ]},
  { title: 'CSS3 Senior', slug: 'css-senior', description: 'Flexbox, Grid, animaciones.', difficulty: 'INTERMEDIATE', duration: '8 horas', order: 2, categorySlug: 'frontend', lessons: [
    { title: 'Flexbox', slug: 'css-flexbox', content: '# Flexbox\n\n```css\n.container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 20px;\n}\n```', order: 1 },
    { title: 'CSS Grid', slug: 'css-grid', content: '# Grid\n\n```css\n.grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 20px;\n}\n```', order: 2 },
    { title: 'Animaciones', slug: 'css-animaciones', content: '# Transiciones\n\n```css\n.element {\n    transition: all 0.3s ease;\n}\n.element:hover {\n    transform: scale(1.1);\n}\n```\n\n## Animaciones\n```css\n@keyframes slideIn {\n    from { opacity: 0; }\n    to { opacity: 1; }\n}\n```', order: 3 }
  ]},
  { title: 'CSS3 Master', slug: 'css-master', description: 'Grid avanzado, filtros, 3D.', difficulty: 'ADVANCED', duration: '10 horas', order: 3, categorySlug: 'frontend', lessons: [
    { title: 'Grid Avanzado', slug: 'css-grid-avanzado', content: '# Subgrid\n\n```css\n.child {\n    display: grid;\n    grid-column: span 3;\n    grid-template-columns: subgrid;\n}\n```', order: 1 },
    { title: 'Filtros y Efectos', slug: 'css-filtros', content: '# filter\n\n```css\n.imagen {\n    filter: blur(5px);\n    filter: grayscale(100%);\n}\n.backdrop-filter {\n    backdrop-filter: blur(10px);\n}\n```', order: 2 },
    { title: 'Transform 3D', slug: 'css-3d', content: '# 3D Transforms\n\n```css\n.scene {\n    perspective: 1000px;\n}\n.cube {\n    transform-style: preserve-3d;\n}\n```', order: 3 }
  ]},
  { title: 'CSS3 Tech Lead', slug: 'css-tech-lead', description: 'Arquitectura CSS, Performance.', difficulty: 'EXTREME', duration: '12 horas', order: 4, categorySlug: 'frontend', lessons: [
    { title: 'Arquitectura CSS', slug: 'css-arquitectura', content: '# BEM\n```css\n.block { }\n.block__element { }\n.block--modifier { }\n```\n\n# ITCSS\nsettings/ → generic/ → base/ → objects/ → components/ → utilities/', order: 1 },
    { title: 'Performance', slug: 'css-perf', content: '# Performance\n\n```css\n.animado {\n    will-change: transform, opacity;\n}\n.gpu {\n    transform: translateZ(0);\n    backface-visibility: hidden;\n}\n```', order: 2 }
  ]},
  { title: 'JavaScript Junior', slug: 'js-junior', description: 'Variables, funciones, arrays.', difficulty: 'BEGINNER', duration: '8 horas', order: 1, categorySlug: 'backend', lessons: [
    { title: 'Variables', slug: 'js-variables', content: '# Variables\n\n```javascript\nconst PI = 3.1416;\nlet nombre = "Juan";\nvar edad = 25;\n```\n\n## Tipos\n```javascript\nlet texto = "Hola";\nlet numero = 42;\nlet booleano = true;\nlet nada = null;\nlet indef = undefined;\n```', order: 1 },
    { title: 'Operadores', slug: 'js-operadores', content: '# Operadores\n\n## Aritméticos\n```javascript\n+ - * / % **\n5 % 2  // 1\n2 ** 3  // 8\n```\n\n## Comparación\n```javascript\n5 == "5"   // true\n5 === "5"  // false\n```\n\n## Lógicos\n```javascript\n&& || !\n```', order: 2 },
    { title: 'Funciones', slug: 'js-funciones', content: '# Funciones\n\n```javascript\nfunction saludar(nombre) {\n    return "Hola, " + nombre;\n}\nconst restar = (a, b) => a - b;\nconst sumar = (...nums) => nums.reduce((a, b) => a + b, 0);\n```', order: 3 },
    { title: 'Arrays', slug: 'js-arrays', content: '# Arrays\n\n```javascript\nconst frutas = ["manzana", "pera", "uva"];\nfrutas.push("kiwi");\nfrutas.pop();\n```\n\n## Métodos\n```javascript\nfrutas.map(f => f.toUpperCase());\nfrutas.filter(f => f.length > 4);\nfrutas.find(f => f === "pera");\n```', order: 4 }
  ]},
  { title: 'JavaScript Senior', slug: 'js-senior', description: 'Async/await, closures, Destructuring.', difficulty: 'INTERMEDIATE', duration: '10 horas', order: 2, categorySlug: 'backend', lessons: [
    { title: 'Async/Await', slug: 'js-async', content: '# Async/Await\n\n```javascript\nasync function obtenerDatos() {\n    try {\n        const res = await fetch("/api/datos");\n        return await res.json();\n    } catch (error) {\n        console.error(error);\n    }\n}\n```', order: 1 },
    { title: 'Destructuring', slug: 'js-destructuring', content: '# Destructuring\n\n```javascript\nconst [a, b, c] = [1, 2, 3];\nconst { nombre, edad } = persona;\nconst copia = [...arr];\nconst clon = { ...obj };\n```', order: 2 },
    { title: 'Closures', slug: 'js-closures', content: '# Closures\n\n```javascript\nfunction crearContador() {\n    let count = 0;\n    return {\n        incrementar: () => ++count,\n        valor: () => count\n    };\n}\n```', order: 3 }
  ]},
  { title: 'JavaScript Master', slug: 'js-master', description: 'ES Modules, Symbols, Generators.', difficulty: 'ADVANCED', duration: '12 horas', order: 3, categorySlug: 'backend', lessons: [
    { title: 'ES Modules', slug: 'js-modules', content: '# Modules\n\n```javascript\nexport const PI = 3.1416;\nexport function sumar(a, b) { return a + b; }\nexport default class Usuario { }\n\nimport { PI, sumar } from "./math.js";\nimport * as math from "./math.js";\nconst mod = await import("./modulo.js");\n```', order: 1 },
    { title: 'Symbols', slug: 'js-symbols', content: '# Symbols\n\n```javascript\nconst id = Symbol("id");\nconst user = { [id]: 1, nombre: "Juan" };\n```', order: 2 },
    { title: 'Generators', slug: 'js-generators', content: '# Generators\n\n```javascript\nfunction* generador() {\n    yield 1;\n    yield 2;\n    yield 3;\n}\nconst gen = generador();\ngen.next().value;  // 1\n```', order: 3 }
  ]},
  { title: 'JavaScript Tech Lead', slug: 'js-tech-lead', description: 'Patrones, Event Loop.', difficulty: 'EXTREME', duration: '15 horas', order: 4, categorySlug: 'backend', lessons: [
    { title: 'Patrones', slug: 'js-patrones', content: '# Singleton\n```javascript\nconst Singleton = (function() {\n    let instance;\n    return {\n        getInstance() {\n            if (!instance) instance = createInstance();\n            return instance;\n        }\n    };\n})();\n```\n\n# Observer\n```javascript\nclass EventEmitter {\n    on(event, cb) {\n        (this.events[event] ||= []).push(cb);\n    }\n    emit(event, ...args) {\n        this.events[event]?.forEach(cb => cb(...args));\n    }\n}\n```', order: 1 },
    { title: 'Event Loop', slug: 'js-event-loop', content: '# Event Loop\n\n```\n1. Call Stack\n2. Microtasks (Promise callbacks)\n3. Macrotasks (setTimeout, setInterval)\n```\n\n```javascript\nconsole.log("1");\nsetTimeout(() => console.log("2"), 0);\nPromise.resolve().then(() => console.log("3"));\nconsole.log("4");\n// Output: 1, 4, 3, 2\n```', order: 2 }
  ]},
  { title: 'React Junior', slug: 'react-junior', description: 'Componentes, JSX, useState.', difficulty: 'BEGINNER', duration: '8 horas', order: 1, categorySlug: 'frontend', lessons: [
    { title: 'Introducción', slug: 'react-intro', content: '# React\n\n## Vite\n```bash\nnpm create vite@latest mi-app -- --template react\n```\n\n## Componente\n```jsx\nimport { useState } from "react";\n\nfunction App() {\n    const [count, setCount] = useState(0);\n    return (\n        <div>\n            <h1>Contador: {count}</h1>\n            <button onClick={() => setCount(count + 1)}>+</button>\n        </div>\n    );\n}\nexport default App;\n```', order: 1 },
    { title: 'JSX', slug: 'react-jsx', content: '# JSX\n\n```jsx\nconst nombre = "Juan";\nconst elemento = <p>Hola, {nombre}</p>;\n{condicion ? "Sí" : "No"}\n{numeros.map(n => <span key={n}>{n}</span>)}\n```', order: 2 },
    { title: 'useState', slug: 'react-usestate', content: '# useState\n\n```jsx\nconst [count, setCount] = useState(0);\nsetCount(count + 1);\nsetCount(prev => prev + 1);\nconst [form, setForm] = useState({ nombre: "", email: "" });\nsetForm(prev => ({ ...prev, nombre: "Juan" }));\n```', order: 3 }
  ]},
  { title: 'React Senior', slug: 'react-senior', description: 'useEffect, custom hooks, context.', difficulty: 'INTERMEDIATE', duration: '10 horas', order: 2, categorySlug: 'frontend', lessons: [
    { title: 'useEffect', slug: 'react-useeffect', content: '# useEffect\n\n```jsx\nuseEffect(() => {\n    fetch("/api/datos").then(res => res.json()).then(setData);\n}, []);\n\nuseEffect(() => {\n    const subscription = api.subscribe(handleData);\n    return () => subscription.unsubscribe();\n}, []);\n```', order: 1 },
    { title: 'Custom Hooks', slug: 'react-hooks', content: '# Custom Hooks\n\n```javascript\nfunction useLocalStorage(key, initialValue) {\n    const [value, setValue] = useState(() => localStorage.getItem(key) || initialValue);\n    useEffect(() => localStorage.setItem(key, value), [key, value]);\n    return [value, setValue];\n}\n```', order: 2 },
    { title: 'Context', slug: 'react-context', content: '# Context API\n\n```jsx\nconst ThemeContext = createContext();\n\nfunction ThemeProvider({ children }) {\n    const [theme, setTheme] = useState("light");\n    return (\n        <ThemeContext.Provider value={{ theme, setTheme }}>\n            {children}\n        </ThemeContext.Provider>\n    );\n}\n```', order: 3 }
  ]},
  { title: 'React Tech Lead', slug: 'react-tech-lead', description: 'Patterns, micro-frontends.', difficulty: 'EXTREME', duration: '15 horas', order: 4, categorySlug: 'frontend', lessons: [
    { title: 'Patrones', slug: 'react-patrones', content: '# Compound Components\n\n```jsx\nfunction Tabs({ children }) {\n    const [active, setActive] = useState(0);\n    return (\n        <TabsContext.Provider value={{ active, setActive }}>\n            {children}\n        </TabsContext.Provider>\n    );\n}\nTabs.Panel = function Panel({ index, children }) {\n    const { active } = useContext(TabsContext);\n    return active === index ? children : null;\n};\n```', order: 1 }
  ]},
  { title: 'TypeScript Junior', slug: 'ts-junior', description: 'Tipos básicos, interfaces.', difficulty: 'BEGINNER', duration: '8 horas', order: 1, categorySlug: 'backend', lessons: [
    { title: 'Introducción', slug: 'ts-intro', content: '# TypeScript\n\n```bash\nnpm install -g typescript\ntsc --version\n```\n\n```json\n{\n    "compilerOptions": {\n        "target": "ES2020",\n        "strict": true\n    }\n}\n```', order: 1 },
    { title: 'Tipos', slug: 'ts-tipos', content: '# Tipos\n\n```typescript\nlet nombre: string = "Juan";\nlet edad: number = 25;\nlet activo: boolean = true;\nlet nums: number[] = [1, 2, 3];\nlet dinamico: any = 42;\n```', order: 2 },
    { title: 'Interfaces', slug: 'ts-interfaces', content: '# Interfaces\n\n```typescript\ninterface Usuario {\n    id: number;\n    nombre: string;\n    rol?: "admin" | "user";\n    readonly createdAt: Date;\n}\n```', order: 3 }
  ]},
  { title: 'TypeScript Senior', slug: 'ts-senior', description: 'Generics, utility types.', difficulty: 'INTERMEDIATE', duration: '10 horas', order: 2, categorySlug: 'backend', lessons: [
    { title: 'Genéricos', slug: 'ts-genericos', content: '# Genéricos\n\n```typescript\nfunction identidad<T>(arg: T): T { return arg; }\nidentidad<string>("hola");\nidentidad(42);\n\nfunction longest<T extends { length: number }>(a: T, b: T) {\n    return a.length > b.length ? a : b;\n}\n```', order: 1 },
    { title: 'Utility Types', slug: 'ts-utility', content: '# Utility Types\n\n```typescript\ntype Parcial = Partial<Usuario>;\ntype Requerido = Required<Usuario>;\ntype SoloLectura = Readonly<Usuario>;\ntype SinId = Omit<Usuario, "id">;\ntype SoloNombre = Pick<Usuario, "nombre">;\n```', order: 2 }
  ]},
  { title: 'TailwindCSS Junior', slug: 'tailwind-junior', description: 'Utilidades básicas, colors, spacing.', difficulty: 'BEGINNER', duration: '6 horas', order: 1, categorySlug: 'frameworks', lessons: [
    { title: 'Introducción', slug: 'tailwind-intro', content: '# Tailwind CSS\n\n```bash\nnpm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p\n```\n\n```js\nmodule.exports = {\n    content: ["./index.html", "./src/**/*.{js,jsx}"],\n    theme: { extend: {} },\n}\n```\n\n```html\n<div class="bg-blue-500 text-white p-4 rounded-lg">\n    Hola Tailwind\n</div>\n```', order: 1 },
    { title: 'Colors y Spacing', slug: 'tailwind-colors', content: '# Colores\n\n```html\n<p class="text-red-500">Rojo</p>\n<p class="bg-blue-500">Fondo azul</p>\n<p class="text-red-500/50">Semi transparente</p>\n```\n\n## Spacing\n```html\n<p class="p-4">padding</p>\n<p class="px-4 py-2">px horizontal, py vertical</p>\n<p class="mt-4">margin-top</p>\n```', order: 2 }
  ]},
  { title: 'Bootstrap Junior', slug: 'bootstrap-junior', description: 'Grid, componentes básicos.', difficulty: 'BEGINNER', duration: '6 horas', order: 1, categorySlug: 'frameworks', lessons: [
    { title: 'Introducción', slug: 'bootstrap-intro', content: '# Bootstrap 5\n\n```html\n<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>\n```\n\n```html\n<div class="container">...</div>\n<div class="container-fluid">...</div>\n```', order: 1 },
    { title: 'Grid System', slug: 'bootstrap-grid', content: '# Grid\n\n```html\n<div class="container">\n    <div class="row">\n        <div class="col-12 col-md-6 col-lg-4">\n            Columna\n        </div>\n    </div>\n</div>\n```\n\n```html\n<div class="row">\n    <div class="col">Auto</div>\n    <div class="col">Auto</div>\n</div>\n```', order: 2 }
  ]},
  { title: 'Vite Junior', slug: 'vite-junior', description: 'Setup, dev server.', difficulty: 'BEGINNER', duration: '4 horas', order: 1, categorySlug: 'herramientas', lessons: [
    { title: 'Introducción', slug: 'vite-intro', content: '# Vite\n\n```bash\nnpm create vite@latest mi-app\ncd mi-app\nnpm install\nnpm run dev\n```\n\n## Plantillas\n```bash\n--template vanilla\n--template vue\n--template react\n--template svelte\n```', order: 1 }
  ]},
  { title: 'Vite Senior', slug: 'vite-senior', description: 'Plugins, optimization.', difficulty: 'INTERMEDIATE', duration: '6 horas', order: 2, categorySlug: 'herramientas', lessons: [
    { title: 'Plugins', slug: 'vite-plugins', content: '# Vite Plugins\n\n```bash\nnpm install vite-plugin-pwa\n```\n\n```js\nimport { VitePWA } from "vite-plugin-pwa"\n\nexport default {\n    plugins: [\n        VitePWA({\n            registerType: "autoUpdate"\n        })\n    ]\n}\n```', order: 1 }
  ]},
  { title: 'MongoDB Junior', slug: 'mongodb-junior', description: 'CRUD básico, documentos.', difficulty: 'BEGINNER', duration: '6 horas', order: 1, categorySlug: 'bases-datos', lessons: [
    { title: 'Introducción', slug: 'mongo-intro', content: '# MongoDB\n\n- Base de datos → Colecciones → Documentos\n- Documentos = Objetos JSON (BSON)\n\n```javascript\nmongosh\n\ndb.usuarios.insertOne({\n    nombre: "Juan",\n    edad: 25,\n    email: "juan@email.com"\n});\n```', order: 1 },
    { title: 'Consultas', slug: 'mongo-queries', content: '# Queries\n\n```javascript\ndb.usuarios.find({ edad: { $gt: 18 } });\ndb.usuarios.find({}, { nombre: 1, _id: 0 });\ndb.usuarios.find().sort({ nombre: 1 }).limit(10);\n\n$eq, $ne, $gt, $gte, $lt, $lte\n$in, $nin, $and, $or, $not\n```\n\n```javascript\ndb.usuarios.updateOne(\n    { _id: 1 },\n    { $set: { nombre: "Juan Carlos" } }\n);\n```', order: 2 }
  ]},
  { title: 'MongoDB Senior', slug: 'mongodb-senior', description: 'Aggregation, indexing.', difficulty: 'INTERMEDIATE', duration: '8 horas', order: 2, categorySlug: 'bases-datos', lessons: [
    { title: 'Aggregation', slug: 'mongo-agg', content: '# Aggregation Pipeline\n\n```javascript\ndb.ventas.aggregate([\n    { $match: { year: 2024 } },\n    { $group: {\n        _id: "$producto",\n        total: { $sum: "$cantidad" },\n        ingreso: { $sum: { $multiply: ["$precio", "$cantidad"] } }\n    }},\n    { $sort: { ingreso: -1 } }\n]);\n```\n\n```javascript\ndb.pedidos.aggregate([\n    { $lookup: {\n        from: "clientes",\n        localField: "clienteId",\n        foreignField: "_id",\n        as: "cliente"\n    }}\n]);\n```', order: 1 }
  ]},
  { title: 'MySQL Junior', slug: 'mysql-junior', description: 'Tablas, SELECT, WHERE.', difficulty: 'BEGINNER', duration: '6 horas', order: 1, categorySlug: 'bases-datos', lessons: [
    { title: 'Introducción', slug: 'mysql-intro', content: '# MySQL\n\n```bash\nmysql -u root -p\n```\n\n```sql\nCREATE DATABASE tienda;\nUSE tienda;\n\nCREATE TABLE productos (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    nombre VARCHAR(100) NOT NULL,\n    precio DECIMAL(10,2)\n);\n```', order: 1 },
    { title: 'SELECT', slug: 'mysql-select', content: '# SELECT\n\n```sql\nSELECT * FROM productos;\nSELECT nombre, precio FROM productos WHERE precio > 100;\nSELECT * FROM productos ORDER BY precio DESC LIMIT 10;\nSELECT COUNT(*), AVG(precio) FROM productos;\n```', order: 2 }
  ]},
  { title: 'MySQL Senior', slug: 'mysql-senior', description: 'JOINs avanzados, subqueries.', difficulty: 'INTERMEDIATE', duration: '8 horas', order: 2, categorySlug: 'bases-datos', lessons: [
    { title: 'JOINs', slug: 'mysql-joins', content: '# JOINs\n\n```sql\nSELECT p.nombre, c.nombre \nFROM productos p\nINNER JOIN categorias c ON p.categoria_id = c.id;\n\nSELECT p.nombre, p.stock \nFROM productos p\nLEFT JOIN categorias c ON p.categoria_id = c.id;\n\nSELECT * FROM productos RIGHT JOIN categorias;\n```', order: 1 }
  ]},
  { title: 'Next.js Junior', slug: 'next-junior', description: 'App Router, pages.', difficulty: 'BEGINNER', duration: '8 horas', order: 1, categorySlug: 'frontend', lessons: [
    { title: 'Introducción', slug: 'next-intro', content: '# Next.js 14\n\n```bash\nnpx create-next-app@latest mi-app\ncd mi-app\nnpm run dev\n```\n\n## Estructura (App Router)\n```\napp/\n  page.jsx        → /\n  about/page.jsx  → /about\n  blog/[slug]/page.jsx → /blog/... \n```', order: 1 },
    { title: 'Componentes', slug: 'next-components', content: '# Componentes\n\n```jsx\nimport Navbar from "@/components/Navbar";\n\nexport default function Layout({ children }) {\n    return (\n        <>\n            <Navbar />\n            <main>{children}</main>\n        </>\n    );\n}\n```\n\n```jsx\nimport Image from "next/image";\n<Image src="/foto.jpg" width={200} height={200} alt="Foto" />\n```', order: 2 }
  ]},
  { title: 'Next.js Senior', slug: 'next-senior', description: 'Server Actions, Middleware.', difficulty: 'INTERMEDIATE', duration: '10 horas', order: 2, categorySlug: 'frontend', lessons: [
    { title: 'Server Actions', slug: 'next-actions', content: '# Server Actions\n\n```jsx\n"use server"\nexport async function createPost(formData) {\n    const title = formData.get("title");\n    await db.post.create({ data: { title } });\n    revalidatePath("/posts");\n}\n```', order: 1 },
    { title: 'Middleware', slug: 'next-middleware', content: '# Middleware\n\n```typescript\nimport { NextResponse } from "next/server";\n\nexport function middleware(request) {\n    const token = request.cookies.get("token");\n    if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {\n        return NextResponse.redirect(new URL("/login", request.url));\n    }\n    return NextResponse.next();\n}\n\nexport const config = {\n    matcher: ["/dashboard/:path*"]\n};\n```', order: 2 }
  ]},
  { title: 'Java Junior', slug: 'java-junior', description: 'Variables, clases, POO.', difficulty: 'BEGINNER', duration: '10 horas', order: 1, categorySlug: 'backend', lessons: [
    { title: 'Introducción', slug: 'java-intro', content: '# Java\n\n```bash\njava -version\njavac -version\n```\n\n```java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hola Mundo");\n    }\n}\n```\n\n```bash\njavac Main.java\njava Main\n```', order: 1 },
    { title: 'Variables', slug: 'java-variables', content: '# Variables\n\n```java\nint edad = 25;\ndouble precio = 19.99;\nboolean activo = true;\nchar inicial = "J".charAt(0);\nString nombre = "Juan";\nfinal double PI = 3.1416;\n```', order: 2 },
    { title: 'Clases', slug: 'java-clases', content: '# Clases\n\n```java\npublic class Persona {\n    private String nombre;\n    private int edad;\n    \n    public Persona(String nombre, int edad) {\n        this.nombre = nombre;\n        this.edad = edad;\n    }\n    \n    public void saludar() {\n        System.out.println("Hola, soy " + nombre);\n    }\n}\n\nPersona p = new Persona("Juan", 25);\np.saludar();\n```', order: 3 }
  ]},
  { title: 'Python Junior', slug: 'python-junior', description: 'Sintaxis, variables, funciones.', difficulty: 'BEGINNER', duration: '8 horas', order: 2, categorySlug: 'backend', lessons: [
    { title: 'Introducción', slug: 'python-intro', content: '# Python\n\n```bash\npython --version\n```\n\n```python\nprint("Hola Mundo")\n```', order: 1 },
    { title: 'Variables', slug: 'python-variables', content: '# Variables\n\n```python\nnombre = "Juan"\nedad = 25\nprecio = 19.99\nactivo = True\n```\n\n## Tipos\n```python\na = 10        # int\nb = 3.14     # float\nc = "Hola"   # str\nd = True     # bool\n```', order: 2 },
    { title: 'Funciones', slug: 'python-funciones', content: '# Funciones\n\n```python\ndef saludar(nombre):\n    return f"Hola, {nombre}"\n\n# Lambda\nsumar = lambda a, b: a + b\n```', order: 3 }
  ]},
  { title: 'Node.js Junior', slug: 'node-junior', description: 'NPM, módulos, fs, http.', difficulty: 'BEGINNER', duration: '8 horas', order: 3, categorySlug: 'backend', lessons: [
    { title: 'Introducción', slug: 'node-intro', content: '# Node.js\n\n```bash\nnode --version\nnpm --version\n```\n\n```javascript\nconsole.log("Hola desde Node");\n```', order: 1 },
    { title: 'Módulos', slug: 'node-modulos', content: '# Módulos\n\n```javascript\n// CommonJS\nconst fs = require("fs");\nconst miModulo = require("./miModulo");\n\n// ES Modules\nimport fs from "fs";\n```', order: 2 },
    { title: 'File System', slug: 'node-fs', content: '# fs\n\n```javascript\nconst fs = require("fs");\n\n// Leer\nfs.readFile("archivo.txt", "utf8", (err, data) => {\n    console.log(data);\n});\n\n// Escribir\nfs.writeFile("nuevo.txt", "Contenido", err => {});\n```', order: 3 },
    { title: 'HTTP Server', slug: 'node-http', content: '# HTTP\n\n```javascript\nconst http = require("http");\n\nconst server = http.createServer((req, res) => {\n    res.writeHead(200, { "Content-Type": "text/plain" });\n    res.end("Hola");\n});\n\nserver.listen(3000);\n```', order: 4 }
  ]},
  { title: 'Express Senior', slug: 'express-senior', description: 'Rutas, middleware, REST.', difficulty: 'INTERMEDIATE', duration: '10 horas', order: 4, categorySlug: 'backend', lessons: [
    { title: 'Express Básico', slug: 'express-basic', content: '# Express\n\n```bash\nnpm install express\n```\n\n```javascript\nconst express = require("express");\nconst app = express();\n\napp.get("/", (req, res) => res.send("Hola"));\napp.listen(3000);\n```', order: 1 },
    { title: 'Rutas y Parámetros', slug: 'express-rutas', content: '# Rutas\n\n```javascript\napp.get("/users/:id", (req, res) => {\n    const id = req.params.id;\n    res.json({ id });\n});\n\napp.get("/search", (req, res) => {\n    const query = req.query.q;\n});\n```', order: 2 },
    { title: 'Middleware', slug: 'express-middleware', content: '# Middleware\n\n```javascript\napp.use((req, res, next) => {\n    console.log(req.method, req.url);\n    next();\n});\n\napp.use("/api", authMiddleware);\n```', order: 3 }
  ]},
  { title: 'API REST', slug: 'api-rest', description: 'CRUD, JSON, Headers.', difficulty: 'INTERMEDIATE', duration: '8 horas', order: 5, categorySlug: 'backend', lessons: [
    { title: 'REST Concepts', slug: 'api-concepts', content: '# REST\n\n## Verbos\n- GET → Leer\n- POST → Crear\n- PUT/PATCH → Actualizar\n- DELETE → Eliminar\n\n## Códigos\n- 200 OK\n- 201 Created\n- 400 Bad Request\n- 404 Not Found\n- 500 Server Error', order: 1 },
    { title: 'JSON', slug: 'api-json', content: '# JSON\n\n```json\n{\n    "usuarios": [\n        { "id": 1, "nombre": "Juan" }\n    ]\n}\n```\n\n```javascript\nres.json({ mensaje: "OK" });\n```', order: 2 }
  ]},
  { title: 'Python Senior', slug: 'python-senior', description: 'Decoradores, generadores, context managers.', difficulty: 'INTERMEDIATE', duration: '10 horas', order: 6, categorySlug: 'backend', lessons: [
    { title: 'Decoradores', slug: 'python-decoradores', content: '# Decoradores\n\n```python\ndef mi_decorador(func):\n    def wrapper(*args, **kwargs):\n        print("Antes")\n        result = func(*args, **kwargs)\n        print("Después")\n        return result\n    return wrapper\n\n@mi_decorador\ndef saludar():\n    print("Hola")\n```', order: 1 },
    { title: 'Generadores', slug: 'python-generadores', content: '# Generadores\n\n```python\ndef contador(max):\n    n = 0\n    while n < max:\n        yield n\n        n += 1\n\nfor i in contador(5):\n    print(i)\n```', order: 2 }
  ]},
  { title: 'Node.js Senior', slug: 'node-senior', description: 'Streams, eventos, clustering.', difficulty: 'INTERMEDIATE', duration: '10 horas', order: 7, categorySlug: 'backend', lessons: [
    { title: 'Streams', slug: 'node-streams', content: '# Streams\n\n```javascript\nconst fs = require("fs");\n\nconst read = fs.createReadStream("archivo.txt");\nread.on("data", chunk => console.log(chunk));\n```\n\n```javascript\n// Pipe\nfs.createReadStream("in.txt").pipe(fs.createWriteStream("out.txt"));\n```', order: 1 },
    { title: 'EventEmitter', slug: 'node-events', content: '# Events\n\n```javascript\nconst EventEmitter = require("events");\n\nclass MyEmitter extends EventEmitter {}\nconst emitter = new MyEmitter();\n\nemitter.on("evento", data => console.log(data));\nemitter.emit("evento", "Hola");\n```', order: 2 }
  ]},
  { title: 'TypeScript Backend', slug: 'ts-backend', description: 'TypeScript en Node.js.', difficulty: 'INTERMEDIATE', duration: '8 horas', order: 8, categorySlug: 'backend', lessons: [
    { title: 'TS en Node', slug: 'ts-node', content: '# TypeScript + Node\n\n```bash\nnpm install -D typescript @types/node ts-node\nnpx tsc --init\n```\n\n```typescript\nimport { Request, Response } from "express";\n\napp.get("/", (req: Request, res: Response) => {\n    res.json({ message: "Hola" });\n});\n```', order: 1 }
  ]},
  { title: 'Java Senior', slug: 'java-senior', description: 'Herencia, polimorfismo, interfaces.', difficulty: 'INTERMEDIATE', duration: '12 horas', order: 9, categorySlug: 'backend', lessons: [
    { title: 'POO', slug: 'java-poo', content: '# POO\n\n```java\npublic class Animal {\n    protected String nombre;\n    \n    public Animal(String nombre) {\n        this.nombre = nombre;\n    }\n    \n    public abstract void sonido();\n}\n\npublic class Perro extends Animal {\n    public Perro(String nombre) { super(nombre); }\n    \n    @Override\n    public void sonido() { System.out.println("Guau"); }\n}\n```', order: 1 }
  ]},
  { title: 'Python Master', slug: 'python-master', description: 'Async, typing avanzado.', difficulty: 'ADVANCED', duration: '12 horas', order: 10, categorySlug: 'backend', lessons: [
    { title: 'Async/Await', slug: 'python-async', content: '# Async\n\n```python\nimport asyncio\n\nasync def fetch_data():\n    await asyncio.sleep(1)\n    return "datos"\n\nasync def main():\n    result = await fetch_data()\n    print(result)\n\nasyncio.run(main())\n```', order: 1 }
  ]},
  { title: 'Node.js Master', slug: 'node-master', description: 'Worker threads, native addons.', difficulty: 'ADVANCED', duration: '12 horas', order: 11, categorySlug: 'backend', lessons: [
    { title: 'Worker Threads', slug: 'node-workers', content: '# Worker Threads\n\n```javascript\nconst { Worker } = require("worker_threads");\n\nconst worker = new Worker("./task.js");\nworker.on("message", msg => console.log(msg));\n```', order: 1 }
  ]},
  { title: 'Node.js Tech Lead', slug: 'node-tech-lead', description: 'Microservicios, Docker, CI/CD.', difficulty: 'EXTREME', duration: '15 horas', order: 12, categorySlug: 'backend', lessons: [
    { title: 'Microservicios', slug: 'node-micro', content: '# Microservicios\n\n```javascript\n// API Gateway\napp.use("/users", userService);\napp.use("/orders", orderService);\n```\n\n```dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nCMD ["node", "server.js"]\n```', order: 1 },
    { title: 'CI/CD', slug: 'node-cicd', content: '# CI/CD\n\n```yaml\n# .github/workflows/deploy.yml\nname: Deploy\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: npm ci\n      - run: npm test\n      - run: npm run build\n```', order: 2 }
  ]},
  { title: 'Express Master', slug: 'express-master', description: 'Autenticación, seguridad.', difficulty: 'ADVANCED', duration: '10 horas', order: 13, categorySlug: 'backend', lessons: [
    { title: 'JWT', slug: 'express-jwt', content: '# JWT\n\n```javascript\nconst jwt = require("jsonwebtoken");\n\napp.post("/login", (req, res) => {\n    const token = jwt.sign({ id: user.id }, "secreto", { expiresIn: "1h" });\n    res.json({ token });\n});\n\napp.get("/protected", verifyToken, (req, res) => {\n    res.json({ data: "secreto" });\n});\n```', order: 1 },
    { title: 'Security', slug: 'express-security', content: '# Security\n\n```javascript\nconst helmet = require("helmet");\nconst rateLimit = require("express-rate-limit");\n\napp.use(helmet());\napp.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));\n```', order: 2 }
  ]},
  { title: 'Python Game Dev Junior', slug: 'pygame-junior', description: 'Pygame, sprites, bucles de juego.', difficulty: 'BEGINNER', duration: '8 horas', order: 1, categorySlug: 'videojuegos', lessons: [
    { title: 'Pygame Intro', slug: 'pygame-intro', content: '# Pygame\n\n```bash\npip install pygame\n```\n\n```python\nimport pygame\npygame.init()\npantalla = pygame.display.set_mode((800, 600))\npygame.display.set_caption("Mi Juego")\n```', order: 1 },
    { title: 'El Game Loop', slug: 'pygame-loop', content: '# Game Loop\n\n```python\nwhile corre:\n    for evento in pygame.event.get():\n        if evento.type == pygame.QUIT:\n            corre = False\n    pantalla.fill((0, 0, 0))\n    pygame.display.flip()\n```', order: 2 },
    { title: 'Sprites y Imágenes', slug: 'pygame-sprites', content: '# Sprites\n\n```python\nclass Jugador(pygame.sprite.Sprite):\n    def __init__(self):\n        self.image = pygame.image.load("jugador.png")\n        self.rect = self.image.get_rect()\n    def update(self):\n        self.rect.x += 5\n```', order: 3 },
    { title: 'Colisiones', slug: 'pygame-colisiones', content: '# Colisiones\n\n```python\nif pygame.sprite.spritecollide(jugador, enemigos, False):\n    print("Colisión!")\n```\n\n```python\npygame.sprite.groupcollide(enemigos, balas, True, True)\n```', order: 4 }
  ]},
  { title: 'Python Game Dev Senior', slug: 'pygame-senior', description: 'Física, IA, multiplayer.', difficulty: 'INTERMEDIATE', duration: '10 horas', order: 2, categorySlug: 'videojuegos', lessons: [
    { title: 'Física Básica', slug: 'pygame-fisica', content: '# Física\n\n```python\nclass Bola:\n    def __init__(self):\n        self.x = 400\n        self.y = 300\n        self.vx = 3\n        self.vy = 2\n    \n    def update(self):\n        self.x += self.vx\n        self.y += self.vy\n        if self.x < 0 or self.x > 800: self.vx *= -1\n```', order: 1 },
    { title: 'IA Enemiga', slug: 'pygame-ia', content: '# IA\n\n```python\nclass Enemigo:\n    def update(self):\n        if self.x < jugador.x:\n            self.x += velocidad\n        else:\n            self.x -= velocidad\n```', order: 2 },
    { title: 'Sonido', slug: 'pygame-sonido', content: '# Sonido\n\n```python\npygame.mixer.init()\nmusica = pygame.mixer.Sound("musica.ogg")\nmusica.play(-1)\nsonido = pygame.mixer.Sound("disparo.wav")\nsonido.play()\n```', order: 3 }
  ]},
  { title: 'Python Game Dev Master', slug: 'pygame-master', description: 'Shaders, optimización, tile maps.', difficulty: 'ADVANCED', duration: '12 horas', order: 3, categorySlug: 'videojuegos', lessons: [
    { title: 'Tile Maps', slug: 'pygame-tilemap', content: '# Tile Maps\n\n```python\nTILE_SIZE = 32\nmapa = [\n    [1, 1, 1, 1, 1],\n    [1, 0, 0, 0, 1],\n    [1, 0, 2, 0, 1],\n]\n\nfor y, fila in enumerate(mapa):\n    for x, tile in enumerate(fila):\n        if tile == 1: dibujar_pared(x*32, y*32)\n```', order: 1 },
    { title: 'Optimización', slug: 'pygame-opt', content: '# Optimización\n\n```python\n# Usar Surface para batch rendering\nsuperficie = pygame.Surface((800, 600))\nsuperficie.blit(sprite1, (0, 0))\npantalla.blit(superficie, (0, 0))\n\n# Usar sprites groups\ntodos_los_sprites.draw(pantalla)\n```', order: 2 }
  ]},
  { title: 'JavaScript Game Dev Junior', slug: 'js-game-junior', description: 'Canvas, game loop, sprites.', difficulty: 'BEGINNER', duration: '8 horas', order: 4, categorySlug: 'videojuegos', lessons: [
    { title: 'Canvas API', slug: 'js-canvas', content: '# Canvas\n\n```javascript\nconst canvas = document.getElementById("juego");\nconst ctx = canvas.getContext("2d");\n\nctx.fillStyle = "blue";\nctx.fillRect(100, 100, 50, 50);\n```', order: 1 },
    { title: 'Game Loop', slug: 'js-gameloop', content: '# Game Loop\n\n```javascript\nfunction gameLoop() {\n    update();\n    draw();\n    requestAnimationFrame(gameLoop);\n}\n\nfunction update() {\n    jugador.x += velocidad;\n}\n\nfunction draw() {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    ctx.drawImage(img, jugador.x, jugador.y);\n}\n\ngameLoop();\n```', order: 2 },
    { title: 'Sprites', slug: 'js-sprites', content: '# Sprites\n\n```javascript\nconst img = new Image();\nimg.src = "player.png";\n\nclass Jugador {\n    constructor() {\n        this.x = 100;\n        this.y = 100;\n        this.width = 32;\n        this.height = 32;\n    }\n    draw() {\n        ctx.drawImage(img, this.x, this.y, this.width, this.height);\n    }\n}\n```', order: 3 }
  ]},
  { title: 'JavaScript Game Dev Senior', slug: 'js-game-senior', description: 'Física, partículas, tilemaps.', difficulty: 'INTERMEDIATE', duration: '10 horas', order: 5, categorySlug: 'videojuegos', lessons: [
    { title: 'Física 2D', slug: 'js-fisica', content: '# Física\n\n```javascript\nconst gravedad = 0.5;\nconst friccion = 0.9;\n\nclass Actor {\n    constructor() {\n        this.vx = 0;\n        this.vy = 0;\n    }\n    update() {\n        this.vy += gravedad;\n        this.x += this.vx;\n        this.y += this.vy;\n        this.vx *= friccion;\n        this.y *= friccion;\n    }\n}\n```', order: 1 },
    { title: 'Partículas', slug: 'js-particulas', content: '# Partículas\n\n```javascript\nclass Particula {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n        this.vx = Math.random() * 4 - 2;\n        this.vy = Math.random() * 4 - 2;\n        this.vida = 60;\n    }\n    update() {\n        this.x += this.vx;\n        this.y += this.vy;\n        this.vida--;\n    }\n    draw() {\n        ctx.globalAlpha = this.vida / 60;\n        ctx.fillStyle = "orange";\n        ctx.fillRect(this.x, this.y, 4, 4);\n    }\n}\n```', order: 2 },
    { title: 'Tilemaps', slug: 'js-tilemap', content: '# Tilemaps\n\n```javascript\nconst TILE_SIZE = 32;\nconst mapa = [\n    [1,1,1,1,1],\n    [1,0,0,0,1],\n    [1,0,2,0,1],\n];\n\nfunction drawMap() {\n    for(let y=0; y<mapa.length; y++) {\n        for(let x=0; x<mapa[y].length; x++) {\n            if(mapa[y][x] === 1) {\n                ctx.fillRect(x*TILE_SIZE, y*TILE_SIZE, TILE_SIZE, TILE_SIZE);\n            }\n        }\n    }\n}\n```', order: 3 }
  ]},
  { title: 'JavaScript Game Dev Master', slug: 'js-game-master', description: 'Shaders, WebGL, multiplayer.', difficulty: 'ADVANCED', duration: '12 horas', order: 6, categorySlug: 'videojuegos', lessons: [
    { title: 'WebGL Intro', slug: 'js-webgl', content: '# WebGL\n\n```javascript\nconst gl = canvas.getContext("webgl");\n\nconst vsSource = `\n    attribute vec4 aPosition;\n    void main() { gl_Position = aPosition; }\n`;\n\nconst fsSource = `\n    precision mediump float;\n    void main() { gl_FragColor = vec4(1,0,0,1); }\n`;\n```', order: 1 },
    { title: 'WebSocket Multiplayer', slug: 'js-multiplayer', content: '# Multiplayer\n\n```javascript\nconst ws = new WebSocket("ws://servidor.com");\n\nws.onmessage = (event) => {\n    const data = JSON.parse(event.data);\n    if(data.type === "playerMove") {\n        otrosJugadores[data.id].x = data.x;\n    }\n};\n\nfunction sendMove() {\n    ws.send(JSON.stringify({\n        type: "playerMove",\n        x: jugador.x,\n        y: jugador.y\n    }));\n}\n```', order: 2 }
  ]},
  { title: 'Phaser.js', slug: 'phaser-junior', description: 'Framework para juegos 2D.', difficulty: 'INTERMEDIATE', duration: '8 horas', order: 7, categorySlug: 'videojuegos', lessons: [
    { title: 'Intro Phaser', slug: 'phaser-intro', content: '# Phaser 3\n\n```html\n<script src="https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.min.js"></script>\n```\n\n```javascript\nconst config = {\n    type: Phaser.AUTO,\n    width: 800,\n    height: 600,\n    scene: { preload, create, update }\n};\n\nnew Phaser.Game(config);\n```', order: 1 },
    { title: 'Sprites y Física', slug: 'phaser-physics', content: '# Física en Phaser\n\n```javascript\nfunction preload() {\n    this.load.image("player", "player.png");\n}\n\nfunction create() {\n    this.player = this.physics.add.sprite(400, 300, "player");\n    this.player.setCollideWorldBounds(true);\n}\n\nfunction update() {\n    if(cursors.left.isDown) this.player.setVelocityX(-200);\n}\n```', order: 2 }
  ]},
  { title: 'Godot', slug: 'godot-junior', description: 'Game engine open source.', difficulty: 'BEGINNER', duration: '8 horas', order: 8, categorySlug: 'videojuegos', lessons: [
    { title: 'Intro Godot', slug: 'godot-intro', content: '# Godot 4\n\n- Descargar de godotengine.org\n- Interfaz: Editor, Scene Tree, Inspector\n- Nodos y Escenas\n\n```gdscript\nfunc _ready():\n    print("Hola Mundo")\n```', order: 1 },
    { title: 'GDScript', slug: 'godot-gdscript', content: '# GDScript\n\n```gdscriptnext\nextends CharacterBody2D\n\n@export var speed = 200\n\nfunc _physics_process(delta):\n    var velocity = Vector2.ZERO\n    \n    if Input.is_action_pressed("right"):\n        velocity.x = 1\n    if Input.is_action_pressed("left"):\n        velocity.x = -1\n    \n    velocity = velocity.normalized() * speed\n    move_and_slide()\n```', order: 2 }
  ]}
];

async function main() {
  console.log('Iniciando seed completo...');
  
  for (const cat of categories) {
    const created = await prisma.category.upsert({ 
      where: { slug: cat.slug }, 
      update: cat, 
      create: cat 
    });
    console.log('Categoria:', created.name);
    
    for (const course of courses.filter(c => c.categorySlug === cat.slug).sort((a, b) => a.order - b.order)) {
      const { lessons, categorySlug, order, ...courseFields } = course;
      const c = await prisma.course.upsert({ 
        where: { slug: course.slug }, 
        update: { ...courseFields, order, featured: courseFields.order === 1, published: true }, 
        create: { ...courseFields, order, featured: courseFields.order === 1, published: true, categoryId: created.id } 
      });
      console.log('  Curso:', c.title, `(${c.difficulty})`);
      
      for (const lesson of lessons.sort((a, b) => a.order - b.order)) {
        await prisma.lesson.upsert({ 
          where: { slug: lesson.slug }, 
          update: lesson, 
          create: { ...lesson, published: true, courseId: c.id } 
        });
      }
    }
  }
  console.log('Seed completado!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
