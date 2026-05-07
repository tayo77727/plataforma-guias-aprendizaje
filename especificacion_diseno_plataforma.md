# Especificación de Diseño: Plataforma Virtual de Aprendizaje (Aula Invertida)

## 1. Visión General del Proyecto
**Objetivo:** Desarrollar una plataforma educativa bajo el modelo de Aula Invertida (Flipped Classroom), orientada a estudiantes de grado 11 en Colombia.
**Tecnologías:** HTML5, CSS3 (Vanilla o modular), JavaScript (ES6+). No se requieren frameworks pesados, asegurando máxima compatibilidad y rendimiento.
**Hosting:** Optimizada para ser desplegada en Hostinger (arquitectura estática o estática con JS).
**Diseño:** Responsive, moderno, atractivo y enfocado en la experiencia de usuario (UX/UI) para jóvenes.

## 2. Arquitectura de Contenidos (Módulos y Sesiones)
Basado en el diagrama estratégico, la plataforma se dividirá en 3 módulos principales que abarcan 5 sesiones de aprendizaje tecnológico:

### MÓDULO 1: Dominando la Micro:bit
*   **Sesión 1:** Intro a MicroPython
    *   *Recursos:* Video explicativo + Guía de aprendizaje.
*   **Sesión 2:** Sensores y Contexto Social
    *   *Recursos:* Video interactivo + Guía de Ideación.

### MÓDULO 2: Machine Learning Aplicado
*   **Sesión 3:** Entrenamiento de Modelos
    *   *Recursos:* Video tutorial + Guía de Machine Learning (ML).

### MÓDULO 3: De la Idea a la Realidad
*   **Sesión 4:** Motores e Integración Final
    *   *Recursos:* Video práctico + Guía de Ensamble.
*   **Sesión 5:** Presentación y Debate
    *   *Recursos:* Guía de Socialización (foro, espacio de debate o instrucciones de subida de proyectos).

## 3. Propuesta de Diseño UI/UX
Para conectar con estudiantes de grado 11 en Colombia, el diseño debe ser dinámico, visualmente impactante e intuitivo.

*   **Paleta de Colores:** Tonos vibrantes pero profesionales que evoquen tecnología y creatividad.
    *   *Color Principal:* Azul oscuro o morado profundo.
    *   *Acentos:* Colores vivos como verde neón, cian o naranja (ideal para botones CTA - Llamados a la acción).
    *   *Fondo/Estilo:* Soporte nativo para Modo Oscuro (Dark Mode), uso de "Glassmorphism" (efectos de cristal esmerilado translúcido) para tarjetas y menús, dándole un toque premium.
*   **Tipografía:** Fuentes modernas de Google Fonts.
    *   *Títulos:* `Outfit` o `Montserrat` (fuertes, geométricas y modernas).
    *   *Cuerpo de texto:* `Inter` o `Roboto` (alta legibilidad en pantallas pequeñas).
*   **Elementos Visuales y de Interacción:**
    *   Micro-animaciones (hover effects suaves en botones y tarjetas).
    *   Barras de progreso visuales para gamificar la experiencia y mostrar el avance del estudiante.
    *   Enfoque "Mobile-First": Diseño pensado primordialmente para celulares, adaptándose a tablets y escritorios de forma fluida.

## 4. Estructura Modular del Proyecto (Archivos)
Arquitectura recomendada para mantener el código limpio y fácil de subir al administrador de archivos de Hostinger:

```text
plataforma-matide/
│
├── index.html          # Página de inicio / Dashboard (Resumen de Módulos y Progreso)
├── modulo1.html        # Página del Módulo 1 (Sesión 1 y 2)
├── modulo2.html        # Página del Módulo 2 (Sesión 3)
├── modulo3.html        # Página del Módulo 3 (Sesión 4 y 5)
│
├── css/
│   ├── variables.css   # Variables CSS (Colores, tipografías, espaciados)
│   ├── base.css        # Reset de estilos universales
│   ├── layout.css      # Estilos estructurales (Header, Footer, Grillas)
│   └── components.css  # Tarjetas, botones, alertas, barras de progreso
│
├── js/
│   ├── main.js         # Lógica global (menú hamburguesa, modo oscuro)
│   ├── progress.js     # Lógica simulada/local para rastrear progreso
│   └── components.js   # Interactividad específica (modales, tabs)
│
└── assets/
    ├── img/            # Imágenes, íconos (SVG preferiblemente), logos
    ├── videos/         # (Opcional) Si no se embeben de YouTube/Vimeo
    └── docs/           # Guías en PDF (Guía de Ideación, Guía de ML, etc.)
```

## 5. Especificaciones de Componentes Clave

1.  **Header/Barra de Navegación:** Sticky header con el logo "Matide" o del proyecto, menú (Inicio, Módulos) e indicador de perfil. En móviles, menú hamburguesa.
2.  **Hero Section (Dashboard):** Saludo motivacional y un bloque destacado mostrando el "Próximo paso" o "Continuar donde lo dejaste".
3.  **Tarjetas de Sesiones (Cards):** Bloques interactivos para cada sesión.
    *   *Estados Visuales:* Bloqueado (opaco/candado), Disponible (iluminado), Completado (con check verde o medalla).
4.  **Layout de Aprendizaje (Aula Invertida):**
    *   Zona principal superior: Reproductor de video amplio.
    *   Zona inferior/lateral: Panel de "Recursos Descargables" (botones para las Guías PDF).
5.  **Botón de Acción Final:** Al terminar el video y descargar la guía, un botón grande para "Marcar sesión como completada".

## 6. Prompting / Instrucciones para el Próximo Modelo (Generación de Código)
Para usar este documento como base para generar el código:
1.  **Genera el `index.html`** implementando el Dashboard principal con las 5 sesiones distribuidas en los 3 módulos, utilizando HTML5 semántico.
2.  **Crea el sistema CSS** (basado en la estructura de la sección 4) implementando un diseño oscuro (Dark Theme) con efectos Glassmorphism y botones en colores vibrantes. Usa Flexbox/Grid para hacer el diseño 100% responsivo.
3.  **Añade `main.js`** para manejar la apertura del menú en móviles y una simulación básica de la barra de progreso general.
4.  Asegúrate de incluir espacios (placeholders o iconos de FontAwesome/Phosphor Icons) para los videos y los botones de descarga de las guías correspondientes.
