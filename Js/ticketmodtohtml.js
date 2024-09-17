let currentCard = null;

function searchCard() {
    const searchInput = document.getElementById('searchH3');
    if (!searchInput) {
        console.error('Input field for search not found.');
        return;
    }

    const searchText = searchInput.value.trim();
    const iframe = document.getElementById('view');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const cards = iframeDocument.querySelectorAll('.card');

    let found = false;
    cards.forEach(card => {
        const h3 = card.querySelector('.content h3');
        if (h3 && h3.textContent.trim() === searchText) {
            found = true;
            currentCard = card; 
            const img = card.querySelector('.imgBox img');
            const altText = img ? img.alt : '';
            const src = img ? img.src : '';
            const href = card.querySelector('.iconBox').href;
            const p = card.querySelector('.content p').textContent.trim();
            const keywords = card.querySelectorAll('.list li');

            document.getElementById('displayImgAlt').value = altText;
            document.getElementById('displayImgSrc').value = src;
            document.getElementById('displayHref').value = href;
            document.getElementById('displayH3').value = h3.textContent.trim();
            document.getElementById('displayP').value = p;
            document.getElementById('displayKeywordOne').value = keywords[0] ? keywords[0].textContent.trim() : '';
            document.getElementById('displayKeywordTwo').value = keywords[1] ? keywords[1].textContent.trim() : '';
            document.getElementById('displayKeywordThree').value = keywords[2] ? keywords[2].textContent.trim() : '';

            document.getElementById('popupForm4').style.display = 'block';
        }
    });

    if (!found) {
        alert('Nincs ilyen hibajegy');
    }
}

function saveCard() {
    if (!currentCard) {
        console.error('No card is currently selected.');
        return;
    }

    const img = currentCard.querySelector('.imgBox img');
    const icon = currentCard.querySelector('.iconBox');
    const h3 = currentCard.querySelector('.content h3');
    const p = currentCard.querySelector('.content p');
    const keywords = currentCard.querySelectorAll('.list li');

    const imgFileInput = document.getElementById('displayImgFile');
    if (imgFileInput.files && imgFileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        }
        reader.readAsDataURL(imgFileInput.files[0]);
    } else {
        img.src = document.getElementById('displayImgSrc').value;
    }

    img.alt = document.getElementById('displayImgAlt').value;
    icon.href = document.getElementById('displayHref').value;
    h3.textContent = document.getElementById('displayH3').value;
    p.textContent = document.getElementById('displayP').value;
    if (keywords[0]) keywords[0].textContent = document.getElementById('displayKeywordOne').value;
    if (keywords[1]) keywords[1].textContent = document.getElementById('displayKeywordTwo').value;
    if (keywords[2]) keywords[2].textContent = document.getElementById('displayKeywordThree').value;

    document.getElementById('popupForm4').style.display = 'none';
    document.getElementById('popupForm3').style.display = 'none';
    currentCard = null;
}

function closePopupForm3() {
    document.getElementById('popupForm3').style.display = 'none';
}

function closePopupForm4() {
    document.getElementById('popupForm4').style.display = 'none';
    currentCard = null;
}
function openPopupForm3() {
    document.getElementById('popupForm3').style.display = 'block';
}
