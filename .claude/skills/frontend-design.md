# Skill: frontend-design

Crea interfaces web distintivas y de calidad profesional. Evita la estética genérica de IA ("AI slop") y produce código visualmente memorable.

---

## 0 — DESIGN.md (prioridad máxima)

Antes de cualquier decisión visual, busca un archivo `DESIGN.md` en la raíz del proyecto.

- Si existe → úsalo como fuente de verdad para colores, tipografía, espaciado, tokens y componentes. No improvises sobre lo que ya está definido ahí.
- Si no existe → aplica las reglas de este skill con criterio propio.
- Si el usuario menciona getdesign.md o pide basarse en una marca específica → sugiere crear un `DESIGN.md` con los tokens correspondientes antes de generar UI.

---

## 1 — Design Thinking (antes de escribir código)

Para cada componente o pantalla nueva, responde mentalmente:

| Pregunta | Por qué importa |
|---|---|
| ¿Qué problema resuelve esta UI? | Define la dirección, no el estilo |
| ¿Quién la usa y en qué contexto? | Determina densidad, contraste, tamaño |
| ¿Qué tono estético corresponde? | Elige uno y comprométete |
| ¿Qué la hace memorable? | Si no hay respuesta, rediseña |

---

## 2 — Dirección estética

Elige **una** dirección y ejecuta con convicción. No mezcles sin intención.

- Minimalismo brutal — espacio negativo extremo, una sola fuente, sin ornamento
- Maximalismo — capas, texturas, animaciones, densidad visual alta
- Retro-futurista — tipografía geométrica, paletas neón, efectos CRT/glitch
- Orgánico — formas curvas, gradientes suaves, sensación artesanal
- Lujo editorial — serif display, alto contraste, mucho blanco, fotografía dominante
- Industrial — grilla visible, tipografía condensada, colores industriales
- Playful — ilustración, colores saturados, micro-interacciones divertidas

---

## 3 — Tipografía

- Usa fuentes con carácter: Geist, Space Grotesk, Playfair Display, Syne, DM Serif, Fragment Mono
- Combina siempre: una display font (titulares) + una body font refinada (texto corrido)
- Define escala tipográfica con CSS variables: `--text-xs` a `--text-6xl`
- **Nunca**: Arial, Roboto, Inter como fuente principal sin justificación explícita

---

## 4 — Color y tema

```css
/* Estructura base recomendada */
:root {
  --color-bg:       #;     /* fondo principal */
  --color-surface:  #;     /* tarjetas, paneles */
  --color-border:   #;     /* separadores */
  --color-text:     #;     /* texto principal */
  --color-muted:    #;     /* texto secundario */
  --color-accent:   #;     /* acción principal, CTA */
  --color-accent-2: #;     /* acento secundario opcional */
}
```

- Paleta cohesiva: 1 dominante + 1-2 acentos agudos
- Contraste WCAG AA mínimo (4.5:1 texto normal, 3:1 texto grande)
- **Nunca**: gradientes púrpura por defecto, paleta azul corporativa genérica

---

## 5 — Movimiento y animaciones

- Úsalas en momentos de alto impacto: carga inicial, transiciones de página, feedback de acción
- Revelados escalonados con `animation-delay` para listas y grillas
- Preferir `transform` y `opacity` (GPU-friendly), evitar animar `width`/`height`
- Duración: 150ms–400ms. Nunca más de 600ms sin propósito narrativo
- `prefers-reduced-motion` siempre respetado

---

## 6 — Composición espacial

- Asimetría intencional > grilla perfecta
- Solapamientos y elementos que rompan el flujo vertical
- Espacio negativo generoso — el vacío también diseña
- Flujos diagonales o rotaciones sutias para romper la monotonía

---

## 7 — Detalles visuales

Según la dirección estética elegida, considera:

- Gradient meshes y noise textures para profundidad
- Patrones geométricos como fondo o separador
- Sombras dramáticas (`box-shadow` multicapa) para elevación real
- Bordes decorativos, líneas de acento, separadores con grosor variable
- Efectos de hover que revelen información o cambien la composición

---

## 8 — Lo que nunca hacer

| Prohibido | Alternativa |
|---|---|
| Fuentes genéricas como primera opción | Elegir una fuente con personalidad |
| Gradiente púrpura-azul por defecto | Definir paleta desde el propósito |
| Layout card-grid-card sin variación | Romper la grilla con al menos un elemento |
| Mismo diseño en distintos contextos | Adaptar tono a propósito y audiencia |
| Animaciones en todo sin criterio | Animar solo momentos de impacto |
| Diseño sin DESIGN.md en proyectos con identidad definida | Crear o solicitar DESIGN.md primero |

---

## 9 — Complejidad según visión

| Dirección elegida | Complejidad de código esperada |
|---|---|
| Maximalismo / retro-futurista | Animaciones elaboradas, múltiples capas CSS, efectos complejos |
| Minimalismo / lujo | Precisión milimétrica en espaciado, tipografía perfecta, sin ornamento |
| Playful / orgánico | Componentes con micro-interacciones, SVG animado, variaciones de estado ricas |
