document.addEventListener("DOMContentLoaded", () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://www.bible.com/verse-of-the-day';

    fetch(proxyUrl + targetUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const imageElement = doc.querySelector('img[alt*="Isaiah 53:6"]'); // Use part of the alt text to find the image
            if (imageElement) {
                let imageUrl = imageElement.src;
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
