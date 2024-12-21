console.log("Wordle Clone");

const rows = 6;
const cols = 5;

const board = document.querySelector(".board");

// Creación de celdas.
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
  }
}

let currentRow = 0;
let currentCol = 0;

// Para ejecutar el sonido de las teclas.
function playKeySound() {
  const keySound = new Audio('sounds/keypress.mp3');
  keySound.currentTime = 0;
  keySound.play();
}

// Para normalizar las palabras (sin acentos, sin diéresis, etc.)
function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function loadWordsFromFile() {
  try {
    const response = await fetch('words/palabras.txt');
    const data = await response.text();
    
    const words = data.split("\n")
      .map(word => word.trim().toUpperCase())
      .filter(word => word.length === 5)
      .map(word => normalizeString(word)); 

    console.log(words);
    return words;
  } catch (error) {
    console.error("Error al cargar el archivo:", error);
  }
}

let targetWord;
let validWords = [];

// Escoger una palabra aleatoria desde el archivo .txt
loadWordsFromFile().then(words => {
  validWords = words;  
  targetWord = words[Math.floor(Math.random() * words.length)];
  console.log(`Palabra objetivo cargada: ${targetWord}`);  
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();

  if (/^[A-Z]$/.test(key)) {
    addLetter(key);
    playKeySound();
  } else if (key === "BACKSPACE") {
    removeLetter();
    playKeySound();
  } else if (key === "ENTER") {
    submitWord();
    playKeySound();
  }
});

// Para añadir letras a las celdas.
function addLetter(letter) {
  if (currentCol < cols) {
    const cells = document.querySelectorAll(".cell");
    const index = currentRow * cols + currentCol;
    cells[index].textContent = letter;
    currentCol++;
  }
}

// Para eliminar letras de las celdas.
function removeLetter() {
  if (currentCol > 0) {
    currentCol--;
    const cells = document.querySelectorAll(".cell");
    const index = currentRow * cols + currentCol;
    cells[index].textContent = "";
  }
}

// Para enviar la palabra a comprobar su longitud correcta y compararla con la palabra objetivo.
function submitWord() {
  if (currentCol === cols) {
    const cells = document.querySelectorAll(".cell");
    const guess = [];

    for (let i = 0; i < cols; i++) {
      const index = currentRow * cols + i;
      guess.push(cells[index].textContent);
    }

    const guessWord = guess.join("").toUpperCase();

    if (guessWord.length === 5) {
      const normalizedGuessWord = normalizeString(guessWord);

      if (!validWords.includes(normalizedGuessWord)) {
        alert("La palabra no es válida.");
        return; 
      }

      if (normalizedGuessWord === normalizeString(targetWord)) {
        playSound("correct.mp3");
        setTimeout(() => alert("¡Ganaste!"), 100);
        document.removeEventListener("keydown", handleKeydown);
        return;
      }

      colorCells(guessWord);

      currentRow++;
      currentCol = 0;

      if (currentRow === rows) {
        playSound("error.mp3");
        setTimeout(() => alert(`Perdiste. La palabra era: ${targetWord}`), 100);
        document.removeEventListener("keydown", handleKeydown);
      }
    } else {
      alert("La palabra debe tener 5 letras");
    }
  } else {
    alert("La palabra debe tener 5 letras");
  }
}

// Para colorear las celdas dependiendo de la acción sucedida.
function colorCells(guessWord) {
  const cells = document.querySelectorAll(".cell");
  let targetWordArray = targetWord.split("");
  let guessWordArray = guessWord.split("");

  targetWordArray = targetWordArray.map(letter => normalizeString(letter));
  guessWordArray = guessWordArray.map(letter => normalizeString(letter));

  for (let i = 0; i < cols; i++) {
    const index = currentRow * cols + i;
    const cell = cells[index];

    cell.classList.remove("correct", "present", "absent");

    if (guessWordArray[i] === targetWordArray[i]) {
      cell.classList.add("correct");
      updateKeyColor(guessWord[i], "correct");
      targetWordArray[i] = null;
      guessWordArray[i] = null;
    }
  }

  for (let i = 0; i < cols; i++) {
    const index = currentRow * cols + i;
    const cell = cells[index];

    if (guessWordArray[i] !== null && targetWordArray.includes(guessWordArray[i])) {
      cell.classList.add("present");
      updateKeyColor(guessWord[i], "present");
      targetWordArray[targetWordArray.indexOf(guessWordArray[i])] = null;
      guessWordArray[i] = null;
    } else if (guessWordArray[i] !== null) {
      cell.classList.add("absent");
      updateKeyColor(guessWord[i], "absent");
    }

    cell.classList.add("bounce");

    setTimeout(() => {
      cell.classList.remove("bounce");
    }, 300);
  }
}

// Para actualizar los colores de las celdas.
function updateKeyColor(letter, color) {
  const key = Array.from(document.querySelectorAll(".key")).find(
    (k) => k.textContent === letter
  );
  if (key) {
    key.style.backgroundColor = color;
  }
}

// Creación completa del teclado en pantalla.
const keyboard = document.querySelector(".keyboard");

const keys = [
  ..."QWERTYUIOP",
  ..."ASDFGHJKL",
  "ENTER",
  ..."ZXCVBNM",
  "BACKSPACE",
];

keys.forEach((key) => {
  const keyElement = document.createElement("div");
  keyElement.classList.add("key");

  if (key === "ENTER") {
    keyElement.classList.add("enter");
    keyElement.innerHTML = '<span class="icon">&#x2713;</span>';
  } else if (key === "BACKSPACE") {
    keyElement.classList.add("backspace");
    keyElement.innerHTML = '<span class="icon">&#x2190;</span>';
  } else {
    keyElement.textContent = key;
  }

  keyElement.addEventListener("click", () => handleKeyClick(key));
  keyboard.appendChild(keyElement);
});

// Para aplicar el sonido y la funcionalidad completa del teclado en pantalla.
function handleKeyClick(key) {
  if (key === "ENTER") {
    playKeySound();
    submitWord();
  } else if (key === "BACKSPACE") {
    playKeySound();
    removeLetter();
  } else if (/^[A-Z]$/.test(key)) {
    playKeySound();
    addLetter(key);
  }
}

const message = document.getElementById("message");

//Para mostrar un mensaje X por pantalla.
function showMessage(text) {
  message.textContent = text;
  setTimeout(() => (message.textContent = ""), 2000);
}

const themeToggleButton = document.getElementById("theme-toggle");

// Función para alternar entre los temas oscuro y claro
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains("dark");

  if (isDark) {
    body.classList.remove("dark");
    body.classList.add("light");
    themeToggleButton.textContent = "Modo Oscuro";
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    themeToggleButton.textContent = "Modo Claro";
  }
}

// Escuchamos el evento click en el botón
themeToggleButton.addEventListener("click", toggleTheme);


// Para reproducir los sonidos desde la carpeta indicada.
function playSound(file) {
  const audio = new Audio(`sounds/${file}`);
  audio.play();
}
