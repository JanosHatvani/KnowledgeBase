function uploadHtml() {
    var HtmlContent = `<!DOCTYPE html>
    <html lang="en" id="example">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
            
            <link rel="stylesheet" href="../Knowledge base/Style/ticket.css"/>
            
            <title>hibajegy</title>
        </head>
        <body class="body" id="body">
        </body>
    </html>`;
    /* <link rel="stylesheet" href="../Style/ticket.css"> */
    /* <link rel="stylesheet" type="text/css" href="../Style/ticket.css">*/
    var textareaEditor = document.getElementById('editor');
    var iframe = document.getElementById('view');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    var body = iframeDocument.getElementById('body');
    if(body)
        {
            alert('Az új hibajegy léterhozását már elindítottad');
        }
    else{
    
    // Beállítjuk az iframe tartalmának a megadott kód részletet
    iframe.srcdoc = HtmlContent;

    // Frissítjük az iframe doc tartalmát a textarea tartalmával
    function updateIframeContent() {
        iframe.srcdoc = textareaEditor.value;
    }

    // A textarea tartalmának figyelése és frissítése
    textareaEditor.addEventListener('input', updateIframeContent);

    // Kezdeti frissítés
    textareaEditor.value = HtmlContent;
    updateIframeContent();
    }
}


function uploadHeader() {

    var HtmlHeader = `
    <nav class="sticky" id="sticky">
      <div class="nav__bar">
        <div class="nav__logo"><a id="linkToChange" href="https://tdp.kgir.hu/tas/secure/mango/window/18?t=1715328521391">I-240502-025</a></div>
        
        <ul class="nav__links">
          <li class="link"><a href="#header">Hibajegy leírás</a></li>
          <li class="link"><a href="#prog">Javítás, fejlesztés</a></li>
          <li class="link"><a href="#test">Teszt</a></li>
          <li class="link"><a href="#transport">Transport</a></li>
        </ul>
        <div class="nav__btns">
            <a href="/prog/Knowledge base/index.html">
                <button class="btn btn__primary">Kezdőlap</button>
            </a>
            <a href="/prog/Knowledge base/am_tickets.html">
                <button class="btn btn__secondary">Hibajegyek oldal</button>
            </a>
        </div>
      </div>
    </nav>
    `;

    var textareaEditor = document.getElementById('editor');
    var iframe = document.getElementById('view');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    /*iframe-n belül a változtatásra kerülú href és textContent elérési útja */
    var iframesrcdoc = iframe.srcdoc;
    var body = iframeDocument.getElementById('body');
    if(body)
        {
            //ellenőrzés szükséges! a header csak egyszer fordulhat elő a tartalomban!
        var sticky = iframeDocument.getElementById('sticky');
        if(sticky)
        {
            alert('A hibajegy fejléce már szerepel a tartalomban');
        }
        else{
        //ideiglenesen az editor tartalmának átadása, ez kerül szerkesztésre.
        var temp = editor.value;
        // Frissítjük az iframe tartalmát a textarea tartalmával
        function updateIframeContent() {
        //htmlheader beillesztése az ideiglenes template-be
        var combinedContent = temp.replace('</body>', HtmlHeader + '</body>');
        //editor és textarea betöltése a létrehozott tartalommal
        iframe.srcdoc = combinedContent;
        textareaEditor.value = combinedContent;
        
        }

    // A textarea tartalmának figyelése és frissítése
        textareaEditor.addEventListener('input', updateIframeContent);

    // Kezdeti frissítés
        textareaEditor.value = temp.replace('</body>', HtmlHeader + '</body>');
        updateIframeContent();
        
        }
    }
    else{
        alert('Még nem kezdted el a hibajegy létrehozást, kérlek kattints a hibajegy létrehozására.');
    }
}

