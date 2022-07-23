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
//setlocale(LC_MONETARY,'en_US');
header('Content-Type: text/html; charset=utf-8');
echo("<h1><p style='text-align:center; color: #3633FF; font-family: arial;'>CARGA DE ARCHIVO EXCEL A BASE DE DATOS</p></h1>");
echo("<div style='text-align:left; color: #1B1B24; font-family: arial;'>");

require_once('excel_reader2.php');
require_once('SpreadsheetReader.php');

if (isset($_POST['import']))
    {
//        echo("Entra a isset");
    $allowedFileType = ['application/vnd.ms-excel','text/xls','text/xlsx','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  
    if(in_array($_FILES['file']['type'],$allowedFileType))
        {
  //          echo("<br>Determina archivo");
        $targetPath = '../archivos/'.$_FILES['file']['name'];
        move_uploaded_file($_FILES['file']['tmp_name'], $targetPath);
        
        $Reader = new SpreadsheetReader($targetPath);
        $i3=0;
        
        $sheetCount = count($Reader->sheets());
        for($i=0;$i<$sheetCount;$i++)  // Todas las lineas
        {
    //        echo("<br>Determina registros en linea<br>");
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


function graba_registro($campo){
    echo("Campo 1: ".$campo[1]);

    require 'arhsi_connect.php';

    $query="SELECT * FROM Candidatos WHERE cand_tel1='$campo[1]'";
    $result = mysqli_query($dbc,$query);
    $numero_filas = mysqli_num_rows($result);

    if($numero_filas >0){
        actualiza($campo);
        return;
    } 

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
		registroCand_x_vac($candidato,$vacante,$campo);
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

function registroCand_x_vac($candidato,$vacante,$campo) {

	$estatus="1";
	require 'arhsi_connect.php';

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

function actualiza($campos){

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
?>

