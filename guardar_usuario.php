<?php
// Obtener los datos del cuerpo de la solicitud JSON
$data = json_decode(file_get_contents("php://input"));

// Verificar si los datos están establecidos
if (isset($data->edad) && isset($data->nickname)) {
    $edad = $data->edad;
    $nickname = $data->nickname;

    // Aquí deberías agregar la lógica para guardar los datos en la base de datos
    // y verificar si la edad es válida. Por ahora, simulamos que siempre es exitoso.
    if ($edad >= 13) {
        $response = array("success" => true);
    } else {
        $response = array("success" => false);
    }
} else {
    $response = array("success" => false);
}

header('Content-Type: application/json');
echo json_encode($response);
?>