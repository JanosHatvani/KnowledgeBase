function saveHtmlPart() {
    // Kiválasztjuk az elemet, amit menteni szeretnénk
    const view = document.getElementById('view');
    
    // Ellenőrizzük, hogy az editor elem valóban létezik-e
    if (!view) {
        console.error('Az "view" azonosítójú elem nem található.');
        return;
    }
    if (view.srcdoc == '') {
        console.error('Az "view" azonosítójú elem nem található.');
        alert('A view nem tartalmaz menthető adatot.');    
        return;   
    }
    // Létrehozzuk a Blob-ot a HTML tartalommal
    const htmlContent = view.srcdoc; // srcdoc-ból vesszük ki az HTML-tartalmat
    const blob = new Blob([htmlContent], {type: 'text/html'});
    
    // Létrehozunk egy letöltési linket
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ticketmasolat.html';  // A fájl neve, amit menteni szeretnénk
    a.style.display = 'none'; // A linket nem jelenítjük meg a felhasználónak
    document.body.appendChild(a);
    
    // Kattintás szimulálása a linken
    a.click();
    htmlsavebtwwork();
    // Link eltávolítása a dokumentumból
    document.body.removeChild(a);
}
var htmlcode = "";
function htmlsavebtwwork() {
    // Lekérjük az iframe-et
    const iframe = document.getElementById('view');
    
    // Elmentjük az iframe jelenlegi tartalmát a 'htmlcode' változóba
    htmlcode = iframe.srcdoc;

    console.log("HTML elmentve:", htmlcode);
}