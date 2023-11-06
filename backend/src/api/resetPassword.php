<?php
// Incluir el archivo de conexión a la base de datos
include 'database.php';

// Obtener los datos de la solicitud POST desde Angular
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Obtener el nombre de usuario (username) del usuario al que se le restablecerá la contraseña
$username = $request->username;

// Contraseña por defecto (cámbiala según tus necesidades)
$defaultPassword = 'gestion';

// Generar el hash SHA-256 de la contraseña por defecto
$hashedPassword = hash('sha256', $defaultPassword);

// Consulta para actualizar la contraseña del usuario
$sql = "UPDATE usuarios SET password = ? WHERE username = ?";

// Preparar la consulta
if ($stmt = $con->prepare($sql)) {
    // Enlazar los parámetros
    $stmt->bind_param("ss", $hashedPassword, $username);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        $response = [
            'success' => true,
            'message' => 'Contraseña restablecida con éxito.'
        ];
    } else {
        $response = [
            'success' => false,
            'message' => 'Error al restablecer la contraseña.'
        ];
    }

    // Cerrar la declaración
    $stmt->close();
} else {
    $response = [
        'success' => false,
        'message' => 'Error en la preparación de la consulta.'
    ];
}

// Devolver la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);

// Cerrar la conexión a la base de datos
$con->close();
?>
