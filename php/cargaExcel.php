<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carga de candidatos desde tabla de excel a MySQL en la web</title>
    <script type="text/javascript" src="progjs/Servidor.js" defer></script>

    <title>Importando archivo excel de candidatos</title>
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/cargando.css">
    <link rel="stylesheet" type="text/css" href="css/cssGenerales.css">
    <link rel="stylesheet" type="text/css" href="css/stylesCV.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
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
                <a href="cargaExcel.php">
                    <img src="img/arhsi_logo.gif" alt="ARHSI" width="120">
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
                <form action="httpdocs/reg_cand_desde_excel.php" method="POST" accept-charset="UTF-8"
                    enctype="multipart/form-data">
                    <div class="file-input text-center">
                        <input type="file" name="dataCandidato" id="file-input" class="file-input__input" onchange="asigna_nombre()">
                        <label class="file-input__label" for="file-input">
                            <i class="zmdi zmdi-upload zmdi-hc-2x"></i>
                            <span>Elegir Archivo Excel</span>
                        </label>
                    </div>
                    <div>
                        <input type="text" name="archivo"  id="archivo" value="" size="40" disabled>
                        <script  language="JavaScript" type="text/javascript">
                            var limpia = "";
                            document.getElementById("archivo").value=limpia;
//                            document.getElementById("vacante").value=limpia;
//                            var vacante="";
                            function asigna_nombre() {
                                var archivo = document.getElementById("file-input").value;
  //                              vacante = document.getElementById("vacante").value;
                                var archivo2 = archivo.split("\\");
                                var cant_arch = archivo2.length;
                                document.getElementById("archivo").value=archivo2[cant_arch-1];
                                }
                        </script>
                    </div>
                    <div class="text-center mt-5">
                        <input type="submit" name="subir" class="btn-enviar" value="Subir Excel"/>
                    </div>
                </form>
                <br>
                <br>
                <form action="" method="GET">
                    <table>
                    <tr><td>Clave vacante:</td><td><input type="text" name="vacante"  id="vacante" value="0"></td></tr>
                    <tr><td></td><td><input type="submit" name="despliega" class="btn-enviar" value="Reporte"/> </td></tr>
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