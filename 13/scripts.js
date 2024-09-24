document.getElementById('procesarCalificaciones').addEventListener('click', procesarCalificaciones);

const calificaciones = [
    [5.5, 8.6, 10, 9.0],
    [8.0, 5.5, 7.0, 9.5],
    [10.0, 2.2, 8.1, 4.5],
    [7.0, 6.0, 9.2, 7.1],
    [6.5, 5.0, 5.0, 8.0],
    [8.5, 9.0, 4.2, 7.5],
    [9.5, 9.0, 6.8, 7.5],
    [9.0, 4.6, 9.0, 7.5]
];

function procesarCalificaciones() {
    const promedios = calcularPromedioPorAlumno(calificaciones);
    const promedioMax = encontrarPromedioMaximo(promedios);
    const promedioMin = encontrarPromedioMinimo(promedios);
    const parcialesReprobados = contarParcialesReprobados(calificaciones);
    const distribucion = calcularDistribucion(promedios);

    mostrarResultados(promedios, promedioMax, promedioMin, parcialesReprobados, distribucion);
}

function calcularPromedioPorAlumno(calificaciones, idx = 0, promedios = []) {
    if (idx === calificaciones.length) return promedios;
    let suma = sumaRecursiva(calificaciones[idx]);
    promedios.push((suma / calificaciones[idx].length).toFixed(2));
    return calcularPromedioPorAlumno(calificaciones, idx + 1, promedios);
}

function sumaRecursiva(arr, idx = 0) {
    if (idx === arr.length) return 0;
    return arr[idx] + sumaRecursiva(arr, idx + 1);
}

function encontrarPromedioMaximo(promedios, idx = 0, max = -Infinity) {
    if (idx === promedios.length) return max;
    if (parseFloat(promedios[idx]) > max) {
        max = parseFloat(promedios[idx]);
    }
    return encontrarPromedioMaximo(promedios, idx + 1, max);
}

function encontrarPromedioMinimo(promedios, idx = 0, min = Infinity) {
    if (idx === promedios.length) return min;
    if (parseFloat(promedios[idx]) < min) {
        min = parseFloat(promedios[idx]);
    }
    return encontrarPromedioMinimo(promedios, idx + 1, min);
}

function contarParcialesReprobados(calificaciones, mes = 0, reprobados = 0) {
    if (mes === calificaciones.length) return reprobados;
    reprobados += calificaciones[mes].filter(nota => nota < 7.0).length;
    return contarParcialesReprobados(calificaciones, mes + 1, reprobados);
}

function calcularDistribucion(promedios, distribucion = { '0-4.9': 0, '5.0-5.9': 0, '6.0-6.9': 0, '7.0-7.9': 0, '8.0-8.9': 0, '9.0-10.0': 0 }) {
    promedios.forEach(promedio => {
        let p = parseFloat(promedio);
        if (p <= 4.9) distribucion['0-4.9']++;
        else if (p <= 5.9) distribucion['5.0-5.9']++;
        else if (p <= 6.9) distribucion['6.0-6.9']++;
        else if (p <= 7.9) distribucion['7.0-7.9']++;
        else if (p <= 8.9) distribucion['8.0-8.9']++;
        else if (p <= 10.0) distribucion['9.0-10.0']++;
    });
    return distribucion;
}

function mostrarResultados(promedios, promedioMax, promedioMin, parcialesReprobados, distribucion) {
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = `
        <h3>Promedio de cada alumno:</h3>
        <p>${promedios.join(', ')}</p>
        
        <h3>Promedio más alto:</h3>
        <p>${promedioMax}</p>
        
        <h3>Promedio más bajo:</h3>
        <p>${promedioMin}</p>
        
        <h3>Parciales reprobados (menores a 7.0):</h3>
        <p>${parcialesReprobados} parciales reprobados</p>
        
        <h3>Distribución de calificaciones:</h3>
        <ul>
            ${Object.keys(distribucion).map(rango => `<li>${rango}: ${distribucion[rango]} alumnos</li>`).join('')}
        </ul>
    `;
}
