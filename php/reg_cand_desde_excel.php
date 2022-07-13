<?php
//setlocale(LC_ALL,"es_ES");
setlocale(LC_CTYPE,'POSIX');
//setlocale(LC_MONETARY,'en_US');
header('Content-Type: text/html; charset=utf-8');
echo("<h1><p style='text-align:center; color: #3633FF; font-family: Arial'>CARGA DE ARCHIVO DE EXCEL A BASE DE DATOS</p></h1>");
echo("<div style='text-align:left; color: #1B1B24; font-family: Arial'>");

if (isset($_FILES['dataCandidato'])) {
    $archivo = "../archivos/".$_FILES["dataCandidato"]['name'];
    $temporal = $_FILES['dataCandidato']['tmp_name'];
    $tipo= $_FILES['dataCandidato']['type'];
    $tamanio = $_FILES['dataCandidato']['size'];
    $error = $_FILES['dataCandidato']['error'];
	$lineas = file($temporal);
	$registros = count($lineas);

$rechazado = "red";
$aprobado = "gren";
$normal = "black";

	if($error == 0) {
		move_uploaded_file($temporal, $archivo);
		echo '<p style="text-align:left; color:'.$normal.';">Se sube el archivo: '.$archivo."<br>Registros: ".$registros.'</p>';
 	} else { 
		echo '<p style="text-align:left; color:'.$rechazado.';">Error en carga de archivo: '.$error.'</p>';
		return;
	}

$i=0;
$map = array(
	chr(0x8A) => chr(0xA9),
	chr(0x8C) => chr(0xA6),
	chr(0x8D) => chr(0xAB),
	chr(0x8E) => chr(0xAE),
	chr(0x8F) => chr(0xAC),
	chr(0x9C) => chr(0xB6),
	chr(0x9D) => chr(0xBB),
	chr(0xA1) => chr(0xB7),
	chr(0xA5) => chr(0xA1),
	chr(0xBC) => chr(0xA5),
	chr(0x9F) => chr(0xBC),
	chr(0xB9) => chr(0xB1),
	chr(0x9A) => chr(0xB9),
	chr(0xBE) => chr(0xB5),
	chr(0x9E) => chr(0xBE),
	chr(0x80) => '&euro;',
	chr(0x82) => '&sbquo;',
	chr(0x84) => '&bdquo;',
	chr(0x85) => '&hellip;',
	chr(0x86) => '&dagger;',
	chr(0x87) => '&Dagger;',
	chr(0x89) => '&permil;',
	chr(0x8B) => '&lsaquo;',
	chr(0x91) => '&lsquo;',
	chr(0x92) => '&rsquo;',
	chr(0x93) => '&ldquo;',
	chr(0x94) => '&rdquo;',
	chr(0x95) => '&bull;',
	chr(0x96) => '&ndash;',
	chr(0x97) => '&mdash;',
	chr(0x99) => '&trade;',
	chr(0x9B) => '&rsquo;',
	chr(0xA6) => '&brvbar;',
	chr(0xA9) => '&copy;',
	chr(0xAB) => '&laquo;',
	chr(0xAE) => '&reg;',
	chr(0xB1) => '&plusmn;',
	chr(0xB5) => '&micro;',
	chr(0xB6) => '&para;',
	chr(0xB7) => '&middot;',
	chr(0xBB) => '&raquo;',
);

foreach ($lineas as $linea) {
	$rechazado = "red";
	$aprobado = "green";
	$normal = "black";

    $cantidad_registros = count($lineas);
    $cantidad_regist_agregados = ($cantidad_registros -2);

    if($i > 1){
        $campo = explode('|',$linea);
        $campos = count($campo);
        for($i2=0;$i2<$campos;$i2++){
			if(empty($campo[$i2])){
				$campo[$i2] = '';
			} else {
				$campo[$i2] = html_entity_decode(mb_convert_encoding(strtr($campo[$i2], $map), 'UTF-8', 'ISO-8859-2'), ENT_QUOTES, 'UTF-8');
			}
        }
		$linea = html_entity_decode(mb_convert_encoding(strtr($linea, $map), 'UTF-8', 'ISO-8859-2'), ENT_QUOTES, 'UTF-8');
		echo("<br><p style='font-weight: bold; color:'.$normal.';'>Candidato: ".$campo[0]."</p><p style='font-weight: normal'>Línea: ".$linea."</p>");
    } else {
		$i++;
		continue;
	}

	require 'arhsi_connect.php';

    $query="SELECT * FROM Candidatos WHERE cand_tel1='$campo[1]'";
    $result = mysqli_query($dbc,$query);
    $numero_filas = mysqli_num_rows($result);

    if($numero_filas >0){
        actualiza($campo);
		$i++;
        continue;
    } 

/*
if(mysqli_stmt_prepare($stmt,"INSERT INTO Candidatos (cand_nom,cand_tel1,cand_tel2,cand_corr,cand_direccion,
cand_edad,cand_sdo_sol,clv_vacante,cand_sdo_ult,cand_ult_trab,cand_ult_pue,cand_obs_reclu) 
VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssssssssssss",$campo[0],$campo[1],$campo[2],$campo[3],$campo[4],
    $campo[5],$campo[6],$campo[7],$campo[8],$campo[9],$campo[10],$campo[11]);
*/

if(mysqli_stmt_prepare($stmt,"INSERT INTO Candidatos (cand_nom,cand_tel1,cand_tel2,cand_corr,clv_vacante) 
VALUES (?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sssss",$campo[0],$campo[1],$campo[2],$campo[3],$campo[4]);

    mysqli_stmt_execute($stmt);

	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		$candidato = mysqli_stmt_insert_id($stmt);
		echo '<p style="text-align:left; color:'.$aprobado.';">Candidato grabado: '.$campo[0].'</p>';
		$vacante=$campo[4];
		registroCand_x_vac($candidato,$vacante);	
		} 
	else {
		echo '<p style="text-align:left; color:'.$rechazado.';">Error de grabacion: '.mysqli_error($dbc).'</p>';
		}
	mysqli_stmt_close($stmt);
	}
else {
	echo '<p style="text-align:left; color:'.$rechazado.';">'."Fallo la grabación de datos".'</p>'; 
	}
	echo ('<div>'. $i. "). " .$linea.'</div>');
    $i++;
	mysqli_close($dbc);
 }

	 echo '<p style="text-align:center; color:'.$normal.';">Total de registros: '.$cantidad_regist_agregados.'</p>';
 }

 echo("</div>");

function registroCand_x_vac($candidato,$vacante) {
	global $normal, $rechazado, $aprobado; 
	$estatus="1";
	require 'arhsi_connect.php';

	if(mysqli_stmt_prepare($stmt,"INSERT INTO Cand_x_vac (clv_vacante, cand_key, estatus) VALUES (?,?,?)"))
		{
		mysqli_stmt_bind_param($stmt,"sss",$vacante,$candidato,$estatus);
		mysqli_stmt_execute($stmt);
	
		$affected_rows = mysqli_stmt_affected_rows($stmt);
	
		if($affected_rows ==1)
			{
				echo '<p style="text-align:left; color:'.$aprobado.';">Candidato X Vacante grabado: '.$campos[0].'</p>';
			} else {
				echo '<p style="text-align:left; color:'.$rechazado.';">Error de grabacion en Cand_x_vac: '.mysqli_error($dbc).'</p>';
				}
		mysqli_stmt_close($stmt);
		mysqli_close($dbc);
		} else {
			echo '<p style="text-align:left; color:'.$rechazado.';">Fallo la grabación de datos del candidato '.'</p>';
		}
}

function actualiza($campos){
	global $normal, $rechazado, $aprobado; 

    require 'arhsi_connect.php';

    if(mysqli_stmt_prepare($stmt,"UPDATE Candidatos SET cand_nom='$campos[0]', cand_tel2='$campos[2]', 
	cand_corr='$campos[3]', clv_vacante='$campos[4]' WHERE cand_tel1='$campos[1]'"))
	{
	   mysqli_stmt_execute($stmt);
	   $affected_rows = mysqli_stmt_affected_rows($stmt);
           if($affected_rows ==1)
	          {
				echo '<p style="text-align:left; color:'.$aprobado.';">Candidato actualizado: '.$campos[0].'</p>';
			}
           else { 
			echo '<p style="text-align:left; color:'.$rechazado.';">Fallo la actualización de datos del candidato: '.$campos[0].'</p>';
            }
           mysqli_stmt_close($stmt);
        }
   else {
	echo '<p style="text-align:left; color:'.$rechazado.';">Fallo apertura de la DB de Candidatos para la actualización'.'</p>';
}
	mysqli_close($dbc);
	}
?>

<button type="submit" onclick="history.go(-1);">Regresar a pantalla anterior</button>
