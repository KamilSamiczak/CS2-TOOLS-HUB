const podglad = document.querySelector('#podglad');
const btnPobierz = document.querySelector('#btn-pobierz');

function aktywujKomende(idDodaj, idUsun, tresc) {
    const btnAdd = document.querySelector(idDodaj);
    const btnBack = document.querySelector(idUsun);
    const pelnaKomenda = tresc + '\n';

    btnAdd.addEventListener('click', () => {
        podglad.value += pelnaKomenda;
        btnAdd.disabled = true;
        btnBack.disabled = false;
    });

    btnBack.addEventListener('click', () => {
        podglad.value = podglad.value.replace(pelnaKomenda, "");
        btnAdd.disabled = false;
        btnBack.disabled = true;
    });
}

// Rejestracja komend
aktywujKomende('#btn-fps', '#btn-back-fps', 'cl_hud_telemetry_frametime_show 2');
aktywujKomende('#btn-data', '#btn-back-data', 'r_show_build_info 0');
aktywujKomende('#btn-qq', '#btn-qq-drop', 'alias "+knife" "slot3";\nalias "-knife" "lastinv";\nbind "Q" "+knife";');
aktywujKomende('#btn-scroll-up', '#btn-scroll-up-back', 'bind "MWHEELUP" "+jump"');
aktywujKomende('#btn-scroll-down', '#btn-scroll-down-back', 'bind "mwheeldown" "+jump"');
aktywujKomende('#btn-radar', '#btn-back-radar', 'cl_radar_scale 0.3;\ncl_radar_always_centered 0;')

// Pobieranie
btnPobierz.addEventListener('click', () => {
    const tekstDoZapisania = podglad.value;
    const plik = new Blob([tekstDoZapisania], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(plik);
    link.download = 'autoexec.cfg';
    link.click();
    URL.revokeObjectURL(link.href);

    // --- 2. CZĘŚĆ ANIMACJI (Nowość) ---
    
    // Zapamiętujemy stary napis (np. "POBIERZ PLIK .CFG")
    const staryTekst = btnPobierz.innerText;

    // Zmieniamy wygląd na chwilę
    btnPobierz.innerText = "POBRANO! 💾";
    btnPobierz.style.backgroundColor = "#44bd32"; // Zmień kolor na zielony
    btnPobierz.style.borderColor = "rgb(0, 53, 0)";     // Jeśli masz ramkę

    // Ustawiamy "Budzik" na 2000 milisekund (2 sekundy)
    setTimeout(() => {
        // Przywracamy stary napis
        btnPobierz.innerText = staryTekst;
        
        // Czyścimy kolor (dzięki temu wróci kolor z pliku CSS, np. czarny)
        btnPobierz.style.backgroundColor = ""; 
        btnPobierz.style.borderColor = "";
    }, 2000);
});

const btnCopy = document.querySelector('#btn-copy');

btnCopy.addEventListener('click', () => {
    // 1. Pobieramy tekst z pola podglądu
    const textToCopy = podglad.value;

    // 2. Używamy Clipboard API do skopiowania tekstu
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Opcjonalne: Wizualne potwierdzenie dla użytkownika
        const originalText = btnCopy.innerText;
        btnCopy.innerText = "Skopiowano!";
        btnCopy.style.backgroundColor = "#44bd32"; // Zmiana na zielony
        btnCopy.style.borderColor = "rgb(0, 53, 0)";

        // Przywrócenie pierwotnego wyglądu po 2 sekundach
        setTimeout(() => {
            btnCopy.innerText = originalText;
            btnCopy.style.backgroundColor = ""; 
        }, 2000);
    }).catch(err => {
        console.error('Błąd kopiowania: ', err);
        alert("Could not copy text!");
    });
});