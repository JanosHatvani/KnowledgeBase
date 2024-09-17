function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
        if (file) {
            const allowedFiles = ['am_tickets.html', 'mm_tickets.html', 'fi_tickets.html'];
    
            if (allowedFiles.includes(file.name)) {
                // Hívjuk a helyi C# alkalmazást, és kapjuk meg a fájl állapotát
                checkFileLockStatus();
            }
        }
    

    if (file && file.type === "text/html") {
        const fileName = file.name;

        const reader = new FileReader();
        reader.onload = function(event) {
            const content = event.target.result;
            var iframe = document.getElementById('view');
            var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            var example = iframeDocument.getElementById('example');

            // Ellenőrizzük, hogy a fájl már lockolva van-e
            if (localStorage.getItem('fileLock') === 'locked') {
                alert('A fájl jelenleg lockolva van. Kérlek, próbáld újra később.');
                return;
            }
            else{
                if (example) {
                    alert('A szerkesztése már megkezdted, az editor már feltöltésre került.');
                } 
                else {
                    // A tartalom betöltése az 'editor' id-vel rendelkező div-be
                    document.getElementById('editor').innerHTML = content;
                    // Kivonatolás és a kívánt tartalom megjelenítése
                    extractAndDisplayContent(content);
                    jumpToTextarea(); 
                    refresh();
                    // Ha nincs lockolva, lockoljuk a fájlt
                    localStorage.setItem('fileLock', 'locked');
                    // Fájl neve elmentése a localStorage-be
                    localStorage.setItem('loadedFileName', fileName);
                }

            }
            
        };
        reader.readAsText(file);
    } else {
        alert('Kérlek tölts fel egy érvényes HTML fájlt.');
    }
}

// Lock feloldása (pl. egy másik gombbal vagy az oldal elhagyásakor)
function unlockFile() {
    localStorage.removeItem('fileLock');
    localStorage.removeItem('loadedFileName', fileName);
    alert('A fájl lock feloldva.');
}

window.addEventListener('beforeunload', function() {
    // Az oldal elhagyásakor a fájl neve törlése a localStorage-ból
    localStorage.removeItem('fileLock');
    localStorage.removeItem('loadedFileName', fileName);
    alert('A fájl lock feloldva.');
});

//window.addEventListener('load', function() {
  //HtmlPartrefresh(); // Opcióként használható, ha az oldal frissítésekor is törölni szeretnéd a tartalmat
//});

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
