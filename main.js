document.addEventListener('DOMContentLoaded', () => {
    const sidButton = document.getElementById('sid-button');
    const noSidButton = document.getElementById('no-sid-button');
    const sidField = document.getElementById('sid-field');
    const submitButton = document.getElementById('submit-button');
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    const copyButton = document.querySelector('.copy-button');
    const closeButton = document.querySelector('.close-button');
    const form = document.getElementById('aircraft-form');
    const infoInput = document.getElementById('info-input');

    // Hide the popup initially
    popup.style.display = 'none';

    // SID Button Toggle
    sidButton.addEventListener('click', () => {
        sidButton.classList.add('active');
        noSidButton.classList.remove('active');
        sidField.style.display = 'block';
    });

    noSidButton.addEventListener('click', () => {
        noSidButton.classList.add('active');
        sidButton.classList.remove('active');
        sidField.style.display = 'none';
    });

    // Submit Button Click
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        const callsign = document.getElementById('callsign').value;
        const destination = document.getElementById('destination').value;
        const sid = document.getElementById('sid').value;
        const squawk = generateSquawkCode();
        const info = infoInput.value; // Get the ATIS info
        let message;

        if (sidButton.classList.contains('active')) {
            message = `${callsign}, CLEARED TO ${destination}, ${sid} DEPARTURE, THEN AS FILED. SQUAWK ${squawk}. NO READBACK REQUIRED. ADVISE READY FOR PUSH & START WITH INFORMATION ${info}.`;
        } else {
            message = `${callsign}, CLEARED TO ${destination} AS FILED, SQUAWK ${squawk}. NO READBACK REQUIRED. ADVISE READY FOR PUSH & START WITH INFORMATION ${info}.`;
        }

        popupText.textContent = message.toUpperCase(); // Convert the message to uppercase
        popup.style.display = 'flex'; // Show the popup
    });

    // Close Popup
    closeButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Copy Text to Clipboard
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(popupText.textContent).then(() => {
            alert('PDC copied to clipboard!');
        });
    });

    // Close Popup When Clicking Outside
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    };

    // Function to generate a random squawk code
    function generateSquawkCode() {
        let squawk = '';
        while (squawk.length < 4) {
            const digit = Math.floor(Math.random() * 10);
            if (digit !== 8 && digit !== 9) {
                squawk += digit;
            }
        }
        return squawk;
    }
});
