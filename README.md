# Portafolio de Proyectos - Santiago Sterling

## Características

### Mejoras Implementadas

-  **Código Organizado**: CSS y JavaScript en archivos separados
-  **SEO Optimizado**: Meta tags completos para redes sociales
-  **Accesibilidad**: Atributos ARIA y soporte para lectores de pantalla
-  **Responsive Design**: Funciona en móviles, tablets y desktop
-  **Enlaces Funcionales**: Links reales a LinkedIn, GitHub y más
-  **Sistema de Filtros**: Filtra proyectos por categoría
-  **Lazy Loading**: Carga de imágenes optimizada
-  **Smooth Scrolling**: Navegación suave
-  **Dark Mode Support**: Compatible con modo oscuro del sistema
-  **Google Analytics Ready**: Preparado para analytics
-  **Seguridad**: Links externos con rel="noopener noreferrer"

##  Estructura del Proyecto

```
proyecto/
├── index.html          # Página principal
├── css/
│   └── styles.css     # Todos los estilos
├── js/
│   └── main.js        # Toda la funcionalidad
└── README.md          # Este archivo
```

## Cómo Personalizar

### 1. Agregar un Nuevo Proyecto

En `index.html`, dentro de `<div id="feed-posts">`, agrega:

```html
<div class="card post-card" 
     data-author="Nombre del Proyecto"
     data-avatar="URL_DE_TU_IMAGEN"
     data-headline="Tecnologías usadas"
     data-time="2025"
     data-category="web"          <!-- 'web' o 'excel' -->
     data-content="Descripción completa del proyecto con detalles..."
     data-images="imagen1.jpg,imagen2.jpg,imagen3.jpg"
     data-github="https://github.com/tu-usuario/tu-repo"
     data-demo="https://tu-demo.com"
     data-likes="0"
     data-comments="0"
     data-shares="0">
</div>
```

### 2. Cambiar Enlaces Personales

Busca y reemplaza en `index.html`:

```javascript
// LinkedIn
https://linkedin.com/in/santiago-sterling
→ https://linkedin.com/in/TU-PERFIL

// GitHub
https://github.com/Santiago131440
→ https://github.com/TU-USUARIO

// Email
santiago.sterling@example.com
→ tu-email@ejemplo.com
```

### 3. Configurar Google Analytics

En `index.html`, línea cerca del final:

```html
<!-- Reemplaza G-XXXXXXXXXX con tu ID de Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU-ID-AQUI"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'TU-ID-AQUI');
</script>
```

### 4. Cambiar Colores

En `css/styles.css`, modifica las variables CSS:

```css
:root {
    --primary-blue: #0a66c2;      /* Color principal */
    --primary-dark: #004182;      /* Color oscuro */
    --background: #f3f2ef;        /* Fondo */
    --card-bg: #ffffff;           /* Fondo de tarjetas */
    --success-green: #057642;     /* Verde de éxito */
}
```

## 🖼️ Optimización de Imágenes

### Recomendaciones:

1. **Usa servicios de hosting de imágenes:**
   - [Cloudinary](https://cloudinary.com) (gratis hasta 25GB)
   - [ImgBB](https://imgbb.com) (gratis)
   - [GitHub](https://github.com) (ya lo estás usando)

2. **Comprime imágenes antes de subir:**
   - [TinyPNG](https://tinypng.com)
   - [Squoosh](https://squoosh.app)

3. **Tamaños recomendados:**
   - Avatar: 150x150px
   - Imágenes de proyectos: 800x600px máximo
   - Peso: menos de 500KB por imagen

## 🚀 Cómo Publicar

### Opción 1: GitHub Pages (Gratis)

1. Sube todo a un repositorio de GitHub
2. Ve a Settings → Pages
3. Selecciona la rama `main` y carpeta `/ (root)`
4. Tu sitio estará en: `https://tu-usuario.github.io/nombre-repo`

### Opción 2: Netlify (Gratis)

1. Ve a [Netlify](https://netlify.com)
2. Arrastra la carpeta del proyecto
3. Tu sitio estará listo en segundos

### Opción 3: Vercel (Gratis)

1. Ve a [Vercel](https://vercel.com)
2. Importa desde GitHub
3. Deploy automático

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🎯 Categorías de Proyectos

- `all`: Todos los proyectos
- `web`: Desarrollo web (HTML, CSS, JS, React, etc.)
- `excel`: Proyectos de Excel VBA

Puedes agregar más categorías editando el filtro en `index.html`.

## ⚡ Performance

- Lazy loading automático de imágenes
- CSS y JS minificados (usa herramientas como [CSS Minifier](https://cssminifier.com))
- Smooth scrolling activado
- Animaciones optimizadas con `cubic-bezier`

## 🔒 Seguridad

- Todos los enlaces externos usan `rel="noopener noreferrer"`
- Escape de HTML en comentarios para prevenir XSS
- Sin dependencias externas peligrosas

## 🎨 Personalización Avanzada

### Agregar Más Secciones

Edita `index.html` y añade después de la sección CTA:

```html
<div class="card" style="padding: 32px;">
    <h2>Tu Nueva Sección</h2>
    <p>Contenido aquí...</p>
</div>
```

### Cambiar Fuentes

En `index.html`, head:

```html
<link href="https://fonts.googleapis.com/css2?family=TU-FUENTE&display=swap" rel="stylesheet">
```

Y en `css/styles.css`:

```css
body {
    font-family: 'TU-FUENTE', sans-serif;
}
```

## 📞 Soporte

Si encuentras algún problema:

1. Revisa la consola del navegador (F12)
2. Verifica que todos los archivos estén en las carpetas correctas
3. Asegúrate de que las rutas CSS/JS sean correctas

## 📄 Licencia

Este proyecto es de código abierto. Puedes usarlo y modificarlo libremente.

## 🙏 Créditos

- Diseño inspirado en LinkedIn
- Iconos: [Flaticon](https://flaticon.com)
- Fuentes: [Google Fonts](https://fonts.google.com)
- Avatares de ejemplo: [Pravatar](https://pravatar.cc)

---

**¡Hecho con ❤️ por Santiago Sterling!**


Si te gusta este proyecto, ¡no olvides darle una estrella en GitHub! ⭐
