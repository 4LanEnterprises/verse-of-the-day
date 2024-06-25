document.addEventListener("DOMContentLoaded", () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://www.bible.com/verse-of-the-day';

    fetch(proxyUrl + targetUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const imageElement = doc.querySelector('img'); // Assume the first image is the Verse of the Day image
            if (imageElement) {
                // Extract the 'src' attribute
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
