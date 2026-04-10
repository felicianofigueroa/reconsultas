<?php require 'views/header.php'; ?>
<div class="card form-card glass-panel">
    <h2>Catálogo de Pacientes</h2>
    <form id="form-catalogo" class="premium-form">
        <div class="form-row">
            <div class="form-group half">
                <label for="rfc_search">Buscar Paciente Existente (RFC)<span class="optional">(Opcional)</span></label>
                <div class="input-with-icon">
                    <i class="fa-solid fa-search"></i>
                    <input type="text" id="rfc_search" placeholder="Ingrese RFC para autocompletar" maxlength="13">
                </div>  
                <div id="rfc_results" class="autocomplete-results"></div>
            </div>
            <div class="form-group half">
                <label for="tipo" class="form-label">Tipo</label>
                    <select id="tipo" name="tipo">
                        <option value="10">Trabajador</option>    
                        <option value="20">Trabajadora</option>
                        <option value="30">Esposa</option>
                        <option value="40">Esposo</option>
                        <option value="50">Padre</option>
                        <option value="60">Madre</option>
                        <option value="70">Hijo</option>
                        <option value="80">Hija</option>
                        <option value="90">Pensionado</option>
                        <option value="91">Pendionada</option>
                        <option value="92">Fam Pensionado</option>
                        
                    </select>
            </div>
           
            
        </div>

        <hr class="divider">

        <div class="form-row">
            <div class="form-group half">
                <input type="text" id="elid" name="elid" hidden>
                <label for="nombre">Nombre *</label>
                <input type="text" id="nombre" name="nombre" required placeholder="Ej. María">
            </div>
            <div class="form-group half">
                <label for="paterno">Apellido Paterno *</label>
                <input type="text" id="paterno" name="paterno" required placeholder="Ej. López">
            </div>
            <div class="form-group half">
                <label for="materno">Apellido Materno *</label>
                <input type="text" id="materno" name="materno" required placeholder="Ej. Pérez">
            </div>
            
        </div>

        <div class="form-row">
            <div class="form-group half">
                <label for="telefono">Teléfono *</label>
                <input type="tel" id="telefono" name="telefono" required placeholder="10 dígitos">
            </div>
            <div class="form-group half">
                <label for="fechanac">Fecha de Nacimiento *</label>
                <input type="date" id="fechanac" name="fechanac" required>
            </div>
        </div>

        <div class="form-group">
            <label for="diagnostico">Motivo de Consulta / Diagnóstico Inicial *</label>
            <textarea id="diagnostico" name="diagnostico" rows="3" required
                placeholder="Descripción breve..."></textarea>
        </div>

        <div class="form-actions">
            <button type="button" class="btn btn-secondary"
                onclick="document.getElementById('form-catalogo').reset()">Limpiar</button>
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-save"></i> Registrar
                Paciente</button>
        </div>
        <div id="register-msg" class="msg-box"></div>
    </form>
</div>
     
                
            </div>
        </main>
    </div>

    <!-- Notification Toast Container -->
    <div id="toast-container" class="toast-container"></div>

    <script src="<?php echo constant('URL'); ?>public/js/catalogo.js"></script>
</body>

</html>