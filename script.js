// Ruta del archivo JSON
const jsonFilePath = './data.json';

// Función para cargar datos desde el archivo JSON
async function loadData() {
  try {
    // Usar fetch para obtener los datos
    const response = await fetch(jsonFilePath);

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
    }

    // Convertir los datos a formato JSON
    const data = await response.json();

    // Llamar a la función para renderizar los datos
    renderData(data);
  } catch (error) {
    console.error(error);
  }
}

// Función para renderizar los datos en el HTML
function renderData(data) {
  // Recorrer el array de objetos
  data.forEach(item => {
    // Determinar el contenedor principal basado en la categoría
    let mainContainer = null;
    if (item.category === "Reaction") {
      mainContainer = document.getElementById('Reaction');
    } else if (item.category === "Memory") {
      mainContainer = document.getElementById('Memory');
    } else if (item.category === "Verbal") {
      mainContainer = document.getElementById('Verbal');
    } else if (item.category === "Visual") {
      mainContainer = document.getElementById('Visual');
    }

    // Validar que el contenedor existe
    if (!mainContainer) {
      console.warn(`No se encontró un contenedor para la categoría: ${item.category}`);
      return;
    }

    // Crear el contenido de texto
    const textContent = document.createElement('div');
    textContent.classList.add('texto');
    textContent.innerHTML = `
      <img src="${item.icon}" alt="${item.category} Icon">
      <p>${item.category}</p>
    `;

    // Crear el elemento para la puntuación
    const score = document.createElement('div');
    score.classList.add('numbers');
    score.innerHTML = `<p><span style="color: hsl(224, 30%, 27%);">${item.score}</span> / 100</p>`;

    // Añadir los elementos al contenedor principal
    mainContainer.appendChild(textContent);
    mainContainer.appendChild(score);
  });
}

// Cargar los datos al cargar la página
loadData();
