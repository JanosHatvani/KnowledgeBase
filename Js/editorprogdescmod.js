var popupContentInitialized = false;

function openPopup3() {
    var iframe = document.getElementById('view');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    // az összes '.prog.all__container' class megkeresése id 'prog' div-n belül
    var progContainers = iframeDocument.querySelectorAll('#prog .prog.all__container');

    if (!progContainers || progContainers.length === 0) {
        alert('Nincs "prog all__container" elem az iframe-ben.');
        return;
    }

    var containerNames = Array.from(progContainers).map((container, index) => {
        return `${index + 1}. ${container.querySelector('h1') ? container.querySelector('h1').textContent : 'Névtelen'}`;
    });

    var selection = prompt(`Válasszon az alábbi lehetőségek közül:\n${containerNames.join('\n')}`);

    if (!selection) {
        return; 
    }

    var selectedContainerIndex = parseInt(selection) - 1;
    var selectedContainer = progContainers[selectedContainerIndex];

    var popupOverlay = document.querySelector('.popup-overlay3');
    var popup = document.querySelector('.popup3');

    if (!popup.classList.contains('visible3')) {
        updatePopupContent3(selectedContainer, selectedContainerIndex);
        popup.classList.add('visible3');
        popupOverlay.classList.add('visible3');
    }
}

function closePopup3() {
    var popupOverlay = document.querySelector('.popup-overlay3');
    var popup = document.querySelector('.popup3');

    popupOverlay.classList.remove('visible3');
    popup.classList.remove('visible3');
}

function saveChanges3() {
    
    var iframe = document.getElementById('view');
    var editor = document.getElementById('editor');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    const inputs = document.querySelectorAll('#popupContent2 input[type="text"]');
    const fileInputs = document.querySelectorAll('#popupContent2 input[type="file"]');
    const selectedIndex = document.querySelector('#popupContent2').dataset.progIndex;

    inputs.forEach(input => {
        const index = input.dataset.index;
        const tagName = input.dataset.tagName;

        var progContainers = iframeDocument.querySelectorAll('#prog .prog.all__container');
        const progContent = progContainers[selectedIndex].querySelector('.prog__content');
        if (!progContent) {
            return;
        }

        const element = progContent.children[index];
        if (element && element.tagName === tagName) {
            element.textContent = input.value;
        }
    });

    let filesProcessed = 0;
    fileInputs.forEach(input => {
        const index = input.dataset.index;
        const tagName = input.dataset.tagName;

        var progContainers = iframeDocument.querySelectorAll('#prog .prog.all__container');
        const progContentImg = progContainers[selectedIndex].querySelector('.prog__content_Img');
        if (!progContentImg) {
            return;
        }

        const element = progContentImg.querySelector(`#progImg\\ ${selectedIndex}`);
        if (element && element.tagName === tagName && input.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                element.src = e.target.result;
                filesProcessed++;
                if (filesProcessed === fileInputs.length) {
                    updateIframe(editor, iframeDocument, iframe);
                }
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            filesProcessed++;
            if (filesProcessed === fileInputs.length) {
                updateIframe(editor, iframeDocument, iframe);
            }
        }
    });

    if (fileInputs.length === 0) {
        updateIframe(editor, iframeDocument, iframe);
    }

    closePopup3();
}

function updateIframe(editor, iframeDocument, iframe) {
    editor.value = iframeDocument.documentElement.outerHTML;
    editor.innerHTML = editor.value;
    iframe.srcdoc = editor.value;
    
}

function updateIframeContent() {
    var iframe = document.getElementById('view');
    var editor = document.getElementById('editor');
    iframe.srcdoc = editor.value;
    
}

function updatePopupContent3(selectedContainer, selectedContainerIndex) {
    var popupContent = document.getElementById('popupContent2');
    popupContent.innerHTML = '';
    popupContent.dataset.progIndex = selectedContainerIndex;

    Array.from(selectedContainer.querySelectorAll('.prog__content > *, .prog__content_Img > img')).forEach((child, index) => {
        if (['H1', 'H2', 'P'].includes(child.tagName)) {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            const label = document.createElement('label');
            label.textContent = child.tagName;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = child.textContent;
            input.dataset.tagName = child.tagName;
            input.dataset.index = index;
            formGroup.appendChild(label);
            formGroup.appendChild(input);
            popupContent.appendChild(formGroup);
        } else if (child.tagName === 'IMG') {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            const label = document.createElement('label');
            label.textContent = 'Kép kiválasztása';
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.dataset.tagName = child.tagName;
            fileInput.dataset.index = index;
            formGroup.appendChild(label);
            formGroup.appendChild(fileInput);
            popupContent.appendChild(formGroup);
        }
    });
    
}

