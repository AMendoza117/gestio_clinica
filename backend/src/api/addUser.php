<?php
// Incluir el archivo de conexión a la base de datos
include 'database.php';

// Datos del formulario de registro (debe pasarse en el cuerpo de la solicitud POST)
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$username = $request->username;
$password = $request->password;
$nombre = $request->nombre;
$apellidos = $request->apellidos;
$role = $request->role;

// Hash de la contraseña
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Insertar el nuevo usuario en la base de datos
$consulta = "INSERT INTO usuarios (username, password, nombre, apellidos, role) VALUES ('$username', '$hashed_password', '$nombre', '$apellidos', $role)";

if (mysqli_query($con, $consulta)) {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false]);
}

$con->close();
?>