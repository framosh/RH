<?php
DEFINE('DB_USER','arhsi_arhsi01');
//DEFINE('DB_PASSWORD','arhsi6502');
//DEFINE('DB_PASSWORD','semH68@9');
DEFINE('DB_PASSWORD','Al8ry4#3');
DEFINE('DB_HOST','localhost:3306');
DEFINE('DB_NAME','arhsi01_reg');

$dbc = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);

if (mysqli_connect_errno()) 
	{ echo "Failed to connect to Maria DB: ".mysqli_connect_error(); }
else { /* echo "<br>Conectado a la base de datos<br>" ;*/
	$stmt=mysqli_stmt_init($dbc); 
	mysqli_set_charset($dbc,'utf8');
	}
?>