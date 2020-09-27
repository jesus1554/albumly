document.addEventListener('DOMContentLoaded', function () {
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
            let card = ` <article>
            <img
            src="${o.artist.picture_medium}">
            
            <div class="artist-data-pv">
            <h4>${o.artist.name}</h4>
            <p>Último Hit: <i>${o.title_short}</i></p>
            </div>
            </article>
            `
            results += card
        })
        resultsContainer.innerHTML = results
    }
});