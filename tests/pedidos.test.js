const { calcularTotal, calcularTotalTienda } = require("../src/pedidos");

describe("calcularTotal", () => {
  test("aplica 10 % de descuento a clientes VIP", () => {
    const pedido = { cliente: "VIP", items: [{ cantidad: 2, precio: 10 }] };
    expect(calcularTotal(pedido)).toBe(18);
  });

  test("aplica 5 % de descuento a clientes FRECUENTE", () => {
    const pedido = { cliente: "FRECUENTE", items: [{ cantidad: 2, precio: 10 }] };
    expect(calcularTotal(pedido)).toBeCloseTo(19);
  });

  test("ignora ítems con cantidad 0", () => {
    const pedido = { cliente: "NORMAL", items: [{ cantidad: 0, precio: 50 }] };
    expect(calcularTotal(pedido)).toBe(0);
  });

  test("ignora ítems con precio 0", () => {
    const pedido = { cliente: "NORMAL", items: [{ cantidad: 3, precio: 0 }] };
    expect(calcularTotal(pedido)).toBe(0);
  });

  test("resta 5 cuando hay cupón", () => {
    const pedido = { cliente: "NORMAL", cupon: true, items: [{ cantidad: 1, precio: 10 }] };
    expect(calcularTotal(pedido)).toBe(5);
  });

  test("resta 5 cuando el total supera 100", () => {
    const pedido = { cliente: "NORMAL", items: [{ cantidad: 1, precio: 200 }] };
    expect(calcularTotal(pedido)).toBe(195);
  });

  test("no resta 5 sin cupón y con total de 100 o menos", () => {
    const pedido = { cliente: "NORMAL", items: [{ cantidad: 1, precio: 100 }] };
    expect(calcularTotal(pedido)).toBe(100);
  });

  test("combina descuento VIP y descuento fijo", () => {
    const pedido = { cliente: "VIP", items: [{ cantidad: 1, precio: 200 }] };
    expect(calcularTotal(pedido)).toBe(175);
  });

  test("pedido sin ítems da 0", () => {
    expect(calcularTotal({ cliente: "NORMAL", items: [] })).toBe(0);
  });
});

describe("calcularTotalTienda", () => {
  const items = [{ cantidad: 1, precio: 200 }];

  test("aplica 10 % a VIP sin el descuento fijo", () => {
    expect(calcularTotalTienda({ cliente: "VIP", items })).toBe(180);
  });

  test("aplica 5 % a FRECUENTE sin el descuento fijo", () => {
    expect(calcularTotalTienda({ cliente: "FRECUENTE", items })).toBe(190);
  });

  test("cliente normal paga el subtotal", () => {
    expect(calcularTotalTienda({ cliente: "NORMAL", items })).toBe(200);
  });

  test("ignora ítems inválidos", () => {
    const pedido = { cliente: "NORMAL", items: [{ cantidad: -1, precio: 10 }, { cantidad: 2, precio: 5 }] };
    expect(calcularTotalTienda(pedido)).toBe(10);
  });
});
