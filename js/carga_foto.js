function carga_imagen() {
    var preview = document.querySelector("img");
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
        //                fileUpload(file[0],file[0].file);
    }
}


function FileUpload(img, file) {
    elige_servidor();
    this.ctrl = createThrobber(img);
    var xhr = new XMLHttpRequest();
    this.xhr = xhr;

    var self = this;
    this.xhr.upload.addEventListener("progress", function (e) {
        if (e.lengthComputable) {
            var percentage = Math.round((e.loaded * 100) / e.total);
            self.ctrl.update(percentage);
        }
    }, false);

    xhr.upload.addEventListener("load", function (e) {
        self.ctrl.update(100);
        var canvas = self.ctrl.ctx.canvas;
        canvas.parentNode.removeChild(canvas);
    }, false);

    var archivo2 = servidor + "httpdocs/cargaFoto.php";

    xhr.open("POST", archivo2, true);
    xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
    xhr.sendAsBinary(file.getAsBinary());
}

/*
function fileUpload(file) {
    // Please report improvements to: marco.buratto at tiscali.it

    var fileName = file.name;
    var fileSize = file.size;
    var fileData = file.getAsBinary(); // works on TEXT data ONLY.

    var boundary = "xxxxxxxxx";
    //    var uri = "serverLogic.php";

    var xhr = new XMLHttpRequest();

    var archivo2 = servidor + "httpdocs/cargaFoto.php";

    xhr.open("POST", archivo2, true);

    xhr.setRequestHeader("Content-Type", "multipart/form-data, boundary=" + boundary); // simulate a file MIME POST request.
    xhr.setRequestHeader("Content-Length", fileSize);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status <= 200) || xhr.status == 304) {

                if (xhr.responseText != "") {
                    alert(xhr.responseText); // display response.
                }
            }
        }
    };

    var body = "--" + boundary + "\r\n";
    body += "Content-Disposition: form-data; name='fileId'; filename='" + fileName + "'\r\n";
    body += "Content-Type: application/octet-stream\r\n\r\n";
    body += fileData + "\r\n";
    body += "--" + boundary + "--";

    xhr.send(body);
    return true;
}
*/