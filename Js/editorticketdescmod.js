var popupContentInitialized = false;

function openPopup2() {
    var iframe = document.getElementById('view');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    
    var headerContent = iframeDocument.getElementById('header_content');
    if (!headerContent) {
        alert('Nincs "header_content" elem az iframe-ben.');
        return;
    }

    var popupContent = document.getElementById('popupContent');
    
    // Mindig frissítjük a popup tartalmát
    updatePopupContentT(headerContent);

    var popupOverlay = document.querySelector('.popupOverlay2');
    var popup = document.querySelector('.popup2');

    if (!popup.classList.contains('visible2')) {
        popup.classList.add('visible2');
        popupOverlay.classList.add('visible2');
    }
}

function closePopup2() {
    var popupOverlay = document.querySelector('.popupOverlay2');
    var popup = document.querySelector('.popup2');

    popupOverlay.classList.remove('visible2');
    popup.classList.remove('visible2');
}

function saveChanges() {
    var iframe = document.getElementById('view');
    var editor = document.getElementById('editor');
    var iframeDocument = iframe.contentWindow.document;

    var headerContent = iframeDocument.getElementById('header_content');
    if (!headerContent) {
        alert('header_content elem nem található az iframe-ben.');
        return;
    }

    var inputs = document.querySelectorAll('#popupContent input');

    inputs.forEach(input => {
        var index = input.dataset.index;
        var tagName = input.dataset.tagName;

        if (tagName === 'A') {
            var linkElement = headerContent.querySelector('a#linkUrl1');
            if (linkElement) {
                linkElement.setAttribute('href', input.value);
            }
        } else {
            var element = headerContent.children[index];
            if (element && element.tagName === tagName) {
                element.textContent = input.value;
            }
        }
    });

    // Frissítjük az editor és iframe tartalmát
    editor.value = iframeDocument.documentElement.outerHTML;
    editor.innerHTML = editor.value;
    iframe.srcdoc = editor.value;

    closePopup2();
}

function updatePopupContentT(headerContent) {
    var popupContent = document.getElementById('popupContent');
    popupContent.innerHTML = '';

    // Végigmegyünk a headerContent gyerekein és létrehozzuk a form elemeket
    Array.from(headerContent.children).forEach((child, index) => {
        if (['H1', 'H2', 'P'].includes(child.tagName)) {
            var formGroup = document.createElement('div');
            formGroup.className = 'form-group';

            var label = document.createElement('label');
            label.textContent = child.id;

            var input = document.createElement('input');
            input.type = 'text';
            input.value = child.textContent;
            input.dataset.tagName = child.tagName;
            input.dataset.index = index;

            formGroup.appendChild(label);
            formGroup.appendChild(input);
            popupContent.appendChild(formGroup);
        }
    });

    // Link kezelés
    var linkElement = headerContent.querySelector('a#linkUrl1');
    if (linkElement) {
        var formGroup = document.createElement('div');
        formGroup.className = 'form-group';

        var label = document.createElement('label');
        label.textContent = 'Hibajegy megnyitás link';

        var input = document.createElement('input');
        input.type = 'text';
        input.value = linkElement.getAttribute('href');
        input.dataset.tagName = 'A';
        input.dataset.index = -1;

        formGroup.appendChild(label);
        formGroup.appendChild(input);
        popupContent.appendChild(formGroup);
    }
    var iframe = document.getElementById('view');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    var headerImageContent = iframeDocument.getElementById('header_content_Img');
    // Kép kiválasztás kezelése a header_content_Img div-ből
    var imgFormGroup = document.createElement('div');
    imgFormGroup.className = 'form-group';

    var imgLabel = document.createElement('label');
    imgLabel.textContent = 'Kép kiválasztás';

    var imgInput = document.createElement('input');
    imgInput.type = 'file';
    imgInput.accept = 'image/*';
    imgInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var imgSrc = e.target.result;

                // Ellenőrzés, hogy a headerImageContent elem megfelelő
                var imgElement = headerImageContent.querySelector('#headerImg');
                
                // Null check hogy létezik-e az elem
                if (imgElement) {
                    imgElement.setAttribute('src', imgSrc);
                } else {
                    console.error('Element with id "headerImg" not found.');
                }
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    imgFormGroup.appendChild(imgLabel);
    imgFormGroup.appendChild(imgInput);
    popupContent.appendChild(imgFormGroup);
}



function ticketdescH2Add() {
    var iframe = document.getElementById('view');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    var headerContent = iframeDocument.getElementById('header_content');
    var existingH = headerContent.getElementsByTagName('h2');
    var newH = iframeDocument.createElement('h2');

    if (existingH.length > 0) {
        var lastH = existingH[existingH.length - 1];
        headerContent.insertBefore(newH, lastH.nextSibling);
    } else {
        headerContent.appendChild(newH);
    }

    newH.id = `Hibajegy d${existingH.length}`;
    newH.textContent = 'Új bekezdés H2';

    // Frissítjük az iframe és editor tartalmát
    var editor = document.getElementById('editor');
    editor.value = iframeDocument.documentElement.outerHTML;
    editor.innerHTML = editor.value;
    iframe.srcdoc = editor.value;
}

function ticketdescPAdd() {
    var iframe = document.getElementById('view');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    var headerContent = iframeDocument.getElementById('header_content');
    var existingParagraphs = headerContent.getElementsByTagName('p');
    var newP = iframeDocument.createElement('p');

    if (existingParagraphs.length > 0) {
        var lastParagraph = existingParagraphs[existingParagraphs.length - 1];
        headerContent.insertBefore(newP, lastParagraph.nextSibling);
    } else {
        headerContent.appendChild(newP);
    }

    newP.id = `Leírás${existingParagraphs.length}`;
    newP.textContent = 'Új bekezdés P';

    // Frissítjük az iframe és editor tartalmát
    var editor = document.getElementById('editor');
    editor.value = iframeDocument.documentElement.outerHTML;
    editor.innerHTML = editor.value;
    iframe.srcdoc = editor.value;
}
