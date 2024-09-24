document.getElementById('generarMatriz').addEventListener('click', generarMatriz);

function generarMatriz() {
    const filas = 5;
    const columnas = 10;
    let matrix = crearMatrizAleatoria(filas, columnas);
    displayMatrix(matrix);
    
    let { sumasFilas, promediosFilas } = calcularSumasYPromediosFilas(matrix);
    let { sumasColumnas, promediosColumnas } = calcularSumasYPromediosColumnas(matrix);
    
    mostrarResultados(sumasFilas, promediosFilas, sumasColumnas, promediosColumnas);
}

function crearMatrizAleatoria(filas, columnas, matriz = [], filaActual = 0) {
    if (filaActual === filas) return matriz;
    matriz.push(crearFilaAleatoria(columnas));
    return crearMatrizAleatoria(filas, columnas, matriz, filaActual + 1);
}

function crearFilaAleatoria(columnas, fila = [], colActual = 0) {
    if (colActual === columnas) return fila;
    fila.push(Math.floor(Math.random() * 9) + 1);
    return crearFilaAleatoria(columnas, fila, colActual + 1);
}

function displayMatrix(matrix, filaActual = 0, table = '<table>') {
    if (filaActual === matrix.length) {
        table += '</table>';
        document.getElementById('matrixContainer').innerHTML = table;
        return;
    }
    table += '<tr>';
    table += matrix[filaActual].map(cell => `<td>${cell}</td>`).join('');
    table += '</tr>';
    displayMatrix(matrix, filaActual + 1, table);
}

function calcularSumasYPromediosFilas(matrix, filaActual = 0, sumasFilas = [], promediosFilas = []) {
    if (filaActual === matrix.length) return { sumasFilas, promediosFilas };
    let suma = sumaRecursiva(matrix[filaActual]);
    sumasFilas.push(`Fila ${filaActual + 1}: ${suma}`);
    promediosFilas.push(`Promedio de Fila ${filaActual + 1}: ${(suma / matrix[filaActual].length).toFixed(2)}`);
    return calcularSumasYPromediosFilas(matrix, filaActual + 1, sumasFilas, promediosFilas);
}

function sumaRecursiva(fila, idx = 0) {
    if (idx === fila.length) return 0;
    return fila[idx] + sumaRecursiva(fila, idx + 1);
}

function calcularSumasYPromediosColumnas(matrix, colActual = 0, sumasColumnas = [], promediosColumnas = []) {
    if (colActual === matrix[0].length) return { sumasColumnas, promediosColumnas };
    let sumaColumna = sumaRecursivaColumna(matrix, colActual);
    sumasColumnas.push(`Columna ${colActual + 1}: ${sumaColumna}`);
    promediosColumnas.push(`Promedio de Columna ${colActual + 1}: ${(sumaColumna / matrix.length).toFixed(2)}`);
    return calcularSumasYPromediosColumnas(matrix, colActual + 1, sumasColumnas, promediosColumnas);
}

function sumaRecursivaColumna(matrix, col, filaActual = 0, suma = 0) {
    if (filaActual === matrix.length) return suma;
    suma += matrix[filaActual][col];
    return sumaRecursivaColumna(matrix, col, filaActual + 1, suma);
}

function mostrarResultados(sumasFilas, promediosFilas, sumasColumnas, promediosColumnas) {
    const resultadosFilas = document.getElementById('resultadosFilas');
    const resultadosColumnas = document.getElementById('resultadosColumnas');

    resultadosFilas.innerHTML = `
        <h3>Suma y Promedio por Fila:</h3>
        <p>${sumasFilas.join('<br>')}</p>
        <p>${promediosFilas.join('<br>')}</p>`;
    
    resultadosColumnas.innerHTML = `
        <h3>Suma y Promedio por Columna:</h3>
        <p>${sumasColumnas.join('<br>')}</p>
        <p>${promediosColumnas.join('<br>')}</p>`;
}
