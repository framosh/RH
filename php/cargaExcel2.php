//Carga archivos de excel con datos de los candidatos registrados en excel
//Datos cargados a la base de datos
//(cand_nom,cand_tel1,cand_tel2,cand_corr,clv_vacante,cand_fecha_nac,cand_direccion,
//cand_edad,cand_sdo_sol,cand_obs_reclu) 


<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Carga de candidatos desde tabla de excel a MySQL en la web</title>
    <script type="text/javascript" src="progjs/Servidor.js" defer></script>

    <title>Importando archivo excel de candidatos sin convertir, utilizando librerias</title>
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
    <link rel="stylesheet" type="text/css" href="css/stylesCV.css">

    <script src="progjs/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/cargando.css">
    <link rel="stylesheet" type="text/css" href="css/cssGenerales.css">
</head>

<body>

    <div class="cargando">
        <div class="loader-outter"></div>
        <div class="loader-inner"></div>
    </div>


    <nav class="navbar navbar-expand-lg navbar-light navbar-dark fixed-top"
        style="background-color: blue !important;">
        <ul class="navbar-nav mr-auto collapse navbar-collapse">
            <li class="nav-item active">
                <a href="admon.htm">
                    <img src="img/arhsi_logo.gif" alt="ARHSI" width="120">
                </a>
            </li>
            <li class="nav-item active"> 
                <a class="nav-link" href="admon.htm" >Salir<span class="sr-only">(current)</span>
                </a> 
            </li>
        </ul>
        <div class="my-2 my-lg-0">
            <h5 class="navbar-brand">Carga Excel de Candidatos</h5>
        </div>
    </nav>


    <div class="container">
        <h3 class="text-center">
            Importando datos desde Excel
        </h3>
        <hr>
        <br>
        <div class="row">
            <div class="col-md-4">
                <form action="httpdocs/reg_cand_desde_excel2.php" method="POST" accept-charset="UTF-8"
                    enctype="multipart/form-data">
                    <div class="file-input text-left">
                        <input type="file" name="file" id="file" accept=".xls,.xlsx" onchange="asigna_nombre()">
                    </div>
                    <div>
                        <input type="text" name="archivo"  id="archivo" value="" size="50" disabled>
                        <script  language="JavaScript" type="text/javascript">
                            var limpia = "";
                            document.getElementById("archivo").value=limpia;
                            function asigna_nombre() {
                                var archivo = document.getElementById("file").value;
                                var archivo2 = archivo.split("\\");
                                var cant_arch = archivo2.length;
                                document.getElementById("archivo").value=archivo2[cant_arch-1];
                                }
                        </script>
                    </div>
                    <div class="text-left mt-4" style="margin-left: 5rem!important">
                        <input type="submit" name="import" class="btn-enviar" value="Subir Excel"/>
                    </div>
                </form>
                <br>
                <br>
                <form action="" method="GET">
                    <table>
                    <tr><td>Clave vacante:</td><td><input type="text" name="vacante"  id="vacante" value="0"></td></tr>
                    <tr><td></td><td><input type="submit" name="despliega" class="btn-enviar mt-4" value="Reporte"/> </td></tr>
                    </table>
                </form>
            </div>

            <div class="col-md-8">
                <div>
                    <?php
                    $busca_vacante = "1";

                    if(isset($_GET['vacante'])){
                        $vacante=$_GET['vacante'];
                        if($vacante >0){
                            $busca_vacante = "clv_vacante=".$vacante;
                        } else {
                            $busca_vacante = "1";
                        }
                    }
                    
    header('Content-Type: text/html; charset=utf-8');
    if($busca_vacante == "1"){
        $cantidad = "Todas";
    } else { $cantidad = $vacante;}

    echo("Vacante: ".$cantidad);
    
    require 'httpdocs/arhsi_connect.php';
    $query="SELECT cand_key, cand_nom, cand_tel1, cand_tel2, clv_vacante FROM Candidatos WHERE $busca_vacante ORDER BY clv_vacante DESC, cand_nom ASC";
    $response=mysqli_query($dbc,$query);
    $total_candidatos = mysqli_num_rows($response);
    ?>
                </div>

                <h6 class="text-center">
                    Lista de Candidatos <strong>(<?php echo $total_candidatos; ?>)</strong>
                </h6>

                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th style="text-align:center; width: 10%;">#</th>
                            <th style="text-align:center; width: 10%;">Clave</th>
                            <th style="text-align:center; width: 25%;">Nombre</th>
                            <th style="text-align:center; width: 20%;">Telefono 1</th>
                            <th style="text-align:center; width: 20%;">Telefono 2</th>
                            <th style="text-align:center; width: 15%;">Vacante</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php 
                $i = 1;
                while($data = mysqli_fetch_array($response)) {?>
                        <tr>
                            <td scope="row" style="text-align:center;"><?php echo $i++; ?></td>
                            <td style="text-align:center;"><?php echo $data[0]; ?></td>
                            <td style="text-align:left;"><?php echo $data[1]; ?></td>
                            <td style="text-align:center;"><?php echo $data[2]; ?></td>
                            <td style="text-align:center;"><?php echo $data[3]; ?></td>
                            <td style="text-align:center;"><?php echo $data[4]; ?></td>
                        </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="progjs/jquery.min.js"></script>
    <script src="progjs/popper.min.js"></script>
    <script src="progjs/bootstrap.min.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            $(window).load(function () {
                $(".cargando").fadeOut(1000);
            });
        });
    </script>

</body>

</html>