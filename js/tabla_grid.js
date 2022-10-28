new gridjs.Grid({
    columns: ["Clave", "Nombre", "Imagen"],
    data: [
        ["1", "Pablo", "hola1"],
        ["2", "Luis", "hola2"],
        ["3", "Pedro", "hola3"],
        ["4", "Ana", "hola4"],
        ["5", "Lola", "hola5"],
        ["6", "Maria", "hola6"],
        ["7", "Octavio", "hola7"]
    ]
}).render(document.getElementById("tabla"));