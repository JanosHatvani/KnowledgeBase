function lockFile(fileName) {
    fetch('lock_file.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'fileName': fileName,
            'action': 'lock'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('A fájl zárolva lett.');
        } else {
            alert(data.message);
        }
    });
}

function unlockFile(fileName) {
    fetch('lock_file.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'fileName': fileName,
            'action': 'unlock'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('A fájl zárolása megszüntetve.');
        } else {
            alert(data.message);
        }
    });
}

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file && file.type === "text/html") {
        const fileName = file.name;

        if (localStorage.getItem('loadedFileName') === fileName) {
            alert('A szerkesztése már megkezdted, az editor már feltöltésre került.');
            return;
        }

        lockFile(fileName);

        const reader = new FileReader();
        reader.onload = function(event) {
            const content = event.target.result;
            var iframe = document.getElementById('view');
            var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            var example = iframeDocument.getElementById('example');
            
            if (example) {
                alert('A szerkesztése már megkezdted, az editor már feltöltésre került.');
            } else {
                document.getElementById('editor').innerHTML = content;
                extractAndDisplayContent(content);
                jumpToTextarea(); 
                refresh();
            }
            
            localStorage.setItem('loadedFileName', fileName);
        };
        reader.readAsText(file);
    } else {
        alert('Kérlek tölts fel egy érvényes HTML fájlt.');
    }
}

window.addEventListener('beforeunload', function() {
    const fileName = localStorage.getItem('loadedFileName');
    if (fileName) {
        unlockFile(fileName);
        localStorage.removeItem('loadedFileName');
    }
});

window.addEventListener('load', function() {
    HtmlPartrefresh(); 
});
