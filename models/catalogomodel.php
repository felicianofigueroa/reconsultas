<?php
class CatalogoModel extends Model{
    public function __construct(){
        parent::__construct();
    }
    
    public function getBYRFC($rfc){

        try {
            $stmt = $this->db->connect()->prepare("SELECT * FROM personas WHERE rfc LIKE ? ORDER BY id DESC LIMIT 10");
            $stmt->execute(["%$rfc%"]);
            $results = $stmt->fetchAll();
            echo json_encode(['success' => true, 'data' => $results]);
        } catch(Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Error al buscar RFC: ' . $e->getMessage()]);
        }
    }

    public function insert(){

        $data = json_decode(file_get_contents('php://input'), true);
        
        if(!$data || empty($data['nombre']) || empty($data['rfc'])) {
            echo json_encode(['success' => false, 'message' => 'Faltan datos requeridos.']);
            exit;
        }
        
        if (empty($data['elid'])){
            try {
                $stmt = $this->db->connect()->prepare("INSERT INTO citas_clinica (paciente_nombre, paciente_rfc, paciente_telefono, paciente_diagnostico, especialidad_medica) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([
                    $data['nombre'],
                    $data['rfc'],
                    $data['telefono'],
                    $data['diagnostico'],
                    $data['especialidad']
                ]);
                
                echo json_encode(['success' => true, 'message' => 'uffff registrado correctamente']);
            } catch(Exception $e) {
                echo json_encode(['success' => false, 'message' => 'Error al registraDORr: ' . $e->getMessage()]);
            }
        }
        else{
            $id = $data['elid'];
            try {
                $stmt = $this->db->connect()->prepare("UPDATE citas_clinica SET paciente_nombre = ?, paciente_rfc = ?, paciente_telefono = ?, paciente_diagnostico = ?, especialidad_medica = ? WHERE id = ?");
                $stmt->execute([
                    $data['nombre'],
                    $data['rfc'],
                    $data['telefono'],
                    $data['diagnostico'],
                    $data['especialidad'],
                    $id
                ]);
                echo json_encode(['success' => true, 'message' => 'Paciente actualizado correctamente']);
            } catch(Exception $e) {
                echo json_encode(['success' => false, 'message' => 'Error al actualizar: ' . $e->getMessage()]);
            }
        }
    }

    public function getAll(){
        try {
            $stmt = $this->db->connect()->prepare("SELECT * FROM citas_clinica ORDER BY id DESC");
            $stmt->execute();
            $results = $stmt->fetchAll();
            echo json_encode(['success' => true, 'data' => $results]);
        } catch(Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Error al buscar RFC: ' . $e->getMessage()]);
        }
    }
}  
?>