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
        const response = await fetch(urlBase + "catalogo/search_rfc/" + val);
        const result = await response.json();

        if (result.success && result.data.length > 0) {
            rfcResults.innerHTML = '';
            result.data.forEach(p => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = `<span class="rfc-val">${p.rfc}</span><span class="name-val">${p.nombres}</span><span class="paterno-val">${p.paterno}</span><span class="materno-val">${p.materno}</span><span>${p.id}</span>`;
                item.addEventListener('click', () => {
                    document.getElementById('rfc_search').value = p.rfc;
                    document.getElementById('nombre').value = p.nombres;
                    document.getElementById('paterno').value = p.paterno;
                    document.getElementById('materno').value = p.materno;
                    document.getElementById('telefono').value = p.telefono;
                    document.getElementById('tipo').value = p.tipo;
                    document.getElementById('fechanac').value = p.fechanac;
                    document.getElementById('elid').value = p.id;
                    rfcResults.classList.remove('show');

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
const formCatalogo = document.getElementById('form-catalogo');
formCatalogo.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        nombres: document.getElementById('nombre').value,
        paterno: document.getElementById('paterno').value,
        materno: document.getElementById('materno').value,
        telefono: document.getElementById('telefono').value,
        especialidad: document.getElementById('especialidad').value,
        diagnostico: document.getElementById('diagnostico').value,
        elid: document.getElementById('elid').value
    };

    try {
        const response = await fetch(urlBase + "catalogo/registrar/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            showToast(result.message, 'success');
            formCatalogo.reset();
            //loadAppointments(); // update stats behind the scenes
        } else {
            showToast(result.message, 'error');
        }
    } catch (err) {
        showToast('Error de conexión', 'error');
    }
});
