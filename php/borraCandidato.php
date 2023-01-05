<?php
$candidato=$_GET["candidato"];
$condicion = "cand_key='$candidato'";

require 'arhsi_connect.php';

$query="SELECT * FROM Candidatos WHERE $condicion";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    $query2="DELETE FROM Candidatos WHERE $condicion";
    $result2 = mysqli_query($dbc,$query2);
    if($result2){
        echo("Candidato borrado: ".$candidato);
        borraCandXvac($candidato);
        borraConocimientos($candidato);
        borraEscolaridad($candidato);
        borraExperiencia($candidato);
        mysqli_close($dbc);
        } else {
            echo("No se logro borrar el candidato: ".$candidato);
            }
    } else {
            echo("No existe el registro a borrar: ".$candidato);
            }

    function borraCandXvac($candidato){
        global $dbc;
        $query="SELECT * FROM Cand_x_vac WHERE cand_key='$candidato'";

        $result = mysqli_query($dbc,$query);
        $numero_filas = mysqli_num_rows($result);
        
        if($numero_filas >0){
            $query2="DELETE FROM Cand_x_vac WHERE cand_key='$candidato'";
            $result2 = mysqli_query($dbc,$query2);
            if($result2){
                echo("Candidato por vacante borrado: ".$candidato);
                borraCandXvac($candidato);
                } else {
                    echo("No se logro borrar el candidato por vacante: ".$candidato);
                    }
            } else {
                    echo("No existe el registro a borrar el candidato por vacante: ".$candidato);
                    }
        }

    function borraConocimientos($candidato){
        global $dbc;
            $query="SELECT * FROM Con_candidato WHERE cand_key='$candidato'";
    
            $result = mysqli_query($dbc,$query);
            $numero_filas = mysqli_num_rows($result);
            
            if($numero_filas >0){
                $query2="DELETE FROM Con_candidato WHERE cand_key='$candidato'";
                $result2 = mysqli_query($dbc,$query2);
                if($result2){
                    echo("Conocimientos por Candidato borrados: ".$candidato);
                    borraCandXvac($candidato);
                    } else {
                        echo("No se logro borrar los Conocimientos por candidato: ".$candidato);
                        }
                } else {
                        echo("No existe el registro a borrar los Conocimientos por candidato: ".$candidato);
                        }
            }

    function borraEscolaridad($candidato){
        global $dbc;
                $query="SELECT * FROM Edu_xcand WHERE cand_key='$candidato'";
        
                $result = mysqli_query($dbc,$query);
                $numero_filas = mysqli_num_rows($result);
                
                if($numero_filas >0){
                    $query2="DELETE FROM Edu_xcand WHERE cand_key='$candidato'";
                    $result2 = mysqli_query($dbc,$query2);
                    if($result2){
                        echo("Educacion por Candidato borrados: ".$candidato);
                        borraCandXvac($candidato);
                        } else {
                            echo("No se logro borrar la Educacion por candidato: ".$candidato);
                            }
                    } else {
                            echo("No existe el registro a borrar la Educacion por candidato: ".$candidato);
                            }
                }

    function borraExperiencia($candidato){
        global $dbc;
            $query="SELECT * FROM Experiencia WHERE cand_key='$candidato'";
            
                    $result = mysqli_query($dbc,$query);
                    $numero_filas = mysqli_num_rows($result);
                    
                    if($numero_filas >0){
                        $query2="DELETE FROM Experiencia WHERE cand_key='$candidato'";
                        $result2 = mysqli_query($dbc,$query2);
                        if($result2){
                            echo("Experiencia por Candidato borradas: ".$candidato);
                            borraCandXvac($candidato);
                            } else {
                                echo("No se logro borrar la Experiencia por candidato: ".$candidato);
                                }
                        } else {
                                echo("No existe el registro a borrar la Experiencia por candidato: ".$candidato);
                                }
                    }
?>