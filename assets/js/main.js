$(document).ready(function () {
    var valores = {
        presupuesto:$("#presupuesto").val(),
        gastos:$("#gastos").val(),
        saldo:$("#saldo").val(),
    }
    var gastos = [];

    $(".btn-presupuesto").on("click", function() {;
        const presupuestoPorAgregar = $("#presupuestoId").val();
        if (presupuestoPorAgregar === undefined || presupuestoPorAgregar <= 0) {
            alert("Debe ingresar un presupuesto mayor que Cero");
            return;
    }
    agregarPresupuesto(parseInt(presupuestoPorAgregar));
    $("#presupuestoId").val("");
});

$(".btn-gasto").on("click", function(){
    let nombreGasto = $("#nombreGasto").val();
    let gastosPorAgregar = $("#gastoId").val();
    if (nombreGasto === undefined || nombreGasto === "" || nombreGasto === null || gastosPorAgregar === undefined || gastosPorAgregar <= 0) { 
        alert("Debe ingresar un nombre y un valor de gasto mayor que cero");
        return;
}
let g = agregarGasto(parseInt(gastosPorAgregar));
if(g.succes){
    gastos.push({nombre: nombreGasto, Valor, gastosPorAgregar});
    actualizartabla();
    $('#nombreGasto').val("");
    $('#nombreId').val("");
}
});

$("#btn-reset").on("click", function(){
    valores.presupuesto = "";
    valores.gastos = "";
    valores.saldo = "";
    $('#presupuesto').text(valores.presupuesto);
    $('#gastos').text(valores.gastos);
    $('#saldo').text(valores.saldo);
    $('#presupuestoId').val("");
    $('#nombreGastos').val("");
    $('#gastoId').val("");
    gastos = [];
    actualizartabla();
});




