var popupContentInitialized = false;

function openPopup4() {
    var iframe = document.getElementById('view');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    // az összes '.test.all__container' class megkeresése id 'test' div-n belül
    var testContainers = iframeDocument.querySelectorAll('#test .test.all__container');

    if (!testContainers || testContainers.length === 0) {
        alert('Nincs "test all__container" elem az iframe-ben.');
        return;
    }

    var containerNames = Array.from(testContainers).map((container, index) => {
        return `${index + 1}. ${container.querySelector('h1') ? container.querySelector('h1').textContent : 'Névtelen'}`;
    });

    var selection = prompt(`Válasszon az alábbi lehetőségek közül:\n${containerNames.join('\n')}`);

    if (!selection) {
        return; // 
    }

    var selectedContainerIndex = parseInt(selection) - 1;
    var selectedContainer = testContainers[selectedContainerIndex];

    var popupOverlay = document.querySelector('.popup-overlay4');
    var popup = document.querySelector('.popup4');

    if (!popup.classList.contains('visible4')) {
        updatePopupContent(selectedContainer, selectedContainerIndex);
        popup.classList.add('visible4');
        popupOverlay.classList.add('visible4');
    }
}

function closePopup4() {
    var popupOverlay = document.querySelector('.popup-overlay4');
    var popup = document.querySelector('.popup4');

    popupOverlay.classList.remove('visible4');
    popup.classList.remove('visible4');
}

