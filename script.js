document.addEventListener("DOMContentLoaded", () => {
    fetch('https://www.bible.com/verse-of-the-day')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const verse = doc.querySelector('.verse-of-the-day').textContent;
            document.getElementById('verse').textContent = verse;
        })
        .catch(error => console.error('Error fetching the verse of the day:', error));
});
