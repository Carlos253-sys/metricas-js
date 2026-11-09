# Proyecto: métricas de calidad en JavaScript

Ya vienen listos: `package.json` (con los scripts), `eslint.config.js`, `src/pedidos.js` (código del Anexo A),
`tests/pedidos.test.js` (pruebas completas) y `refactorizacion-lista/pedidos.js` (versión mejorada).

## A. Medición inicial (rama medicion-inicial)
```bash
npm install
git init
git add . && git commit -m "Proyecto inicial"
git checkout -b medicion-inicial

npm list --depth=0                      # captura
npm run tamano                          # LOC, SLOC, comentarios
npx eslint src/ --rule '{"complexity": ["warn", 1]}'   # CC de cada función
npm run mantenibilidad                  # abrir reporte-plato/index.html
npm run lint
npx eslint src/ -f html -o eslint-inicial.html
npm run duplicados
npm test
npm run cobertura                       # abrir coverage/lcov-report/index.html
git add . && git commit -m "Medición inicial con pruebas"
```
Sugerencia: para que el "Antes" muestre cobertura baja y pueda mejorar después, puedes comentar temporalmente
algunas pruebas antes de medir, pero lo más honesto es medir con las pruebas completas y mostrar la mejora en CC,
MI, duplicación y advertencias.

## B. Refactorización (rama refactorizacion)
```bash
git checkout -b refactorizacion
cp refactorizacion-lista/pedidos.js src/pedidos.js
npm test                                # deben pasar todas
git add . && git commit -m "Refactor: extraer funciones y eliminar duplicación"
```
Repite las mediciones (tamano, CC, mantenibilidad, lint, duplicados, cobertura) y llena la columna "Después".
Para commits pequeños, aplica el cambio por partes (primero `calcularSubtotal`, luego el objeto de descuentos).

## C. Subir a GitHub
```bash
git remote add origin https://github.com/TU_USUARIO/metricas-js.git
git push -u origin medicion-inicial
git push -u origin refactorizacion
```
