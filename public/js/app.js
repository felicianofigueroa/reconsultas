document.addEventListener('DOMContentLoaded', () => {

    const navBtns = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view-section');
    const pageTitle = document.getElementById('page-title');

    // View Navigation
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            navBtns.forEach(b => b.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));

            e.currentTarget.classList.add('active');
            const targetId = e.currentTarget.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            pageTitle.innerText = e.currentTarget.innerText;

            if (targetId === 'view-consult' || targetId === 'view-dashboard') {
                loadAppointments();
            }
        });
    });

    // --- Toast Notifications ---
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

    rfcSearch.addEventListener('input', async (e) => {
        const val = e.target.value.trim();
        if (val.length < 3) {
            rfcResults.classList.remove('show');
            return;
        }

        try {
            const response = await fetch(`api/pacientes.php?action=search_rfc&rfc=${val}`);
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



    // --- Excel Upload Drag & Drop ---
    const dropArea = document.getElementById('file-drop-area');
    const fileInput = document.getElementById('archivo_excel');
    const fileMsg = dropArea.querySelector('.file-msg');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) { e.preventDefault(); e.stopPropagation(); }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('is-active'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('is-active'), false);
    });

    dropArea.addEventListener('drop', (e) => {
        let dt = e.dataTransfer;
        let files = dt.files;
        fileInput.files = files;
        updateFileName();
    });

    fileInput.addEventListener('change', updateFileName);

    function updateFileName() {
        if (fileInput.files.length > 0) {
            fileMsg.innerText = fileInput.files[0].name;
            dropArea.classList.add('is-active');
        }
    }

    const formImport = document.getElementById('form-import');
    formImport.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!fileInput.files.length) {
            showToast('Seleccione un archivo primero', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('archivo_excel', fileInput.files[0]);

        const btn = document.getElementById('btn-import-submit');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Subiendo...';
        btn.disabled = true;

        try {
            const response = await fetch('api/importar.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                showToast(result.message, 'success');
                formImport.reset();
                fileMsg.innerText = 'Arrastre el archivo o haga clic aquí';
                dropArea.classList.remove('is-active');
                loadAppointments();
            } else {
                showToast(result.message, 'error');
            }
        } catch (err) {
            showToast('Error al procesar el archivo', 'error');
        } finally {
            btn.innerHTML = '<i class="fa-solid fa-upload"></i> Procesar Archivo';
            btn.disabled = false;
        }
    });

    // --- Load Appointments Table & Dashboard Stats ---
    const tableBody = document.getElementById('table-body-citas');
    const filterEstado = document.getElementById('filter-estado');

    async function loadAppointments() {
        try {
            const res = await fetch(`api/pacientes.php?action=list&estado=${filterEstado.value}`);
            const result = await res.json();

            if (result.success) {
                const data = result.data;
                renderTable(data);
                updateDashboardStats(data);
            }
        } catch (e) {
            console.error('Error fetching list:', e);
        }
    }

    function renderTable(data) {
        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center" style="padding: 30px;">No hay registros encontrados.</td></tr>';
            return;
        }

        tableBody.innerHTML = '';
        data.forEach(item => {
            const stateClass = item.estado === 'PENDIENTE' ? 'pendiente' : 'agendada';
            const fH = item.fecha_cita ? `${item.fecha_cita} | ${item.hora_cita || ''}` : 'Sin asignar';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${item.id}</td>
                <td><strong>${item.paciente_nombre}</strong><br><small style="color:var(--text-light)">${item.paciente_rfc}</small></td>
                <td>${item.especialidad_medica}</td>
                <td><span class="badge ${stateClass}">${item.estado}</span></td>
                <td>${fH}</td>
                <td>${item.medico_asignado || '-'}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function updateDashboardStats(data) {
        // Stats are global if filter is 'all', otherwise they just reflect what is requested.
        // Let's make an independent call for stats just to be accurate if we want to show it on Dashboard.
        fetch('api/pacientes.php?action=list&estado=all')
            .then(res => res.json())
            .then(r => {
                if (r.success) {
                    const pendientes = r.data.filter(i => i.estado === 'PENDIENTE').length;
                    const bignums = document.querySelectorAll('.bignum');
                    if (bignums.length >= 2) {
                        bignums[0].innerText = r.data.length; // Total patients
                        bignums[1].innerText = pendientes; // Pending
                    }
                }
            });
    }

    document.getElementById('btn-refresh-list').addEventListener('click', loadAppointments);
    filterEstado.addEventListener('change', loadAppointments);

    // Initial Load
    loadAppointments();
});
