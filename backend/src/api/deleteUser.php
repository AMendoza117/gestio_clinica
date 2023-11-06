<?php
// Incluir el archivo de conexión a la base de datos
include 'database.php';

// Datos del formulario (debe pasarse en el cuerpo de la solicitud POST)
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$username = $request->username;

// Consulta para eliminar el usuario por su nombre de usuario
$consulta = "DELETE FROM usuarios WHERE username = '$username'";

if (mysqli_query($con, $consulta)) {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false]);
}

$con->close();
?>
