
const { Low, JSONFile } = require('lowdb');


const path = require('path');
const dbPath = path.join(__dirname, 'Knowledge base', 'DB');


const db = new Low(new JSONFile(path.join(dbPath, 'database.json')));


async function initDatabase() {
    await db.read();
    db.data ||= { amdb: {}, mmdb: {}, fidb: {} };
    await db.write();
}


async function getLockStatus(fileName) {
    await db.read();
    if (fileName in db.data.amdb) return db.data.amdb[fileName].locked;
    if (fileName in db.data.mmdb) return db.data.mmdb[fileName].locked;
    if (fileName in db.data.fidb) return db.data.fidb[fileName].locked;
    return null;
}

async function setLockStatus(fileName, locked) {
    await db.read();
    if (fileName in db.data.amdb) db.data.amdb[fileName].locked = locked;
    if (fileName in db.data.mmdb) db.data.mmdb[fileName].locked = locked;
    if (fileName in db.data.fidb) db.data.fidb[fileName].locked = locked;
    await db.write();
}


async function ensureFileStructure(fileName) {
    await db.read();
    if (!db.data.amdb[fileName]) {
        db.data.amdb[fileName] = { locked: false };
    }
    if (!db.data.mmdb[fileName]) {
        db.data.mmdb[fileName] = { locked: false };
    }
    if (!db.data.fidb[fileName]) {
        db.data.fidb[fileName] = { locked: false };
    }
    await db.write();
}

module.exports = { initDatabase, getLockStatus, setLockStatus, ensureFileStructure };


// main.js
const { initDatabase, getLockStatus, setLockStatus, ensureFileStructure } = require('./database');

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file && file.type === "text/html") {
        const fileName = file.name;

        const reader = new FileReader();
        reader.onload = async function(event) {
            const content = event.target.result;
            var iframe = document.getElementById('view');
            var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            var example = iframeDocument.getElementById('example');

            
            await ensureFileStructure(fileName);

          
            const locked = await getLockStatus(fileName);

            if (locked) {
                alert('A fájl már megnyitásra került más felhasználó által!');
                return;
            } else {
                if (example) {
                    alert('A szerkesztése már megkezdted, az editor már feltöltésre került.');
                } else {
                    
                    document.getElementById('editor').innerHTML = content;
                    extractAndDisplayContent(content);
                    jumpToTextarea();
                    refresh();
                    
                    await setLockStatus(fileName, true);
                }
            }
        };
        reader.readAsText(file);
    } else {
        alert('Kérlek tölts fel egy érvényes HTML fájlt.');
    }
}


initDatabase();
function unlockFile() {
    const fileName = localStorage.getItem('loadedFileName');
    setLockStatus(fileName, false);
    localStorage.removeItem('fileLock');
    localStorage.removeItem('loadedFileName');
    alert('A fájl lock feloldva.');
}

window.addEventListener('beforeunload', function() {
    unlockFile();
    alert('A fájl lock feloldva.');
});
