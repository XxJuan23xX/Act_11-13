document.getElementById('procesarVentas').addEventListener('click', procesarVentas);

const ventas = [
    [5, 16, 10, 12, 24, 15, 19],
    [35, 24, 11, 78, 15, 32, 50],
    [15, 41, 78, 44, 18, 10, 19],
    [40, 20, 35, 60, 41, 78, 22],
    [50, 41, 22, 58, 32, 15, 50],
    [54, 12, 44, 60, 61, 24, 35],
    [50, 78, 50, 15, 20, 19, 25],
    [22, 64, 15, 44, 66, 15, 40],
    [34, 21, 12, 32, 60, 46, 10],
    [12, 50, 41, 15, 48, 25, 50],
    [49, 19, 78, 35, 35, 15, 40],
    [40, 46, 15, 10, 15, 46, 22]
];

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

function procesarVentas() {
    const menorVenta = encontrarMenorVenta(ventas);
    const mayorVenta = encontrarMayorVenta(ventas);
    const totalVentas = calcularTotalVentas(ventas);
    const ventasPorDia = calcularVentasPorDia(ventas);

    mostrarResultados(menorVenta, mayorVenta, totalVentas, ventasPorDia);
    mostrarTablaVentas();
}

function encontrarMenorVenta(ventas, mesActual = 0, diaActual = 0, menor = { valor: Infinity, mes: 0, dia: 0 }) {
    if (mesActual === ventas.length) return menor;
    if (diaActual === ventas[mesActual].length) return encontrarMenorVenta(ventas, mesActual + 1, 0, menor);

    if (ventas[mesActual][diaActual] < menor.valor) {
        menor = { valor: ventas[mesActual][diaActual], mes: mesActual, dia: diaActual };
    }
    return encontrarMenorVenta(ventas, mesActual, diaActual + 1, menor);
}

function encontrarMayorVenta(ventas, mesActual = 0, diaActual = 0, mayor = { valor: -Infinity, mes: 0, dia: 0 }) {
    if (mesActual === ventas.length) return mayor;
    if (diaActual === ventas[mesActual].length) return encontrarMayorVenta(ventas, mesActual + 1, 0, mayor);

    if (ventas[mesActual][diaActual] > mayor.valor) {
        mayor = { valor: ventas[mesActual][diaActual], mes: mesActual, dia: diaActual };
    }
    return encontrarMayorVenta(ventas, mesActual, diaActual + 1, mayor);
}

function calcularTotalVentas(ventas, mesActual = 0, total = 0) {
    if (mesActual === ventas.length) return total;
    total += sumaRecursiva(ventas[mesActual]);
    return calcularTotalVentas(ventas, mesActual + 1, total);
}

function sumaRecursiva(arr, idx = 0) {
    if (idx === arr.length) return 0;
    return arr[idx] + sumaRecursiva(arr, idx + 1);
}

function calcularVentasPorDia(ventas, diaActual = 0, ventasPorDia = Array(7).fill(0)) {
    if (diaActual === dias.length) return ventasPorDia;

    let sumaDia = sumaRecursivaPorDia(ventas, diaActual);
    ventasPorDia[diaActual] = sumaDia;

    return calcularVentasPorDia(ventas, diaActual + 1, ventasPorDia);
}

function sumaRecursivaPorDia(ventas, dia, mesActual = 0, suma = 0) {
    if (mesActual === ventas.length) return suma;
    suma += ventas[mesActual][dia];
    return sumaRecursivaPorDia(ventas, dia, mesActual + 1, suma);
}

function mostrarResultados(menorVenta, mayorVenta, totalVentas, ventasPorDia) {
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = `
        <h3>Menor venta:</h3>
        <p>Venta de $${menorVenta.valor} realizada en el mes ${menorVenta.mes + 1}, día ${dias[menorVenta.dia]}</p>
        
        <h3>Mayor venta:</h3>
        <p>Venta de $${mayorVenta.valor} realizada en el mes ${mayorVenta.mes + 1}, día ${dias[mayorVenta.dia]}</p>
        
        <h3>Total de ventas:</h3>
        <p>$${totalVentas}</p>
        
        <h3>Ventas por día:</h3>
        <ul>
            ${dias.map((dia, idx) => `<li>${dia}: $${ventasPorDia[idx]}</li>`).join('')}
        </ul>
    `;
}

function mostrarTablaVentas() {
    const tablaVentas = document.createElement('table');
    tablaVentas.border = 1;
    let cabecera = '<thead><tr><th>Mes</th>';
    dias.forEach(dia => {
        cabecera += `<th>${dia}</th>`;
    });
    cabecera += '</tr></thead>';
    let cuerpo = '<tbody>';
    ventas.forEach((ventasMes, idxMes) => {
        cuerpo += `<tr><td>Mes ${idxMes + 1}</td>`;
        ventasMes.forEach(venta => {
            cuerpo += `<td>${venta}</td>`;
        });
        cuerpo += '</tr>';
    });
    cuerpo += '</tbody>';

    tablaVentas.innerHTML = cabecera + cuerpo;
    document.getElementById('resultados').appendChild(tablaVentas);
}
