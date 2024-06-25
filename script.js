document.addEventListener("DOMContentLoaded", () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://www.bible.com/verse-of-the-day';

    fetch(proxyUrl + targetUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // Log the entire HTML document for inspection
            console.log('Fetched HTML:', doc.documentElement.innerHTML);

            // Adjust the selector based on the actual HTML structure
            const imageElement = doc.querySelector('img[alt*="the sins of us all"]'); // Adjust the selector as necessary
            if (imageElement) {
                let imageUrl = imageElement.src;
                console.log('Found image URL:', imageUrl);

                // Prepend the base URL if the src is a relative path
                if (imageUrl.startsWith('/')) {
                    imageUrl = 'https://www.bible.com' + imageUrl;
                }
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
