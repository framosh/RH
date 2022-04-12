function mismaDiferencia(valores) {
    var cantidad_valores = valores.length;
    var i, i2;
    i2 = 0;
    var diferencia2 = 0;
    var diferencia0 = [];
    var misma_magnitud = true;
    diferencia2 = valores[0] - valores[1];

    for (i = 0; i < cantidad_valores; i++) {
        indice1 = i;
        indice2 = i + 1;

        valor1 = valores[indice1];
        valor2 = valores[indice2];
        diferencia0[i2] = valor1 - valor2;
        i2++;
    }

    for (i = 0; i < i2; i++) {
        if (diferencia2 != diferencia0[i]) {
            misma_magnitud = false;
        }
    }
    return misma_magnitud;
}