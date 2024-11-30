const pathToDb = ("./");
const filesToDb = {
    "am_tickets.html": "amdb.json",
    "mm_tickets.html": "mmdb.json",
    "fi_tickets.html": "fidb.json"
};

function getFileName() {
    const fileInput = document.getElementById('fileInput');
    return fileInput.files[0] ? fileInput.files[0].name : null;
}

function checkAndLockFile(user) {
    const fileName = getFileName();
    if (!fileName || !(fileName in filesToDb)) {
        alert("Nem támogatott fájlt választottál ki!");
        return;
    }

    const dbFile = filesToDb[fileName];
    const dbFilePath = pathToDb + dbFile;

    //async function getJson() {
    //      const response = await fetch("./data.json");
    //      const data = await response.json();
    //      drawBars(data);
     // }

    // Fájl létezésének ellenőrzése
    fetch(dbFilePath, { method: 'HEAD' }).then(response => {
        if (response.ok) {
            // Ha a fájl létezik, folytatjuk az ellenőrzést
            fetch(dbFilePath).then(response => {
                if (!response.ok) {
                    // JSON fájl létrehozása, ha nem létezik
                    createDbFile(dbFilePath, fileName);
                } else {
                    response.json().then(jsonData => {
                        if (jsonData[fileName].locked) {
                            alert(`Már megnyitva más felhasználó által: ${jsonData[fileName].lockedBy}`);
                        } else {
                            lockFile(dbFilePath, jsonData, fileName, user);
                        }
                    });
                }
            }).catch(error => {
                console.error("Hiba a JSON fájl betöltése közben:", error);
            });
        } else {
            alert(`A ${dbFilePath} fájl nem létezik az adott elérési úton.`);
        }
    }).catch(error => {
        console.error("Hiba a fájl ellenőrzése során:", error);
    });
}


function createDbFile(dbFilePath, fileName) {
    const initialData = {};
    initialData[fileName] = {
        locked: false,
        lockedBy: ""
    };

    fetch(dbFilePath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(initialData)
    }).then(response => {
        if (response.ok) {
            console.log("Új JSON fájl létrehozva.");
            // Zárás és fájl betöltése
            checkAndLockFile(getUser());
        }
    }).catch(error => {
        console.error("Nem sikerült létrehozni a JSON fájlt:", error);
    });
}

function lockFile(dbFilePath, jsonData, fileName, user) {
    jsonData[fileName].locked = true;
    jsonData[fileName].lockedBy = user;

    fetch(dbFilePath, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
    }).then(response => {
        if (response.ok) {
            console.log(`${fileName} zárolva ${user} által.`);
            loadFileContent(fileName);
        }
    }).catch(error => {
        console.error("Nem sikerült zárolni a fájlt:", error);
    });
}

function unlockFile() {
    const fileName = getFileName();
    if (!fileName || !(fileName in filesToDb)) {
        return;
    }

    const dbFile = filesToDb[fileName];
    const dbFilePath = pathToDb + dbFile;

    fetch(dbFilePath).then(response => response.json()).then(jsonData => {
        jsonData[fileName].locked = false;
        jsonData[fileName].lockedBy = "";

        fetch(dbFilePath, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        }).then(response => {
            if (response.ok) {
                alert("Fájl zárolás feloldva.");
            }
        }).catch(error => {
            console.error("Nem sikerült feloldani a fájl zárolását:", error);
        });
    });
}

function loadFileContent(fileName) {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file && file.name === fileName) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const content = event.target.result;
            document.getElementById('editor').innerHTML = content;
            document.getElementById('view').srcdoc = content;
        };
        reader.readAsText(file);
    }
}

function getUser() {
    return navigator.userAgentData ? navigator.userAgentData.platform : navigator.platform;
}

window.addEventListener('beforeunload', unlockFile);
