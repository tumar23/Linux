// Așteptăm ca tot conținutul HTML să se încarce înainte de a rula scriptul
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectăm elementele necesare din DOM (HTML)
    const modalOverlay = document.getElementById('custom-modal');
    const closeBtn = document.querySelector('.close-modal');
    const modalContainer = document.getElementById('modal-content-container');
    const openButtons = document.querySelectorAll('.open-modal');

    // 2. Funcție pentru deschiderea popup-ului
    function openModal(distroId) {
        // Căutăm datele specifice distribuției (div-ul ascuns din HTML)
        const dataElement = document.getElementById(`data-${distroId}`);
        
        if (dataElement) {
            // Copiem HTML-ul din interiorul div-ului ascuns în containerul modalului
            modalContainer.innerHTML = dataElement.innerHTML;
            
            // Adăugăm clasa 'active' pentru a face modalul vizibil prin CSS
            modalOverlay.classList.add('active');
            
            // Oprim scroll-ul paginii din spate
            document.body.style.overflow = 'hidden';
        }
    }

    // 3. Funcție pentru închiderea popup-ului
    function closeModal() {
        // Scoatem clasa 'active'
        modalOverlay.classList.remove('active');
        
        // Curățăm conținutul după o mică întârziere (pentru a lăsa animația de închidere să se termine)
        setTimeout(() => {
            modalContainer.innerHTML = '';
        }, 300);

        // Reactivăm scroll-ul pe pagină
        document.body.style.overflow = 'auto';
    }

    // 4. Atașăm evenimentele (Event Listeners) pe fiecare buton "Află mai multe"
    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Preluăm ID-ul distribuției din atributul data-modal (ex: 'ubuntu', 'mint')
            const distroId = button.getAttribute('data-modal');
            openModal(distroId);
        });
    });

    // 5. Atașăm eveniment de închidere pe butonul "X"
    closeBtn.addEventListener('click', closeModal);

    // 6. Închidem popup-ul dacă utilizatorul dă click în afara ferestrei albe (pe fundalul întunecat)
    modalOverlay.addEventListener('click', (event) => {
        // Verificăm dacă exact overlay-ul a fost apăsat, nu conținutul din el
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // 7. Opțional: Închidem popup-ul la apăsarea tastei ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

});