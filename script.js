document.addEventListener("DOMContentLoaded", () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://www.bible.com/verse-of-the-day';

    fetch(proxyUrl + targetUrl)
        .then(response => response.text())
        .then(data => {
            console.log('Fetched HTML:', data); // Log the fetched HTML for debugging
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const imageElement = doc.querySelector('.verse-image-selector'); // Update selector based on actual HTML structure
            if (imageElement) {
                const imageUrl = imageElement.src;
                document.getElementById('verse-image').src = imageUrl;
                document.getElementById('verse-image').style.display = 'block';
                document.getElementById('verse').style.display = 'none';
            } else {
                document.getElementById('verse').textContent = "Verse image not found.";
            }
        })
        .catch(error => {
            console.error('Error fetching the verse of the day:', error);
            document.getElementById('verse').textContent = "Failed to load verse.";
        });
});
