<?php
// Incluir el archivo de conexión a la base de datos
include 'database.php';

// Consulta para obtener todos los usuarios
$consulta = "SELECT * FROM usuarios WHERE username != 1";

if ($result = mysqli_query($con, $consulta)) {
  $users = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $users[] = $row;
  }

  echo json_encode($users);
} else {
  http_response_code(404);
}

$con->close();
?>
