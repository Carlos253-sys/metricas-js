// Calcula el total de un pedido con descuentos (versión refactorizada)
const DESCUENTOS_CLIENTE = { VIP: 0.9, FRECUENTE: 0.95 };
const DESCUENTO_FIJO = 5;
const UMBRAL_DESCUENTO_FIJO = 100;

function esItemValido(item) {
  return item.cantidad > 0 && item.precio > 0;
}

function calcularSubtotal(items) {
  return items
    .filter(esItemValido)
    .reduce((suma, item) => suma + item.cantidad * item.precio, 0);
}

function aplicarDescuentoCliente(total, cliente) {
  return total * (DESCUENTOS_CLIENTE[cliente] ?? 1);
}

function calcularTotalTienda(pedido) {
  const subtotal = calcularSubtotal(pedido.items);
  return aplicarDescuentoCliente(subtotal, pedido.cliente);
}

function calcularTotal(pedido) {
  const total = calcularTotalTienda(pedido);
  const aplicaDescuentoFijo = total > UMBRAL_DESCUENTO_FIJO || pedido.cupon;
  return aplicaDescuentoFijo ? total - DESCUENTO_FIJO : total;
}

module.exports = { calcularTotal, calcularTotalTienda };
