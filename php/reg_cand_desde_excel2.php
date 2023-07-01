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
// Carga de archivo excel puro sin convertir, usando librerias.
//setlocale(LC_ALL,"es_ES");
setlocale(LC_CTYPE,'POSIX');
//setlocale(LC_MONETARY,'en_US');
//actualiza_cand_x_vac();  // Actualiza tabla de Cand_x_vac por emergencia

header('Content-Type: text/html; charset=utf-8');
echo("<h1><p style='text-align:center; color: #3633FF; font-family: arial;'>CARGA DE ARCHIVO EXCEL A BASE DE DATOS</p></h1>");
echo("<div style='text-align:left; color: #1B1B24; font-family: arial;'>");

require_once('excel_reader2.php');
require_once('SpreadsheetReader.php');

if (isset($_POST['import']))
    {
    $allowedFileType = ['application/vnd.ms-excel','text/xls','text/xlsx','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  
    if(in_array($_FILES['file']['type'],$allowedFileType))
        {
        $targetPath = '../archivos/'.$_FILES['file']['name'];
        move_uploaded_file($_FILES['file']['tmp_name'], $targetPath);
        
        $Reader = new SpreadsheetReader($targetPath);
        $i3=0;
        
        $sheetCount = count($Reader->sheets());
        for($i=0;$i<$sheetCount;$i++)  // Todas las lineas
        {
            $Reader->ChangeSheet($i);
            $i2=0; // Contador de lineas
            foreach ($Reader as $Row)  // Todos los campos por linea, si es la linea 2 se refiere a los datos de los candidatos
            {
                $campos = count($Row);
                $lineax1 = "";

                for($i5=0;$i5<$campos;$i5++){
                    $c1 = "";
                    if(isset($Row[$i5])) {
                        $c1 = $Row[$i5];
                        $lineax1 = $lineax1." | ".$c1;
                        }
                    }

                    if($i2 ==1 ){
                        echo("Campos de encabezados: (".$campos.")<br>Encabezado: ".$lineax1."<br>");
                        }                

                    if($i2>1){
                        $i3++;
                        echo "<p style='font-weight: bold; color: black;'>Candidato: ".$Row[0].'</p>';
                        echo "<p style='font-weight: normal;'>Línea: ".$lineax1.'</p>';
                        graba_registro($Row);
                    }
                $i2++;
             }
         }
         echo "<p style='text-align:center; color: black;'>Total de registros: ".$i3.'</p>';
  }
  else
  { 
        $type = "error";
        $message = "El archivo enviado es invalido. Por favor vuelva a intentarlo";
  }
}

// Alta de registro de candidato nuevo en DB
function graba_registro($campo){
    echo("Campo 1: ".$campo[1]);
    $longitud = strlen($campo[4]);
    if($longitud < 1 ){
        echo("No tiene vacante asignada");
        return;
    }

    require 'arhsi_connect.php';

    $query="SELECT * FROM Candidatos WHERE (cand_tel1='$campo[1]' AND cand_tel2='$campo[2]')";
    $result = mysqli_query($dbc,$query);
    $numero_filas = mysqli_num_rows($result);

    if($numero_filas >0){
        actualiza($campo);
        return;
    }
    $estatus_cand ="1"; 

if(mysqli_stmt_prepare($stmt,"INSERT INTO Candidatos (cand_nom,cand_tel1,cand_tel2,cand_corr,clv_vacante,cand_fecha_nac,cand_direccion,cand_edad,cand_sdo_sol,cand_obs_reclu,clv_est_cand) 
VALUES (?,?,?,?,?,?,?,?,?,?,?)"))
{
	mysqli_stmt_bind_param($stmt,"sssssssssss",$campo[0],$campo[1],$campo[2],$campo[3],$campo[4],$campo[5],$campo[6],$campo[7],$campo[8],$campo[9],$estatus_cand);

    mysqli_stmt_execute($stmt);

	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		$candidato = mysqli_stmt_insert_id($stmt);
		echo "<p style='text-align:left; color: green;'>Candidato grabado: ".$campo[0].'</p>';
		$vacante=$campo[4];
		registroCand_x_vac($candidato,$vacante,$estatus_cand);
		} 
	else {
		echo "<p style='text-align:left; color: red;'>Error de grabacion: ".mysqli_error($dbc).'</p>';
		}
	mysqli_stmt_close($stmt);
	}
else {
	echo "<p style='text-align:left; color: red;'>Fallo acceso de DB</p>"; 
	}
	mysqli_close($dbc);
 }

echo("</div>");

// Alta de registro de candidato por vacante en DB
function registroCand_x_vac($candidato,$vacante,$estatus) {
//	$estatus="1";
if($estatus == null || $estatus == 0){
    $estatus = "1";
}
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
//(cand_nom,cand_tel1,cand_tel2,cand_corr,clv_vacante,cand_fecha_nac,cand_direccion,
//cand_edad,cand_sdo_sol,cand_obs_reclu) 

// Actualiza registro de Candidato en DB
function actualiza($campos){
    require 'arhsi_connect.php';

    if(mysqli_stmt_prepare($stmt,"UPDATE Candidatos SET cand_nom='$campos[0]', cand_tel2='$campos[2]',cand_corr='$campos[3]', clv_vacante='$campos[4]',cand_fecha_nac='$campos[5]',cand_direccion='$campos[6]',cand_edad='$campos[7]',cand_sdo_sol='$campos[8]',cand_obs_reclu='$campos[9]' WHERE (cand_tel1='$campos[1]' AND cand_tel2='$campos[2]')"))
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
            $vacante=$row[25];  // vacante
            $candidato=$row[0]; // candidato 
            $estatus=$row[19];  // estatus
            registroCand_x_vac($candidato,$vacante,$estatus);
        }
    }
    mysqli_free_result($result);
    return;
}
?>

