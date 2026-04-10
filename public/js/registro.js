function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
// --- RFC Search (Autofill) ---
const rfcSearch = document.getElementById('rfc_search');
const rfcResults = document.getElementById('rfc_results');
const urlBase = "http://192.166.127.57:81/COPYCONS/";
rfcSearch.addEventListener('input', async (e) => {
    const val = e.target.value.trim();
    if (val.length < 3) {
        rfcResults.classList.remove('show');
        return;
    }

    try {
        const response = await fetch(urlBase + "registro/search_rfc/" + val);
        const result = await response.json();

        if (result.success && result.data.length > 0) {
            rfcResults.innerHTML = '';
            result.data.forEach(p => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = `<span class="rfc-val">${p.rfc}</span><span class="name-val">${p.completo}</span><span class="tel-val">${p.telefono}</span>`;
                item.addEventListener('click', () => {
                    document.getElementById('nombre').value = p.completo;
                    document.getElementById('rfc').value = p.rfc;
                    document.getElementById('telefono').value = p.telefono;
                    rfcResults.classList.remove('show');
                    rfcSearch.value = '';
                });
                rfcResults.appendChild(item);
            });
            rfcResults.classList.add('show');
        } else {
            rfcResults.classList.remove('show');
        }
    } catch (e) {
        console.error(e);
    }
});

document.addEventListener('click', (e) => {
    if (!rfcSearch.contains(e.target) && !rfcResults.contains(e.target)) {
        rfcResults.classList.remove('show');
    }
});

// --- Patient Registration ---
const formRegister = document.getElementById('form-register');
formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        nombre: document.getElementById('nombre').value,
        rfc: document.getElementById('rfc').value,
        telefono: document.getElementById('telefono').value,
        especialidad: document.getElementById('especialidad').value,
        diagnostico: document.getElementById('diagnostico').value
    };

    try {
        const response = await fetch(urlBase + "registro/registrar/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            showToast(result.message, 'success');
            formRegister.reset();
            //loadAppointments(); // update stats behind the scenes
        } else {
            showToast(result.message, 'error');
        }
    } catch (err) {
        showToast('Error de conexión', 'error');
    }
});
