<?php

require 'arhsi_connect.php';
$query="SELECT * FROM Vacantes WHERE 1";
$response=@mysqli_query($dbc,$query);
if($response)
	{
	$f=Date("d-m-Y");
	echo "Reporte de fecha: $f";
	echo '<table align="left">
	<tr><td aling="left"font="./arial"><b>Puesto</b>     </td>
	<td align="left"    font="./arial"><b>Nivel</b>    </td>
	<td align="left"    font="./arial"><b>Empresa</b>    </td>
	<td align="left"    font="./arial"><b>Requisitos</b>    </td>
	<td align="left"    font="./arial"><b>Funciones</b>     </td>
	<td align="center"  font="./arial"><b>Lugar</b>   </td>
	<td align="left"  font="./arial"><b>Sueldo</b>   </td>
	<td align="center"  font="./arial"><b>Fecha</b>   </td>
	<td align="left"    font="./arial"><b>Estatus</b>    </td>
	<td align="left"    font="./arial"><b>Clave</b></td></tr>';


	while($row = mysqli_fetch_array($response))
		{
                $fecha = date('d F, Y', strtotime($row['Fecha']));
		echo '<tr><td align="left"  font="arial">'.
		$row['Puesto']     .'</td><td align="left" >'.
		$row['Nivel']      .'</td><td align="center" >'.
		$row['Empresa']    .'</td><td align="left" >'.
		$row['Requisitos'] .'</td><td align="left" >'.
		$row['Funciones']  .'</td><td align="left" >'.
		$row['Lugar']      .'</td><td align="center" >'.
		$row['Sueldo']     .'</td><td align="left" >'.
		$fecha             .'</td><td align="left" >'.
		$row['Estatus']    .'</td><td align="center" >'.
		$row['Clave']      .'</td></tr>';
		}
	echo '</table>';
	} 
else {
	echo 'Reporte vacio, no se puede emitir la consulta<br>';
	echo mysqli_error($dbc);
	}

/* mysqli_close($dbc); */

?>