# 🌐 Zona Wordle

Este repositorio es un clon del popular juego **Wordle** que puedes jugar directamente en tu navegador. A continuación, te explico cómo está estructurado y cómo funciona el proyecto.
- Para poder jugar dirígete a la [web](https://zona05.github.io/My-own-basic-Wordle/) desde el navegador.

## 📄 Archivos en el Repositorio

## 1. `index.html` 📝
El archivo principal de la aplicación. Contiene el diseño básico de la interfaz y la estructura del juego.
## 2. `style.css` 🎨
Contiene todos los estilos del juego, incluyendo los colores de las celdas y el cambio entre modo oscuro y claro.
## 3. `script.js` 🧠
Este archivo maneja la lógica del juego. A través de eventos de teclado y clics en las teclas en pantalla, los jugadores pueden ingresar sus palabras, y el juego las valida, comparando con la palabra objetivo.

## 💻 Preview del juego
![Captura del juego](https://i.imgur.com/P2DM5LB.png)
## ⚙️ Funcionalidad
- Reglas del Juego: Tienes 6 intentos para adivinar la palabra de 5 letras.
- Colores: Las celdas de las palabras ingresadas cambiarán de color:
  - Verde 🌱: La letra es correcta y está en la posición correcta.
  - Amarillo 💛: La letra está en la palabra, pero en la posición incorrecta.
  - Gris 🚫: La letra no está en la palabra.
- Cambio de Tema: Puedes alternar entre el modo oscuro 🌙 y modo claro ☀️ usando un botón.
## 🎮 Cómo Jugar
1. Escribe una palabra de 5 letras usando las teclas de tu teclado o las teclas en pantalla.
2. Pulsa Enter ↩️ para enviar la palabra y ver si es correcta.
3. Si adivinas la palabra correctamente, ¡felicitaciones! 🎉
4. Si no adivinas en los 6 intentos, perderás y se mostrará la palabra correcta 😔.
## 🔧 Instalación y Ejecución
1. Clona este repositorio: ```git clone https://github.com/zona05/My-own-basic-Wordle.git```
2. Asegúrate de tener un servidor local creado con Python o con la extensión `Live Server` de VSCode.
3. Abre `index.html` en tu navegador.
