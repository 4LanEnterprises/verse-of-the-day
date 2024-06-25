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
                // Extract the 'srcset' attribute
                const srcset = imageElement.getAttribute('srcset');
                if (srcset) {
                    // Split the srcset to get the URLs and resolutions
                    const srcsetItems = srcset.split(', ');
                    // Get the highest resolution URL
                    const highestResItem = srcsetItems[srcsetItems.length - 1];
                    const highestResUrl = highestResItem.split(' ')[0];
                    const fullUrl = 'https://www.bible.com' + highestResUrl; // Prepend the base URL
                    console.log('Image URL:', fullUrl); // Log the URL for debugging
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
