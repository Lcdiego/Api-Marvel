

   




    document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const comicsContainer = document.getElementById("comicsContainer");
    let currentPage = 1;
  

function loadCharacters(page) {
  const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
  const timestamp = new Date().getTime();
  const hash = md5(`${timestamp}${privateKey}${publicKey}`);
  const url = `${baseUrl}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&offset=${(page -1) * 20}`;


   
  axios.get(url)
    .then(response => {
      const characters =response.data.data.results;
      console.log(characters);
      comicsContainer.innerHTML = "";
      characters.forEach(character => {
        const thumbnail = character.thumbnail;
        const imageUrl = `${thumbnail.path}.${thumbnail.extension}`;

        
        
        const characterContainer = document.createElement("div");
        characterContainer.classList.add("character");

        const imgElement = document.createElement('img');
        imgElement.classList.add("img");
        imgElement.src = imageUrl;
        imgElement.alt = character.name;
        characterContainer.appendChild(imgElement);

        
        const nombre= character.name;
        const nombrePersonaje = document.createElement("p");
        nombrePersonaje.textContent = `${nombre}`;
        characterContainer.appendChild(nombrePersonaje);
        
        const comicsAvailable = character.comics.available;
        const comicsAvailableElement = document.createElement("p");
        comicsAvailableElement.textContent = `Cómics disponibles: ${comicsAvailable}`;
        characterContainer.appendChild(comicsAvailableElement);

        const firstComicName = character.comics.available > 0 ? character.comics.items[0].name : "No disponible";
        const firstComicNameElement = document.createElement("p");
        firstComicNameElement.textContent = `Primer cómic: ${firstComicName}`;
        characterContainer.appendChild(firstComicNameElement);
        
        const seriesURL = character.series.available > 0 ? character.series.items[0].resourceURI : "#"; 
        const seriesURLElement = document.createElement("a");
        seriesURLElement.href = seriesURL;
        seriesURLElement.textContent = "Ir a la serie";
        characterContainer.appendChild(seriesURLElement);
        
        comicsContainer.appendChild(characterContainer);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

loadCharacters(currentPage);

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadCharacters(currentPage);
  }
});

nextButton.addEventListener("click", () => {
  currentPage++;
  loadCharacters(currentPage);
});
 })


const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

function searchCharacters(searchTerm) {
  const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
  const timestamp = new Date().getTime();
  const hash = md5(`${timestamp}${privateKey}${publicKey}`);
  const searchUrl = `${baseUrl}?nameStartsWith=${encodeURIComponent(searchTerm)}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
  console.log(searchUrl)

  axios.get(searchUrl)
    .then(response => {
      const characters = response.data.data.results;
      comicsContainer.innerHTML = "";
      if (characters.length === 0) {
        comicsContainer.textContent = "No se encontraron personajes.";
        return;
      }
      characters.forEach(character => {
        const thumbnail = character.thumbnail;
        const imageUrl = `${thumbnail.path}.${thumbnail.extension}`;
      
        const characterContainer = document.createElement("div");
        characterContainer.classList.add("busqueda-personajes-input");

        const imgElement = document.createElement('img');
        imgElement.classList.add("img");
        imgElement.src = imageUrl;
        imgElement.alt = character.name;
        characterContainer.appendChild(imgElement);

      
        const nombre= character.name;
        const nombrePersonaje = document.createElement("p");
        nombrePersonaje.textContent = `${nombre}`;
        characterContainer.appendChild(nombrePersonaje);
        
        const comicsAvailable = character.comics.available;
        const comicsAvailableElement = document.createElement("p");
        comicsAvailableElement.textContent = `Cómics disponibles: ${comicsAvailable}`;
        characterContainer.appendChild(comicsAvailableElement);

        const firstComicName = character.comics.available > 0 ? character.comics.items[0].name : "No disponible";
        const firstComicNameElement = document.createElement("p");
        firstComicNameElement.textContent = `Primer cómic: ${firstComicName}`;
        characterContainer.appendChild(firstComicNameElement);
        
        const seriesURL = character.series.available > 0 ? character.series.items[0].resourceURI : "#"; 
        const seriesURLElement = document.createElement("a");
        seriesURLElement.href = seriesURL;
        seriesURLElement.textContent = "Ir a la serie";
        characterContainer.appendChild(seriesURLElement);
        
        comicsContainer.appendChild(characterContainer);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}



searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  if (searchTerm) {
    searchCharacters(searchTerm);
  }
});