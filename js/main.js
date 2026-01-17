document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".sector-content");

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const target = this.getAttribute("data-sector");

      // Quitar estado activo de todos los botones
      buttons.forEach(btn => btn.classList.remove("active"));

      // Ocultar todos los contenidos
      contents.forEach(content => content.classList.remove("active"));

      // Activar el botón actual
      this.classList.add("active");

      // Mostrar el contenido correspondiente
      const activeContent = document.getElementById(target);
      if (activeContent) {
        activeContent.classList.add("active");
      }
    });
  });
});
