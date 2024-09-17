export function checkFileLockStatus() {
    // A helyi C# program futtatása
    const exec = require('child_process').exec;
    exec('/Knowledge base/LockCheck_1_0_0_0/LockCheck.exe', (error, stdout, stderr) => {
        if (error) {
            console.error(`Hiba történt: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }

        const response = JSON.parse(stdout);

        if (response.status === 'locked') {
            document.getElementById('open').disabled = true;
            document.getElementById('lockStatus').innerText = 'Status: Más által foglalt a file.';
        } else if (response.status === 'unlocked') {
            document.getElementById('open').disabled = false;
            document.getElementById('lockStatus').innerText = 'Status: Zárolatlan';
        } else {
            document.getElementById('lockStatus').innerText = 'Status: Nem lehet értelmezni a státuszt';
        }
    });
}
