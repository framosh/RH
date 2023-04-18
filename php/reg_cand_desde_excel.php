<style>
.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.button2 {background-color: #008CBA;} /* Blue */
.button3 {background-color: #f44336;} /* Red */ 
.button4 {background-color: #e7e7e7; color: black;} /* Gray */ 
.button5 {background-color: #555555;} /* Black */
</style>

<?php
//setlocale(LC_ALL,"es_ES");
setlocale(LC_CTYPE,'POSIX');

// actualiza_cand_x_vac();  // Actualiza tabla de Cand_x_vac por emergencia

//setlocale(LC_MONETARY,'en_US');
header('Content-Type: text/html; charset=utf-8');
echo("<h1><p style='text-align:center; color: #3633FF; font-family: arial;'>CARGA DE ARCHIVO EXCEL A BASE DE DATOS</p></h1>");
echo("<div style='text-align:left; color: #1B1B24; font-family: arial;'>");

if (isset($_FILES['dataCandidato'])) {
    $archivo = "../archivos/".$_FILES["dataCandidato"]['name'];
    $temporal = $_FILES['dataCandidato']['tmp_name'];
    $tipo= $_FILES['dataCandidato']['type'];
    $tamanio = $_FILES['dataCandidato']['size'];
    $error = $_FILES['dataCandidato']['error'];
	$lineas = file($temporal);
	$registros = count($lineas);

	$rechazado = "#8C0719";
	$aprobado = "#218C07";
	$normal = "#0B0C0B";

	if($error == 0) {
		move_uploaded_file($temporal, $archivo);
		echo "<p style='text-align:left; color: black;'>Se sube el archivo: ".$archivo."<br>Renglones a procesar: ".$registros."</p>";
 	} else { 
		echo "<p style='text-align:left; color: black;'>Error en carga de archivo: ".$error."</p>";
		return;
	}

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
	chr(0xBB) => '&raquo;'
);

$cantidad_registros = count($lineas);
$cantidad_regist_agregados = ($cantidad_registros -2);
$i=0;
$registrosx=0;
$linea = array();
//foreach ($lineas as $linea)
for($i3=0;$i3<$registros;$i3++)
 {
	$linea=$lineas[$i3];
	$rechazado = "#8C0719";
	$aprobado = "#218C07";
	$normal = "#0B0C0B";
/*
	if($i ==2){
//		echo "<p style='font-weight: bold; color:'.$normal.';''".'>Encabezado: '.$linea.'</p>';
		$linea2 = str_replace("|",",",$linea);
		echo "<p style='font-weight: bold; color: black;'>Encabezado 2: ".$linea2."</p>";
		$valores="?";
		$eses="\"s";
		$cadena_campos="";
		$i2=0;
		$linea3="";
		$cadena_campos="$"."campo"."[".$i2."]";

		$encabezado = explode('|',$linea);
        $encabezados = count($encabezado);
		$linea3 = $encabezado[0];
		$encabezado2 = $encabezados;
        for($i2=0;$i2<$encabezado2;$i2++){
			if(empty($encabezado[$i2])){
				$encabezado[$i2] = '';
			} else {
				if($i2 >0){
					$linea3 = $linea3.','.$encabezado[$i2];
					$valores = $valores .',?';
					$eses = $eses .'s';
					$cadena_campos=$cadena_campos.','.'$'.'campo'.'['.$i2.']';
				}
			}
        }
		$eses = $eses."\"";
		echo "<p style='font-weight: bold; color: black;'>Encabezado 3: ".$linea3.'</p>';
		echo "<p style='font-weight: bold; color: black;'>Valores: ".$valores."  Eses: ".$eses.'</p>';
		echo "<p style='font-weight: bold; color: black;'>Cadena campos: ".$cadena_campos.'</p>';
	}
	*/
	$linea2 = html_entity_decode(mb_convert_encoding(strtr($linea, $map), 'UTF-8', 'ISO-8859-2'), ENT_QUOTES, 'UTF-8');
	$longitud = strlen($linea2);
	$linea2 = str_replace("\"","",$linea2);

	$encabezados =0;

	if($i ==1 ){
		$separaciones = explode('|',$linea2);
		$encabezados = count($separaciones);

		echo("Campos de encabezados: (".$encabezados.")<br>Encabezado: ".$linea2."<br>");
		}

    if(($i > 1) && ($longitud > $encabezados)){
/*
		$cadenax=str_split($linea2);
		$longitud2 = count($cadenax);
		$longitud2--;
		$cadena2="";
	
		for($ix=0;$ix<$longitud2;$ix++){
			$letra=$cadenax[$ix];
			$asciix = ord($letra);
			if($asciix == 10){ $letra=" ";}
			$cadena2=$cadena2.$letra;
		}
		$linea2 = $cadena2;
		*/

        $campo = explode('|',$linea2);
        $campos = count($campo);
        for($i2=0;$i2<$campos;$i2++){
			if(empty($campo[$i2])){
				$campo[$i2] = '';
			} 
        }

		$registrosx++;

		echo "<p style='font-weight: bold; color: black;'>Candidato: ".$campo[0].'</p>';
		echo "<p style='font-weight: normal;'>Línea: ".$linea2.'</p>';	
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
//$inserta = "\"INSERT INTO Candidatos (".$linea3.") VALUES (".$valores.")\"";
//echo("Inserta: ".$inserta);
//echo("<br>Campos: ".$cadena_campos);

//if(mysqli_stmt_prepare($stmt,$inserta))
if(mysqli_stmt_prepare($stmt,"INSERT INTO Candidatos (cand_nom,cand_tel1,cand_tel2,cand_corr,clv_vacante) 
VALUES (?,?,?,?,?)"))
{
	mysqli_stmt_bind_param($stmt,"sssss",$campo[0],$campo[1],$campo[2],$campo[3],$campo[4]);
//	mysqli_stmt_bind_param($stmt,$eses,$cadena_campos);

    mysqli_stmt_execute($stmt);

	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		$candidato = mysqli_stmt_insert_id($stmt);
		echo "<p style='text-align:left; color: green;'>Candidato grabado: ".$campo[0].'</p>';
		$vacante=$campo[4];
		registroCand_x_vac($candidato,$vacante);	
		} 
	else {
		echo "<p style='text-align:left; color: red;'>Error de grabacion: ".mysqli_error($dbc).'</p>';
		}
	mysqli_stmt_close($stmt);
	}
else {
	echo "<p style='text-align:left; color: red;'>Fallo acceso de DB</p>"; 
	}
//	echo ('<div>'. $i. "). " .$linea.'</div>');
    $i++;
	mysqli_close($dbc);
 }

	 echo "<p style='text-align:center; color: black;'>Total de registros: ".$registrosx.'</p>';
 }

 echo("</div>");
/*
function caracter($cadena,$longitud){
	$cadenax=str_split($cadena);
	$longitud2 = count($cadenax);
	$cadena2="";

	for($i=0;$i<$longitud2;$i++){
		$letra=char($cadenax[$i]);
		$asciix = ord($letra);
		if($asciix < 33 || $asciix >169){ $letra=$asciix;}
		$cadena2=$cadena2+" - ("+$letra+"-"+$asciix+")";
	}
	
	return $cadena2;
}
*/

function registroCand_x_vac($candidato,$vacante) {
	global $campo;
	$rechazado = "#8C0719";
	$aprobado = "#218C07";
	$normal = "#0B0C0B";

	$estatus="1";
	require 'arhsi_connect.php';

	$query="SELECT * FROM Cand_x_vac WHERE clv_vacante='$vacante' AND cand_key='$candidato' AND estatus='1'";
    $result = mysqli_query($dbc,$query);
    $numero_filas = mysqli_num_rows($result);
    
    if($numero_filas ==0){
	if(mysqli_stmt_prepare($stmt,"INSERT INTO Cand_x_vac (clv_vacante, cand_key, estatus) VALUES (?,?,?)"))
		{
		mysqli_stmt_bind_param($stmt,"sss",$vacante,$candidato,$estatus);
		mysqli_stmt_execute($stmt);
	
		$affected_rows = mysqli_stmt_affected_rows($stmt);
	
		if($affected_rows ==1)
			{
				echo "<p style='text-align:left; color: green;'>Candidato X Vacante grabado: ".$campo[0].'</p>';
			} else {
				echo "<p style='text-align:left; color: red;'>Error de grabacion en Cand_x_vac: ".mysqli_error($dbc).'</p>';
				}
		mysqli_stmt_close($stmt);
		mysqli_close($dbc);
		} else {
			echo "<p style='text-align:left; color: red;'>Fallo la grabación de datos del candidato</p>";
		}
	}
}

function actualiza($campos){
	$rechazado = "#8C0719";
	$aprobado = "#218C07";
	$normal = "#0B0C0B";

    require 'arhsi_connect.php';

    if(mysqli_stmt_prepare($stmt,"UPDATE Candidatos SET cand_nom='$campos[0]', cand_tel2='$campos[2]', 
	cand_corr='$campos[3]', clv_vacante='$campos[4]' WHERE cand_tel1='$campos[1]'"))
	{
	   mysqli_stmt_execute($stmt);
	   $affected_rows = mysqli_stmt_affected_rows($stmt);
           if($affected_rows ==1)
	          {
				echo "<p style='text-align:left; color: green;'>Candidato actualizado: ".$campos[0].'</p>';
			}
           else { 
			echo "<p style='text-align:left; color: red;'>Fallo la actualización de datos del candidato: ".$campos[0].'</p>';
            }
           mysqli_stmt_close($stmt);
        }
   else {
		echo "<p style='text-align:left; color: red;'>Fallo apertura de la DB de Candidatos para la actualización</p>";
		}
	mysqli_close($dbc);
	}
	echo("<br><button class='button button3' type='submit' onclick='history.go(-1);'>Regresar a pantalla anterior</button>");

	//Restituye Cand_x_vac 
function actualiza_cand_x_vac(){
    require 'arhsi_connect.php';
    $query="SELECT * FROM Candidatos WHERE 1";
    $result = mysqli_query($dbc,$query);
    $numero_filas = mysqli_num_rows($result);
    
    if($numero_filas >0){
        while($row = mysqli_fetch_row($result)) {
            $est2 = $row[19];
/*
			if($est2 == null){
				$est2 = "1";
            }
*/
            $vacante=$row[25];  // vacante
            $candidato=$row[0]; // candidato 
            $estatus=$est2;  // estatus
            registroCand_x_vac($candidato,$vacante);
        }
    }
    mysqli_free_result($result);
    return;
}
?>

