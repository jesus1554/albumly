document.addEventListener('DOMContentLoaded', () => {
    // Search Button
    const srchBtn = document.querySelector('#srch-btn')
    // Search result container
    const resultsContainer = document.querySelector('.search-results')
    let results = '';

    srchBtn.addEventListener('click', () => {
        const srchQueryRaw = document.querySelector('#srch-cont').value;
        const srchQuery = encodeURIComponent(srchQueryRaw)

        let query = fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${srchQuery}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key": "f5c7a65c46msh120d5c055e072c2p187d99jsn7b8733e87559"
                }
            })
            .then(response => response.json())
            .then(data => {
                showSearch(data.data)
            })
        results = ''
    })

    function showSearch(data) {
        const rawResults = data;

        rawResults.forEach(o => {
            const explicit = (song) => {
                if (song) {
                    return "Sí"    
                } else {
                    return "No"
                }
            }
            let card = `<article>
            <img src="${o.album.cover_big}">
            <div class="song-data">
                <article class="sng-pack">
                    <h3>${o.title}</h3>
                    <h4>Autor: ${o.artist.name}</h4>
                </article>
                <article class="sng-pack">
                    <p>Letras Explícitas: ${explicit(o.explicit_lyrics)}</p>
                    <b>Álbum: ${o.album.title}</b>
                </article>
                <div class="sng-pack">
                        <a class="blue-button" href="https://free-mp3-download.net/download.php?id=${o.id}" target="_blank">Descargar</a>
                </div>
            </div>
        </article>`
            results += card
        })
        resultsContainer.innerHTML = results
    }
})