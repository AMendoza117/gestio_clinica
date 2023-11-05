<?php
// Incluir el archivo de conexión a la base de datos
include 'database.php';

// Datos del formulario de inicio de sesión
$usuario = $_POST['username'];
$contrasena = $_POST['password'];

// Consulta para verificar las credenciales del usuario
$consulta = "SELECT * FROM usuarios WHERE username = '$usuario' AND password = '$contrasena'";
$resultado = $conexion->query($consulta);

if ($resultado->num_rows > 0) {
    // Las credenciales son válidas, el usuario ha iniciado sesión con éxito
    $fila = $resultado->fetch_assoc();
    $response = [
        'success' => true,
        'role' => $fila['role'] // Puedes devolver el rol del usuario
    ];
} else {
    // Las credenciales no son válidas, el inicio de sesión ha fallado
    $response = [
        'success' => false
    ];
}

// Devolver la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);

$conexion->close();
?>
