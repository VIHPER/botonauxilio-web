document.addEventListener("DOMContentLoaded", function () {

  console.log("JS de pestañas cargado correctamente");

  const buttons = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".sector-content");

  buttons.forEach(button => {
    button.addEventListener("click", () => {

      const target = button.getAttribute("data-sector");
      console.log("Botón presionado:", target);

      // Quitar activo a todos
      buttons.forEach(btn => btn.classList.remove("active"));
      contents.forEach(content => content.classList.remove("active"));

      // Activar el seleccionado
      button.classList.add("active");
      const activeSection = document.getElementById(target);
      if (activeSection) {
        activeSection.classList.add("active");
      } else {
        console.error("No existe un div con id:", target);
      }
    });
  });

});
