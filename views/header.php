<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recepción Clínica - Materneal Care</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="<?php echo constant('URL'); ?>public/css/style.css">
    <script  src="<?php echo constant('URL'); ?>public/js/jquery.min.js"></script>
    
</head>
<body>
    <div class="app-container">
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
            <div class="sidebar-header">

                <i class="fas fa-ambulance"></i>
                <h2>Issste Umf Caborca</h2>
            </div>
            <nav class="sidebar-nav">
                <a class="nav-btn active" href="<?php echo constant('URL'); ?>panel"><i class="fa-solid fa-chart-pie"></i> Panel
                    Principal</a>
                <a class="nav-btn" href="<?php echo constant('URL'); ?>catalogo"><i class="fa-solid fa-user-plus"></i> Catalogo
                    de Pacientes</a>
                <button class="nav-btn" data-target="view-excel"><i class="fa-solid fa-file-excel"></i> Exportar /
                    Importar</button>
                <button class="nav-btn" data-target="view-consult"><i class="fa-solid fa-calendar-check"></i> Consultar
                    Citas</button>
            </nav>  
            <div class="sidebar-footer">
                <p>&copy; 2026 Issste Umf Caborca</p>
            </div>
        </aside>
        <!-- Main Content Area -->
        <main class="main-content">
            <!-- Header -->
            <header class="top-header">
                <div class="header-title">
                    <h1 id="page-title">Panel Principal</h1>
                </div>
                <div class="header-user">
                    <span><i class="fa-solid fa-user-nurse"></i> Recepción</span>
                </div>
            </header>

            <!-- Views -->
            <div class="views-container">

                
