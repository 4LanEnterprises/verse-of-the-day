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

            // Find the image element with the 'srcset' attribute
            const imageElement = doc.querySelector('img[srcset]');
            console.log('Image Element:', imageElement); // Log the image element for debugging

            if (imageElement) {
                // Extract the 'srcset' attribute and find the URL for the highest resolution image
                const srcset = imageElement.getAttribute('srcset');
                console.log('Srcset:', srcset); // Log the srcset for debugging

                const srcsetParts = srcset.split(',').map(part => part.trim());
                const highResImage = srcsetParts.find(part => part.endsWith('2x')).split(' ')[0];
                console.log('High Res Image URL:', highResImage); // Log the high res image URL for debugging

                if (highResImage) {
                    const fullUrl = 'https://www.bible.com' + highResImage; // Prepend the base URL
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
