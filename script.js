document.addEventListener('DOMContentLoaded', function() {
    const journalTextArea = document.getElementById('journal');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    const entriesList = document.getElementById('entriesList');
    
    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entriesList.innerHTML = '';
        entries.forEach((entry, index) => {
            const li = document.createElement('li');
            li.textContent = `${entry.date} - ${entry.text.slice(0, 30)}...`; // Show a snippet
            li.addEventListener('click', () => {
                journalTextArea.value = entry.text;
            });
            entriesList.appendChild(li);
        });
    }

    function saveEntry() {
        const text = journalTextArea.value.trim();
        if (text === '') {
            alert('Please write something before saving.');
            return;
        }

        const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        const newEntry = {
            date: new Date().toLocaleString(),
            text: text
        };
        entries.push(newEntry);
        localStorage.setItem('journalEntries', JSON.stringify(entries));
        loadEntries();
        journalTextArea.value = '';
        alert('Journal entry saved!');
    }

    function clearEntries() {
        localStorage.removeItem('journalEntries');
        loadEntries();
    }

    saveBtn.addEventListener('click', saveEntry);
    clearBtn.addEventListener('click', clearEntries);

    loadEntries();
});
