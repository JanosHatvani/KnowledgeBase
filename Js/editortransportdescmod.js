var popupContent4Initialized = false;

function openPopup5() {
    var iframe = document.getElementById('view');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    var transportDesc = iframeDocument.querySelector('#transport_desc .transport__content');
    if (!transportDesc) {
        alert('Nincs "transport__content" elem az iframe-ben.');
        return;
    }

    // Mindig frissítjük a popup tartalmát a legfrissebb iframe tartalom szerint
    updatePopupContent4(transportDesc);

    var popupOverlay5 = document.getElementById('popupOverlay5');
    var popup5 = document.getElementById('popup5');

    if (!popup5.classList.contains('visible5')) {
        popup5.classList.add('visible5');
        popupOverlay5.classList.add('visible5');
    }
}

function closePopup6() {
    var popupOverlay5 = document.getElementById('popupOverlay5');
    var popup5 = document.getElementById('popup5');

    if (popup5.classList.contains('visible5')) {
        popup5.classList.remove('visible5');
        popupOverlay5.classList.remove('visible5');
    }
}

function saveChanges4() {
    var iframe = document.getElementById('view');
    var editor = document.getElementById('editor');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    var inputs = document.querySelectorAll('#popupContent4 input[type="text"]');

    inputs.forEach(input => {
        var tagName = input.dataset.tagName;
        var element = iframeDocument.querySelector('#transport_desc .transport__content ' + tagName);

        if (element) {
            element.textContent = input.value;
        }
    });

    // Frissítjük az editor és iframe tartalmát
    editor.value = iframeDocument.documentElement.outerHTML;
    editor.innerHTML = editor.value;
    iframe.srcdoc = editor.value;

    closePopup6();
}

function updatePopupContent4(transportDesc) {
    var popupContent4 = document.getElementById('popupContent4');
    popupContent4.innerHTML = '';

    Array.from(transportDesc.children).forEach(child => {
        if (['H2', 'H3', 'P'].includes(child.tagName)) {
            var formGroup = document.createElement('div');
            formGroup.className = 'form-group';

            var label = document.createElement('label');
            label.textContent = child.id || 'Unnamed Element';

            var input = document.createElement('input');
            input.type = 'text';
            input.value = child.textContent;
            input.dataset.tagName = child.tagName;

            formGroup.appendChild(label);
            formGroup.appendChild(input);
            popupContent4.appendChild(formGroup);
        }
    });
}

function transportdescH2Add() {
    const iframe = document.getElementById('view');
    const editor = document.getElementById('editor');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const transportContent = iframeDocument.getElementById('transport_content');
    
    const existingH = transportContent.getElementsByTagName('h2');
    const newH = iframeDocument.createElement('h2');

    if (existingH.length > 0) {
        const lastH = existingH[existingH.length - 1];
        transportContent.insertBefore(newH, lastH.nextSibling);
    } else {
        transportContent.appendChild(newH);
    }

    newH.id = `Cím${existingH.length}`;
    newH.textContent = 'Új bekezdés H2';

    // Frissítjük az editor és iframe tartalmát
    editor.value = iframeDocument.documentElement.outerHTML;
    editor.innerHTML = editor.value;
    iframe.srcdoc = editor.value;
}

function transportdescPAdd() {
    const iframe = document.getElementById('view');
    const editor = document.getElementById('editor');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const transportContent = iframeDocument.getElementById('transport_content');
    
    const existingParagraphs = transportContent.getElementsByTagName('p');
    const newP = iframeDocument.createElement('p');

    if (existingParagraphs.length > 0) {
        const lastParagraph = existingParagraphs[existingParagraphs.length - 1];
        transportContent.insertBefore(newP, lastParagraph.nextSibling);
    } else {
        transportContent.appendChild(newP);
    }

    newP.id = `Leírás${existingParagraphs.length}`;
    newP.textContent = 'Új bekezdés P';

    // Frissítjük az editor és iframe tartalmát
    editor.value = iframeDocument.documentElement.outerHTML;
    editor.innerHTML = editor.value;
    iframe.srcdoc = editor.value;
}
