function uploadStatusFile() {
    const fileInput = document.getElementById('statusFileInput');
    fileInput.style.visibility = "visible";
    const lockstatustext = document.getElementById('lockStatusText');
    const file = fileInput.files[0];

    if (file && file.name.endsWith('.xlsx')) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Itt feltételezzük, hogy a státusz a 'Sheet1' első cellájában van (A1)
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const status = firstSheet['A1'] ? firstSheet['A1'].v : 'unlocked'; // Alapértelmezett státusz
            
            // Ellenőrizzük a státuszt
            if (status === 'locked') {
                lockstatustext.textContent = 'locked'; 
                alert("A szerkesztés már folyamatban van más felhasználó által.");                   
                return;
            } else {
                // A fájl betöltése
                lockstatustext.textContent = 'unlocked';  
                uploadFiletoTicketsMod() ;
                // Lock felállítása a státusz módosításával
                updateStatusFile('locked');
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Kérlek tölts fel egy érvényes Excel fájlt (status.xlsx).');
    }
}

function updateStatusFile(newStatus) {
    const newWorkbook = XLSX.utils.book_new();
    
    // Aktuális dátum és idő beírása (B1)
    const currentDate = new Date();
    const dateString = currentDate.toLocaleString(); // Dátum és idő formázása

    // Számítógép neve (itt a userAgent helyett érdemesebb lehet egy konkrét név használata)
    const computerName = window.navigator.userAgent; // Ez a teljes user agent stringet adja vissza
    //window.navigator.userActivation.

    // A cellák tartalma (A1, B1, C1)
    const data = [
        [newStatus, dateString, computerName] // Itt adjuk meg a státuszt, dátumot, számítógép nevét
    ];

    const newWorksheet = XLSX.utils.aoa_to_sheet(data); // Adatok átkonvertálása munkalapra
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Sheet1");

    // Excel fájl generálása
    const fileName = 'status.xlsx';
    XLSX.writeFile(newWorkbook, fileName);
}


function uploadFiletoTicketsMod() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file && file.type === "text/html") {
        const reader = new FileReader();
        reader.onload = function(event) {
            const content = event.target.result;
            var iframe = document.getElementById('view');
            var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            var example = iframeDocument.getElementById('example');

            if (example) {
                alert("A szerkesztése már megkezdted, az editor már feltöltésre került.");
            } else {
                // A tartalom betöltése az 'editor' id-vel rendelkező div-be
                document.getElementById('editor').innerHTML = content;
                // Kivonatolás és a kívánt tartalom megjelenítése
                extractAndDisplayContent(content);
                jumpToTextarea();
                refresh();
            }
        };
        reader.readAsText(file);
    } else {
        alert('Kérlek tölts fel egy érvényes HTML fájlt.');
    }
}

// A többi funkció változatlan marad


// Lock feloldása (pl. egy másik gombbal vagy az oldal elhagyásakor)
function unlockFile() {
    localStorage.removeItem('fileLock');
    localStorage.removeItem('loadedFileName');
    alert('A fájl lock feloldva.');
}

window.addEventListener('beforeunload', function() {
    // Az oldal elhagyásakor a fájl neve törlése a localStorage-ból
    localStorage.removeItem('fileLock');
    localStorage.removeItem('loadedFileName');
    alert('A fájl lock feloldva.');
});


function extractAndDisplayContent(htmlContent) {
            // Ide írhatod azt a logikát, amivel kivonatolod a kívánt tartalmat
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');

            // Az 'example' id-val rendelkező elem tartalmának kivonatolása
            const targetContent = doc.getElementById('example');
            if (targetContent) {
                document.getElementById('editor').innerHTML = targetContent.outerHTML;
                htmlsavebtwwork();
            } 
            else {
                alert('Nem található tartalom a szerkesztés szükséges feltöltött HTML fájlban.');
                document.getElementById('editor').innerHTML = '';
            }
}
function jumpToTextarea() {
            var textarea = document.getElementById('editor');
            textarea.focus(); // A textarea fókuszálása           
}
function refresh(){
            const editor = document.getElementById('editor');
            const iframe = document.getElementById('view');
            iframe.srcdoc = editor.value;
}
        
function HtmlPartrefresh(){
    const editor = document.getElementById('editor');
    const iframe = document.getElementById('view');
    iframe.srcdoc = '';
    editor.innerHTML = '';
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0]; 
    unlockFile();
}

var htmlStack = []; // Stack az előző HTML állapotok tárolásához
var currentHtmlIndex = -1; // Nyomon követjük, hogy jelenleg melyik állapot van betöltve

function htmlsavebtwwork() {
    // Lekérjük az iframe-et és az aktuális tartalmat
    const iframe = document.getElementById('view');
    const currentHtml = iframe.srcdoc;

    // Ha van előző állapot, és a legutóbbi nem egyezik meg a jelenlegi állapottal, akkor elmentjük
    if (currentHtmlIndex === -1 || htmlStack[currentHtmlIndex] !== currentHtml) {
        // Ha új mentés történik, akkor az összes előző állapot, amely később van a stack-ben, törlődik
        htmlStack = htmlStack.slice(0, currentHtmlIndex + 1);

        // Hozzáadjuk a jelenlegi állapotot a stackhez és frissítjük az indexet
        htmlStack.push(currentHtml);
        currentHtmlIndex++;

        console.log("HTML állapot elmentve. Jelenlegi állapotok száma:", htmlStack.length);
    } else {
        console.log("A jelenlegi állapot megegyezik az utolsó mentettel, nincs szükség új mentésre.");
    }
}

function htmlbackloadbtwwork() {
    // Ellenőrizzük, hogy van-e előző állapot, amire vissza lehet lépni
    if (currentHtmlIndex > 0) {
        // Lépjünk vissza az előző állapotra
        currentHtmlIndex--;
        const previousHtml = htmlStack[currentHtmlIndex];

        const editor = document.getElementById('editor');
        const iframe = document.getElementById('view');

        // Az iframe tartalmát és az editor tartalmát visszaállítjuk az előző állapotra
        iframe.srcdoc = previousHtml;
        editor.value = previousHtml;
        editor.innerHTML = previousHtml;

        console.log("HTML visszaállítva az előző állapotra.");
    } else {
        console.log("Nincs korábbi állapot, amire vissza lehetne lépni.");
    }
}

function htmlforwardloadbtwwork() {
    // Ellenőrizzük, hogy van-e későbbi állapot, amire előre lehet lépni
    if (currentHtmlIndex < htmlStack.length - 1) {
        // Lépjünk előre a következő állapotra
        currentHtmlIndex++;
        const nextHtml = htmlStack[currentHtmlIndex];

        const editor = document.getElementById('editor');
        const iframe = document.getElementById('view');

        // Az iframe tartalmát és az editor tartalmát visszaállítjuk a következő állapotra
        iframe.srcdoc = nextHtml;
        editor.value = nextHtml;
        editor.innerHTML = nextHtml;

        console.log("HTML előreállítva a következő állapotra.");
    } else {
        console.log("Nincs későbbi állapot, amire előre lehetne lépni.");
    }
}
