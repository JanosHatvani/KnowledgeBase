function openPopup() {
    /*popup ablak megnyitása visible tulajdonság hozzáadásával */
    document.querySelector('.popupOverlay').classList.add('visible');
    document.querySelector('.popup').classList.add('visible');

    /* iframe */
    var iframe = document.getElementById('view');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    /* iframe-n belül lévő link elem beazonosítása */
    var link = iframeDocument.getElementById('linkToChange');

    /* ellenőrzés, hogy a link létezik-e */
    if (!link) {
        alert('A linkToChange elem nem található az iframe-ben.');
        return;
    }

    /* link aktuális href és textContent értékeinek beállítása a mezőkbe */
    document.getElementById('linkUrl').value = link.href;
    document.getElementById('linkText').value = link.textContent;
}

// Popup bezárása
function closePopup() {
    /*popup ablak bezárása visible tulajdonság eltávolításával */
    document.querySelector('.popupOverlay').classList.remove('visible');
    document.querySelector('.popup').classList.remove('visible');
}

// Link módosítása
function modifyLink() {
    /* iframe */
    var iframe = document.getElementById('view');
    var editor = document.getElementById('editor');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    /*elemek beazonosítása*/
    var linkUrl = document.getElementById('linkUrl').value;
    var linkText = document.getElementById('linkText').value;
    var link = iframeDocument.getElementById('linkToChange');
     
    /* ellenőrzés, ha a változtatásra kerülő link nem található, akkor hibaüzenet */
    if (!link) {
        alert('A linkToChange elem nem található az iframe-ben.');
        return;
    }

    /* módosítások */
    if (linkUrl) {
        link.href = linkUrl;
    }
    if (linkText) {
        link.textContent = linkText;
    }

    /* az editor frissítése az iframe-ben frissített értékekkel */
    editor.value = iframeDocument.documentElement.outerHTML;

    /*popup mezők törlése (ha szükséges)*/
    document.getElementById('linkUrl').value = "";
    document.getElementById('linkText').value = "";

    /*popup bezárása*/
    closePopup();
}

function updateIframeContent() {
    const iframe = document.getElementById('view');
    var editor = document.getElementById('editor');
    iframe.srcdoc = editor.value;
}