function uploadTicketdesc(){

    var HtmlTicketdesc = `
    <header class="header" id="header">
      <div class="section__container header__container all__container">
        <div class="header__content" id="header_content">
          <h1 id="Hibajegy rövid leírása">Hibajegy megnevezése</h1>
          <h2 id="Hibajegy feladója">Hibajegy feladója - Név</h2>
          <h2 id="Hibajegy dátuma">Hibajegy dátuma - dátum</h2>
          <p id="Leírás">Leírás első
          </p>
          <div class="header__btns" >
              <a id="linkUrl1" href="">
                <button class="btn btn__secondary">Hibajegy megnyitás</button>
              </a>
          </div>
        </div>
        <div class="header__content_Img" id="header_content_Img"> 
          <img class="headerImg" id="headerImg" src="">
           <input type="file" id="imageInput" accept="image/*" style="display: none;">
        </div>
      </div>
    </header>
    `;

    var textareaEditor = document.getElementById('editor');
    var iframe = document.getElementById('view');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    var sticky = iframeDocument.getElementById('sticky');
    if(sticky)
    {
        var header = iframeDocument.getElementById('header');
        if(header)
        {
            alert('A hibajegy leírása már szerepel a tartalomban');
        }
        else{
        //ideiglenesen az editor tartalmának átadása, ez kerül szerkesztésre.
        var temp = editor.value;
        // Frissítjük az iframe tartalmát a textarea tartalmával
        function updateIframeContent() {
        //htmlheader beillesztése az ideiglenes template-be
        var combinedContent = temp.replace('</body>', HtmlTicketdesc + '</body>');
        //editor és textarea betöltése a létrehozott tartalommal
        iframe.srcdoc = combinedContent;
        textareaEditor.value = combinedContent;
        }

        // A textarea tartalmának figyelése és frissítése
        textareaEditor.addEventListener('input', updateIframeContent);

        // Kezdeti frissítés
        textareaEditor.value = temp.replace('</body>', HtmlTicketdesc + '</body>');
        updateIframeContent()
        
        }
    }
    else{
        alert('A hibajegy fejléce még nem szerepel a tartalomban');
    }
}
function uploadProgdesc(){

    var Htmlprogdesc = `
    <section class="section__container" id="prog">

        <div class="prog_desc" id="prog_desc">
        <div class="prog all__container" id="prog all__container 0">        
            <div class="prog__content" id="prog_content 0">
                <h1 id="Hibajegy h1">Fejlesztés, javítás leírása</h1>
                <h2 class="h2" id="Hibajegy d">Új igény</h2>
                <p class="p" id="Leírás">A ZAM_KORR_JAV tranzakció további fejlesztése. </p>
                <p class="p" id="Leírás">A jelen fejlesztési igény, hogy a "NATO anyagosztály módosítása" is elvégezhető legyen a felületen. Hasonlóan a korábbiakban fejlesztett "korrekciós kód" módosításhoz, itt is új - értékkészlet alapján - kiválasztását és ennek módosytását kell lehetővé tenni.</p>
            </div>
            <div class="prog__content_Img" id="prog_content_Img 0">
                <img id="progImg 0"  src="/prog/Knowledge base/image/I-240502-025/zam_korr_jav.jpg">
            </div>            
        </div>   
        </div>
        
    </section>
    `;

    var textareaEditor = document.getElementById('editor');
    var iframe = document.getElementById('view');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    var sticky = iframeDocument.getElementById('sticky');
    if(sticky){
        var prog = iframeDocument.getElementById('prog');
        if(prog)
        {
            alert('A fejlesztés leírása már szerepel a tartalomban');
        }
        else{
        //ideiglenesen az editor tartalmának átadása, ez kerül szerkesztésre.
        var temp = editor.value;
        // Frissítjük az iframe tartalmát a textarea tartalmával
        function updateIframeContent() {
        //htmlheader beillesztése az ideiglenes template-be
        var combinedContent = temp.replace('</body>', Htmlprogdesc + '</body>');
        //editor és textarea betöltése a létrehozott tartalommal
        iframe.srcdoc = combinedContent;
        textareaEditor.value = combinedContent;
        }

        // A textarea tartalmának figyelése és frissítése
        textareaEditor.addEventListener('input', updateIframeContent);

        textareaEditor.value = temp.replace('</body>', Htmlprogdesc + '</body>');
        updateIframeContent()
        
        }
    }
    else
    {
        alert('A hibajegy fejléce még nem szerepel a tartalomban');
    }
}

