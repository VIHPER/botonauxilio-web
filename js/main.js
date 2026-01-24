document.addEventListener("DOMContentLoaded", function () {

  console.log("JS de pestañas cargado correctamente");

  const buttons = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".sector-content");
  const sectorLinks = document.querySelectorAll(".sector-link");

  function activateSector(target) {
    console.log("Activando sector:", target);

    // Quitar activo a todos
    buttons.forEach(btn => btn.classList.remove("active"));
    contents.forEach(content => content.classList.remove("active"));

    // Activar el botón correcto
    const activeButton = document.querySelector(
      `.tab-btn[data-sector="${target}"]`
    );
    if (activeButton) {
      activeButton.classList.add("active");
    }

    // Activar el contenido correcto
    const activeSection = document.getElementById(target);
    if (activeSection) {
      activeSection.classList.add("active");
    } else {
      console.error("No existe un div con id:", target);
    }
  }

  // Click en botones del HERO
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-sector");
      activateSector(target);
    });
  });

  // Click en títulos de sectores al final de la página
  sectorLinks.forEach(link => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-sector");
      activateSector(target);
    });
  });

});