function saveChanges2() {
    var iframe = document.getElementById('view');
    var editor = document.getElementById('editor');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    const inputs = document.querySelectorAll('#popupContent3 input[type="text"]');
    const fileInputs = document.querySelectorAll('#popupContent3 input[type="file"]');
    const selectedIndex = document.querySelector('#popupContent3').dataset.progIndex;

    inputs.forEach(input => {
        const index = input.dataset.index;
        const tagName = input.dataset.tagName;

        var testContainers = iframeDocument.querySelectorAll('#test .test.all__container');
        const testContent = testContainers[selectedIndex].querySelector('.test__content');
        if (!testContent) {
            return;
        }

        const element = testContent.children[index];
        if (element && element.tagName === tagName) {
            element.textContent = input.value;
        }
    });

    let filesProcessed = 0;
    fileInputs.forEach(input => {
        const index = input.dataset.index;
        const tagName = input.dataset.tagName;

        var testContainers = iframeDocument.querySelectorAll('#test .test.all__container');
        const testContentImg = testContainers[selectedIndex].querySelector('.test__content_Img');
        if (!testContentImg) {
            return;
        }

        const element = testContentImg.querySelector(`#testImg\\ ${selectedIndex}`);
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
    
    closePopup4();
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

function updatePopupContent(selectedContainer, selectedContainerIndex) {
    var popupContent = document.getElementById('popupContent3');
    popupContent.innerHTML = '';
    popupContent.dataset.progIndex = selectedContainerIndex;

    Array.from(selectedContainer.querySelectorAll('.test__content > *, .test__content_Img > img')).forEach((child, index) => {
        if (['H1', 'H2', 'H3', 'P'].includes(child.tagName)) {
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





function testdescH2Add() {
    const iframe = document.getElementById('view');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const testContents = iframeDocument.getElementsByClassName('test__content');

    // a választás felajánlása a megadott tartományban
    let index = prompt(`Add meg az elem indexét. Az ehhez felhasználható tartomány:(1 - ${testContents.length})`);
    index = parseInt(index-1);

    if (isNaN(index) || index < 0 || index >= testContents.length-1) {
        alert('A megadott index tartományon kívül esik.');
        return;
    }

    const testContent = testContents[index];
    const existingH = testContent.getElementsByTagName('H2');
    const newH = iframeDocument.createElement('H2');

    // az utolsó h2 megkeresése és azt követően az elhelyezés
    if (existingH.length > 0) {
        const lastH = existingH[existingH.length - 1];
        testContent.insertBefore(newH, lastH.nextSibling);
    } else {
        testContent.appendChild(newH);
    }

    // id-k és text meghatározáésa
    newH.id = testContent.querySelector('H2').id;
    newH.textContent = 'Új bekezdés H2';

}

function testdescH3Add() {
    const iframe = document.getElementById('view');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const testContents = iframeDocument.getElementsByClassName('test__content');

    // a választás felajánlása a megadott tartományban
    let index = prompt(`Add meg az elem indexét. Az ehhez felhasználható tartomány:(1 - ${testContents.length})`);
    index = parseInt(index-1);

    if (isNaN(index) || index < 0 || index >= testContents.length-1) {
        alert('A megadott index tartományon kívül esik.');
        return;
    }

    const testContent = testContents[index];
    const existingH = testContent.getElementsByTagName('H3');
    const newH = iframeDocument.createElement('H3');

    // az utolsó h3 megkeresése és azt követően az elhelyezés
    if (existingH.length > 0) {
        const lastH = existingH[existingH.length - 1];
        testContent.insertBefore(newH, lastH.nextSibling);
    } else {
        testContent.appendChild(newH);
    }

    // id-k és text meghatározáésa
    newH.id = testContent.querySelector('H3').id;
    newH.textContent = 'Új bekezdés H3';

}

function testdescPAdd(){
    const iframe = document.getElementById('view');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const testContents = iframeDocument.getElementsByClassName('test__content');

    // Prompt the user to choose which prog__content to modify
    let index = prompt(`Add meg az elem indexét. Az ehhez felhasználható tartomány:(1 - ${testContents.length})`);
    index = parseInt(index-1);

    if (isNaN(index) || index < 0 || index >= testContents.length) {
        alert('A megadott index tartományon kívül esik.');
        return;
    }

    const testContent = testContents[index];
    const existingP = testContent.getElementsByTagName('P');
    const newP = iframeDocument.createElement('P');

    // az utolsó p megkeresése és azt követően az elhelyezés
    if (existingP.length > 0) {
        const lastP = existingP[existingP.length - 1];
        testContent.insertBefore(newP, lastP.nextSibling);
    } else {
        testContent.appendChild(newP);
    }

    // id-k és text meghatározáésa
    newP.id = testContent.querySelector('P').id;
    newP.textContent = 'Új bekezdés P';

}


function testdescContainerAdd() {
    var iframe = document.getElementById('view');
    var editor = document.getElementById('editor');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    var testdesc = iframeDocument.getElementById('test_desc');
    var existingContainers = testdesc.getElementsByClassName("test all__container");

    // Az új sorszám meghatározása
    var newIdNumber = existingContainers.length;

    // Új konténer létrehozása HTML-kóddal
    var newContainer = document.createElement('div');
    newContainer.className = 'test all__container';
    newContainer.id = 'test all__container ' + newIdNumber;
    newContainer.innerHTML = `     
        <div class="test__content" id="test_content ${newIdNumber}">
                <h2 class="h2" id="Hibajegy d ${newIdNumber}">Lépés száma</h2>
                <h3 class="h3" id="Hibajegy d ${newIdNumber}">Tesztadat kiválasztás</h3>
                <p class="p" id="Leírás ${newIdNumber}">Leírás</p>
                <p class="p" id="Leírás ${newIdNumber}">További leírás</p>
            </div>
            <div class="test__content_Img" id="test_content_Img ${newIdNumber}">
                <img id="testImg ${newIdNumber}" src="/path/to/new/image.jpg" alt="Kép">
                </a>
            </div> 
    `;
    
    // Az utolsó elem megkeresése és az új elem beillesztése
    if (existingContainers.length > 0) {
        const lastContainer = existingContainers[existingContainers.length - 1];
        // Az utolsó elem utáni helyre beillesztés
        lastContainer.parentNode.insertBefore(newContainer, lastContainer.nextSibling);
    } else {
        // Ha nem léteznek, akkor csatolás mint utolsó
        testdesc.appendChild(newContainer);
    }
    editor.value = iframeDocument.documentElement.outerHTML;
    editor.innerHTML = editor.value;
    iframe.srcdoc = editor.value;
 
}