function uploadTestdesc(){

    var Htmltesdesc = `
    <section class="section__container all__container" id="test">
        
        <div class="test_desc" id="test_desc">
        <div class="test all__container" id="test all__container 0">        
            <div class="test__content" id="test_content 0">
                <h1>Teszt leírása</h1>
                <h2>1. lépés</h2>
                <h3>Tesztadat kiválasztás</h3>
                <p class="p">Egy olyan TE keresése, amely rendelkezik valamely NATO anyagosztály megjelöléssel</p>
                <p class="p">A kereséshez használható a ZAML2 és megtekintéshez az AS03 tranzakció.</p>
            </div>
            <div class="test__content_Img" id="test_content_Img 0">
                <img id="testImg 0"  src="/prog/Knowledge base/image/I-240502-025/zam_korr_jav_t1.jpg">
                </a>
            </div>            
        </div>
        
    </section>
    `;
    var textareaEditor = document.getElementById('editor');
    var iframe = document.getElementById('view');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    var sticky = iframeDocument.getElementById('sticky');
    if(sticky){
        

    var test = iframeDocument.getElementById('test');
    if(test)
        {
            alert('A tesztelés leírása már szerepel a tartalomban');
        }
        else{
        //ideiglenesen az editor tartalmának átadása, ez kerül szerkesztésre.
        var temp = editor.value;
        // Frissítjük az iframe tartalmát a textarea tartalmával
        function updateIframeContent() {
        //htmltestdesc beillesztése az ideiglenes template-be
        var combinedContent = temp.replace('</body>', Htmltesdesc + '</body>');
        //editor és textarea betöltése a létrehozott tartalommal
        iframe.srcdoc = combinedContent;
        textareaEditor.value = combinedContent;
        }

        // A textarea tartalmának figyelése és frissítése
        textareaEditor.addEventListener('input', updateIframeContent);

        textareaEditor.value = temp.replace('</body>', Htmltesdesc + '</body>');
        updateIframeContent()
        
        }
    }
    else{
        alert('A hibajegy fejléce még nem szerepel a tartalomban');
    }

}

function uploadTtransportdesc(){

    var Htmltransportdesc = `
    <section class="section__container all__container" id="transport">
        
        <div class="transport_desc" id="transport_desc">
        <div class="tranpsport all__container" id="tranpsport all__container">        
            <div class="transport__content" id="transport_content">
                <h1>Transport</h1>
                <h2 id="Hibajegy d">Bejátszandó transport</h2>
                <p id="Leírás">ALFK923363       QMLIPTAI     ZAM_KORR_JAV - NATO anyagosztály módosítása (I-240502-025)</p>
                <p id="Leírás">Esti ütemezéssel és felülírással bejátszandó a transzports</p>
            </div>          
        </div>            
        </div>           

    </section>
    `;

    var textareaEditor = document.getElementById('editor');
    var iframe = document.getElementById('view');
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    var sticky = iframeDocument.getElementById('sticky');
    if(sticky){

        var test = iframeDocument.getElementById('transport');
        if(test)
        {
            alert('A transport leírása már szerepel a tartalomban');
        }
        else{
        //ideiglenesen az editor tartalmának átadása, ez kerül szerkesztésre.
        var temp = editor.value;
        // Frissítjük az iframe tartalmát a textarea tartalmával
        function updateIframeContent() {
        //htmltestdesc beillesztése az ideiglenes template-be
        var combinedContent = temp.replace('</body>', Htmltransportdesc + '</body>');
        //editor és textarea betöltése a létrehozott tartalommal
        iframe.srcdoc = combinedContent;
        textareaEditor.value = combinedContent;
        }

        // A textarea tartalmának figyelése és frissítése
        textareaEditor.addEventListener('input', updateIframeContent);

        textareaEditor.value = temp.replace('</body>', Htmltransportdesc + '</body>');
        updateIframeContent()
        
        }   
    }
    else{
        alert('A hibajegy fejléce még nem szerepel a tartalomban');
    }
}