function progdescH2Add() {
    
    const iframe = document.getElementById('view');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const progContents = iframeDocument.getElementsByClassName('prog__content');

    // a választás felajánlása a megadott tartományban
    let index = prompt(`Add meg az elem indexét. Az ehhez felhasználható tartomány:(1 - ${progContents.length })`);
    index = parseInt(index-1);

    // Validate the index
    if (isNaN(index) || index < 0 || index >= progContents.length) {
        alert('A megadott index tartományon kívül esik.');
        return;
    }

    const progContent = progContents[index];
    const existingH = progContent.getElementsByTagName('H2');
    const newH = iframeDocument.createElement('H2');

    // az utolsó h2 megkeresése és azt követően az elhelyezés
    if (existingH.length > 0) {
        const lastH = existingH[existingH.length - 1];
        progContent.insertBefore(newH, lastH.nextSibling);
    } else {
        progContent.appendChild(newH);
    }

    // id-k és text meghatározáésa
    newH.id = progContent.querySelector('H2').id;
    newH.textContent = 'Új bekezdés H2';
    
}

function progdescPAdd(){
    
    const iframe = document.getElementById('view');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const progContents = iframeDocument.getElementsByClassName('prog__content');

    // a választás felajánlása a megadott tartományban
    let index = prompt(`Add meg az elem indexét. Az ehhez felhasználható tartomány:(1 - ${progContents.length})`);
    index = parseInt(index-1);

    // Validate the index
    if (isNaN(index) || index < 0 || index >= progContents.length) {
        alert('A megadott index tartományon kívül esik.');
        return;
    }

    const progContent = progContents[index];
    const existingP = progContent.getElementsByTagName('P');
    const newP = iframeDocument.createElement('P');

    // az utolsó p megkeresése és azt követően az elhelyezés
    if (existingP.length > 0) {
        const lastP = existingP[existingP.length - 1];
        progContent.insertBefore(newP, lastP.nextSibling);
    } else {
        progContent.appendChild(newP);
    }

    // id-k és text meghatározáésa
    newP.id = progContent.querySelector('P').id;
    newP.textContent = 'Új bekezdés P';
    
}


function progdescContainerAdd() {
    
    var iframe = document.getElementById('view');
    var editor = document.getElementById('editor');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    var progdesc = iframeDocument.getElementById('prog_desc');
    var existingContainers = progdesc.getElementsByClassName("prog all__container");

    // Az új sorszám meghatározása
    var newIdNumber = existingContainers.length;

    // Új konténer létrehozása HTML-kóddal
    var newContainer = document.createElement('div');
    newContainer.className = 'prog all__container';
    newContainer.id = 'prog all__container ' + newIdNumber;
    newContainer.innerHTML = `
        <div class="prog__content" id="prog_content ${newIdNumber}">
            <h1 id="Hibajegy h1 ${newIdNumber}">Új fejezet címe</h1>
            <h2 class="h2" id="Hibajegy d ${newIdNumber}">Új igény</h2>
            <p class="p" id="Leírás ${newIdNumber}">Új leírás</p>
            <p class="p" id="Leírás ${newIdNumber}">További részletek az új fejezetről.</p>
        </div>
        <div class="prog__content_Img" id="prog_content_Img ${newIdNumber}"> 
            <img id="progImg ${newIdNumber}" src="/path/to/new/image.jpg" alt="Kép">
        </div>
    `;
    
    // Az utolsó elem megkeresése és az új elem beillesztése
    if (existingContainers.length > 0) {
        const lastContainer = existingContainers[existingContainers.length - 1];
        // Az utolsó elem utáni helyre beillesztés
        lastContainer.parentNode.insertBefore(newContainer, lastContainer.nextSibling);
    } else {
        // Ha nem léteznek, akkor csatolás mint utolsó
        progdesc.appendChild(newContainer);
    }
    editor.value = iframeDocument.documentElement.outerHTML;
    editor.innerHTML = editor.value;
    iframe.srcdoc = editor.value;
    
}
