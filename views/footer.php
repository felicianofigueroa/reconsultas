
        
                    <div class="dashboard-cards">
                        <div class="card status-card">
                            <div class="card-icon"><i class="fa-solid fa-users"></i></div>
                            <div class="card-info">
                                <h3>Pacientes Día</h3>
                                <p class="bignum">Gestión</p>
                            </div>
                        </div>
                        <div class="card status-card">
                            <div class="card-icon"><i class="fa-solid fa-clock"></i></div>
                            <div class="card-info">
                                <h3>Citas Pendientes</h3>
                                <p class="bignum">Gestión</p>
                            </div>
                        </div>
                    </div>
                </section>



                <!-- View: Excel Export / Import -->
                <section id="view-excel" class="view-section">
                    <div class="excel-grid">
                        <!-- Export Card -->
                        <div class="card action-card glass-panel">
                            <div class="action-icon guinda">
                                <i class="fa-solid fa-file-export"></i>
                            </div>
                            <h3>Exportar Pacientes (Pendientes)</h3>
                            <p>Descargue el listado de pacientes recién registrados para enviarlo a la clínica de
                                especialidades.</p>
                            <a href="api/exportar.php" target="_blank" class="btn btn-primary" id="btn-export">
                                <i class="fa-solid fa-download"></i> Descargar Excel
                            </a>
                        </div>

                        <!-- Import Card -->
                        <div class="card action-card glass-panel">
                            <div class="action-icon success">
                                <i class="fa-solid fa-file-import"></i>
                            </div>
                            <h3>Importar Citas Agendadas</h3>
                            <p>Suba el archivo Excel devuelto por la clínica con las fechas y médicos asignados.</p>

                            <form id="form-import" class="import-form">
                                <div class="file-drop-area" id="file-drop-area">
                                    <i class="fa-solid fa-cloud-arrow-up"></i>
                                    <span class="file-msg">Arrastre el archivo o haga clic aquí</span>
                                    <input type="file" id="archivo_excel" name="archivo_excel" accept=".xlsx" required>
                                </div>
                                <button type="submit" class="btn btn-success" id="btn-import-submit"><i
                                        class="fa-solid fa-upload"></i> Procesar Archivo</button>
                                <div id="import-msg" class="msg-box"></div>
                            </form>
                        </div>
                    </div>
                </section>

                <!-- View: Consult Appointments -->
                <section id="view-consult" class="view-section">
                    <div class="card glass-panel list-card">
                        <div class="list-header">
                            <h2>Listado de Pacientes y Citas</h2>
                            <div class="list-filters">
                                <select id="filter-estado" class="btn-select">
                                    <option value="all">Todos los Estados</option>
                                    <option value="PENDIENTE">Pendientes de Agenda</option>
                                    <option value="AGENDADA">Citas Agendadas</option>
                                </select>
                                <button class="btn btn-secondary" id="btn-refresh-list"><i
                                        class="fa-solid fa-rotate-right"></i> Actualizar</button>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table class="premium-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Paciente</th>
                                        <th>Especialidad</th>
                                        <th>Estado</th>
                                        <th>Fecha y Hora</th>
                                        <th>Médico</th>
                                    </tr>
                                </thead>
                                <tbody id="table-body-citas">
                                    <!-- Rows populated via JS -->
                                    <tr>
                                        <td colspan="6" class="text-center">Cargando datos...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    </div>

    <!-- Notification Toast Container -->
    <div id="toast-container" class="toast-container"></div>

    <script src="<?php echo constant('URL'); ?>public/js/app.js"></script>
</body>

</html>
         

                <!-- View: Excel Export / Import -->
                