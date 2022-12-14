<!DOCTYPE html>
<html lang="es">
<head>
<link rel="stylesheet" href="../css/reportStyles.css">
<title>Catalogo de Conocimientos</title>
<meta charset="UTF-8">
<h1>Conocimientos por Vacante</h1>
</head>
<body>

<?php
$vacante=$_GET["Vacante"];
$nombre=$_GET["Nombre"];
$empresa=$_GET["Empresa"];

require 'arhsi_connect.php';

$query="SELECT Con_req.clv_conocim, conocimientos.cono_desc, Con_req.nivel_conocim, Con_req.exp_anio_min, Con_req.exp_mes_min FROM Con_req 
LEFT JOIN conocimientos ON conocimientos.clv_conocim = Con_req.clv_conocim
WHERE Con_req.clv_vacante='$vacante' 
ORDER BY Con_req.clv_conocim";

$response=mysqli_query($dbc,$query);
if($response)
	{
	$f=Date("d-m-Y");
  $nivel = ["","Bajo","Medio","Alto"];
    echo "<div>$empresa</div>";
    echo "<div>Vacante: $vacamte - $nombre</div>";
	echo "<div>Fecha reporte: $f</div>";
	echo '<table>
	<tr><td align="center" font="./arial"><b>Clave</b> </td>
        <td align="left" font="./arial"><b>Nombre</b> </td>
        <td align="center" font="./arial"><b>Nivel</b> </td>
        <td align="center" font="./arial"><b>Años de exp.</b> </td>
        <td align="center" font="./arial"><b>Meses de exp.</b> </td>
        </tr></div>';

	while($row = mysqli_fetch_array($response))
		{
      $row[2]=$nivel[$row[2]];

      echo '<tr><td align="center"  font="arial">'.
	       $row[0] .'</td><td align="left" >'.
           $row[1] .'</td><td align="center" >'.
           $row[2] .'</td><td align="center" >'.
           $row[3] .'</td><td align="center" >'.
	       $row[4] .'</td></tr>';
        }
    echo '</table>';
  } 
else {
	echo 'Reporte vacio, no se puede emitir la consulta<br>';
	mysqli_error($dbc);
	}

mysqli_close($dbc);
?>
</body>
</html>