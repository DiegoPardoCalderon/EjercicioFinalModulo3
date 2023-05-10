$(document).ready(function () {
    var valores={
        presupuesto:$("#presupuesto").val(),
        gastos:$("#gastos").val(),
        saldo:$("#saldo").val(),
    }
    var gastos = [];

  $(".btn-presupuesto").on("click", function() {;
    const presupuestoPorAgregar = $("#presupuestoId").val();
    if (presupuestoPorAgregar === undefined || presupuestoPorAgregar <= 0) {
        alert("Debe ingresar un presupuesto positivo mayor que 0");
        return;
    }
    agregarPresupuesto(parseInt(presupuestoPorAgregar));
    $("#presupuestoId").val("");
  });

  $(".btn-gasto").on("click", function() {
    let nombreGasto = $("#nombreGasto").val();
    let gastosPorAgregar = $("#gastoId").val();
    if (nombreGasto === undefined || nombreGasto === "" || nombreGasto === null || gastosPorAgregar === undefined || gastosPorAgregar <= 0) {
        alert("Debe ingresar un nombre y un valor de gasto positivo mayor que 0");
        return;
    }
    let g = agregarGasto(parseInt(gastosPorAgregar));
    if(g.success){
        gastos.push({nombre: nombreGasto, valor: gastosPorAgregar});
        actualizarTabla();
        $("#nombreGasto").val("");
        $("#gastoId").val("");
    }
    });

  $(".btn-reset").on("click", function() {
    valores.presupuesto = "";
    valores.gastos = "";
    valores.saldo = "";
    $("#presupuesto").text(valores.presupuesto);
    $("#gastos").text(valores.gastos);
    $("#saldo").text(valores.saldo);
    $("#presupuestoId").val("");
    $("#nombreGasto").val("");
    $("#gastoId").val("");
    gastos = [];
    actualizarTabla();
  });


  const agregarGasto = (gasto) => {
    if(valores.presupuesto === "" || valores.presupuesto === undefined || valores.presupuesto === null){
        alert("No puede agregar un gasto si no tiene presupuesto");
        return {
            success: false,
            message: "No puede agregar un gasto si no tiene presupuesto"
        };
    }
    if(gastos.length === 0){
        if(valores.presupuesto < parseInt(gasto)){
            alert("Presupuesto inicial insuficiente");
            return {
                success: false,
                message: "No puede agregar un gasto que supere a su presupuesto inicial"
            };
        }
        actualizarSaldo(gasto);
        return {
            success: true,
            message: "Gasto agregado correctamente"
        };
    }else{
        if(valores.saldo === "" || valores.saldo < gasto){
            alert("Saldo insuficiente");
            return {
                success: false,
                message: "No puede agregar un gasto si no tiene presupuesto"
            };
        }
        actualizarSaldo(gasto);
        return {
            success: true,
            message: "Gasto agregado correctamente"
        };
    };
  };

  const agregarPresupuesto = (presupuesto) => {
    if(valores.presupuesto === "" || valores.presupuesto === undefined || valores.presupuesto === null){
        valores.presupuesto = presupuesto;
        $("#presupuesto").text(valores.presupuesto);
    }else{
        valores.presupuesto = parseInt(valores.presupuesto) + parseInt(presupuesto);
        $("#presupuesto").text(valores.presupuesto);
    }
  }
  const actualizarTabla = () => {
    if(gastos.length === 0){
        $("#tabla-gastos").html("");
        return;
    }
    let html = "";
    gastos.forEach((gasto, index) => {
        html += `
        <tr>
            <td>${gasto.nombre}</td>
            <td>${gasto.valor}</td>
            <td><button type="button" class="button btn-eliminar" data-index="${index}"><i class="bi bi-trash"></i></button></td>
        </tr>
        `;
    });
    $("#tabla-gastos").html(html);

    $(".btn-eliminar").click(function() {
        const index = $(this).data("index");
        let valor = gastos[index].valor;
        gastos.splice(index, 1);
        actualizarTabla();
        actualizarSaldo(null, valor)
    });
};
  const actualizarSaldo = (gasto=null, aumento=null) =>{
    if(gasto!=null){
        if(valores.gastos === "" || valores.gastos === undefined || valores.gastos === null){
            valores.gastos = gasto;
            $("#gastos").text(valores.gastos);
            valores.saldo = parseInt(valores.presupuesto) - parseInt(valores.gastos);
            $("#saldo").text(valores.saldo);
      }else{
            valores.gastos = parseInt(valores.gastos) + parseInt(gasto);
            $("#gastos").text(valores.gastos);
            valores.saldo = parseInt(valores.presupuesto) - parseInt(valores.gastos);
            $("#saldo").text(valores.saldo);
        };
    }
    else if(aumento!=null){
        valores.gastos = parseInt(valores.gastos) - parseInt(aumento);
        $("#gastos").text(valores.gastos);
        valores.saldo = parseInt(valores.saldo) + parseInt(aumento);
        $("#saldo").text(valores.saldo);
    }
  }
}); 
            

