document.addEventListener("DOMContentLoaded", () => {
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const targetUrl = encodeURIComponent('https://www.bible.com/verse-of-the-day');

    fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');

            // Log the entire HTML for debugging
            console.log('Fetched HTML:', doc.documentElement.innerHTML);

            // Find the image with the class 'verse-image' (adjust the selector based on actual class used)
            const imageElement = doc.querySelector('img.verse-image'); // Update the selector as needed
            console.log('Image Element:', imageElement); // Log the image element for debugging

            if (imageElement) {
                const relativeUrl = imageElement.getAttribute('src');
                console.log('Relative URL:', relativeUrl); // Log the relative URL for debugging
                if (relativeUrl) {
                    const fullUrl = 'https://www.bible.com' + relativeUrl; // Prepend the base URL
                    console.log('Full URL:', fullUrl); // Log the full URL for debugging
                    document.getElementById('verse-image').src = fullUrl;
                    document.getElementById('verse-image').style.display = 'block';
                    document.getElementById('verse').style.display = 'none';
                } else {
                    document.getElementById('verse').textContent = "Verse image not found.";
                }
            } else {
                document.getElementById('verse').textContent = "Verse image not found.";
            }
        })
        .catch(error => {
            console.error('Error fetching the verse of the day:', error);
            document.getElementById('verse').textContent = "Failed to load verse.";
        });
});
