var htmlStack = []; // Stack az előző HTML állapotok tárolásához
var currentHtmlIndex = -1; // Nyomon követjük, hogy jelenleg melyik állapot van betöltve

function htmlsavebtwwork() {
    // Lekérjük az iframe-et és az aktuális tartalmat
    const iframe = document.getElementById('view');
    
    // Ellenőrizzük, hogy van-e tartalom az iframe-ben
    if (!iframe.contentDocument || !iframe.contentDocument.documentElement) {
        console.log("Az iframe tartalma nem elérhető.");
        return;
    }

    // Az iframe teljes tartalmának mentése
    const currentHtml = iframe.contentDocument.documentElement.outerHTML;

    // Ha nincs mentett állapot, vagy a jelenlegi eltér az utolsótól, akkor mentjük
    if (currentHtmlIndex === -1 || htmlStack[currentHtmlIndex] !== currentHtml) {
        // Ha új mentés történik, akkor töröljük az esetleges későbbi állapotokat
        htmlStack = htmlStack.slice(0, currentHtmlIndex + 1);

        // Hozzáadjuk az aktuális állapotot a stackhez
        htmlStack.push(currentHtml);
        currentHtmlIndex++;

        console.log("HTML állapot elmentve. Jelenlegi állapotok száma:", htmlStack.length);
        alert("HTML állapot elmentve.");
    } 
    else {
        console.log("A jelenlegi állapot megegyezik az utolsó mentettel, nincs szükség új mentésre.");
        alert("A jelenlegi állapot megegyezik az utolsó mentettel, nincs szükség új mentésre.");
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
        alert("HTML visszaállítva az előző állapotra.");
    } 
    else {
        console.log("Nincs korábbi állapot, amire vissza lehetne lépni.");
        alert("Nincs korábbi állapot, amire vissza lehetne lépni.");
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
        alert("HTML előreállítva a következő állapotra.");
    } 
    else {
        console.log("Nincs későbbi állapot, amire előre lehetne lépni.");
        alert("Nincs későbbi állapot, amire előre lehetne lépni.");
    }
}
