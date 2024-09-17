function showPopup() {
    document.getElementById('popupForm').style.display = 'block';
}

function closePopup5() {
    document.getElementById('popupForm').style.display = 'none';
}

function addCard() {
    const imgFile = document.getElementById('imgFile').files[0];
    const imgAlt = document.getElementById('imgAlt').value;
    const iconHref = document.getElementById('iconHref').value;
    const contentH3 = document.getElementById('contentH3').value;
    const contentP = document.getElementById('contentP').value;
    const keywordOne = document.getElementById('keywordOne').value;
    const keywordTwo = document.getElementById('keywordTwo').value;
    const keywordThree = document.getElementById('keywordThree').value;

    if (!imgFile) {
        alert("Please select an image file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const imgSrc = event.target.result;

        const iframe = document.getElementById('view');
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        const container = doc.querySelector('.container');
        const lastCard = container.querySelector('.card:last-child');
        const newCard = lastCard.cloneNode(true);

        newCard.querySelector('.imgBox img').src = imgSrc;
        newCard.querySelector('.imgBox img').alt = imgAlt;
        newCard.querySelector('.iconBox').href = iconHref;
        newCard.querySelector('h3').textContent = contentH3;
        newCard.querySelector('p').textContent = contentP;
        const keywords = newCard.querySelectorAll('.list li');
        keywords[0].textContent = keywordOne;
        keywords[1].textContent = keywordTwo;
        keywords[2].textContent = keywordThree;

        container.appendChild(newCard);

        iframe.srcdoc = iframe.contentDocument.documentElement.outerHTML;
        var editor = document.getElementById('editor');
        editor.value = iframe.srcdoc;
        closePopup5();
    };

    reader.readAsDataURL(imgFile);

}
