// Cargar artículos por categoría
function loadContent(category) {
    fetch('articulos.json')
    .then(response => response.json())
    .then(data => {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = '';

        const filteredArticles = data.articulos.filter(articulo => articulo.tema === category);

        if (filteredArticles.length > 0) {
            filteredArticles.forEach(articulo => {
                const articleElement = document.createElement('div');
                articleElement.innerHTML = `
                    <h2>${articulo.titulo}</h2>
                    <p>${articulo.descripcion}</p>
                    <a href="${articulo.link}" target="_blank">Leer más</a>
                `;
                contentDiv.appendChild(articleElement);
            });
        } else {
            contentDiv.innerHTML = '<p>No hay artículos disponibles en esta categoría.</p>';
        }
    })
    .catch(error => {
        console.error('Error al cargar los artículos:', error);
    });
}

// Función de búsqueda de artículos
function searchArticles() {
    const input = document.getElementById('search').value.toLowerCase();
    fetch('articulos.json')
    .then(response => response.json())
    .then(data => {
        const contentDiv = document.getElementById('articulos-container');
        contentDiv.innerHTML = '';

        const filteredArticles = data.articulos.filter(articulo => 
            articulo.titulo.toLowerCase().includes(input) || 
            articulo.descripcion.toLowerCase().includes(input)
        );

        if (filteredArticles.length > 0) {
            filteredArticles.forEach(articulo => {
                const articleElement = document.createElement('li');
                articleElement.innerHTML = `
                    <h3><a href="${articulo.link}" target="_blank">${articulo.titulo}</a></h3>
                    <p>${articulo.descripcion}</p>
                `;
                contentDiv.appendChild(articleElement);
            });
        } else {
            document.getElementById('no-results').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error al buscar los artículos:', error);
    });
}
