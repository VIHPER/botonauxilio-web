document.addEventListener("DOMContentLoaded", function () {

  console.log("JS de pestañas cargado correctamente");

  const buttons = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".sector-content");
  const sectorLinks = document.querySelectorAll(".sector-link");
  const inlineSectorLinks = document.querySelectorAll(".inline-sector-link");

  function activateSector(target) {
    console.log("Activando sector:", target);

    // Quitar activo a todos
    buttons.forEach(btn => btn.classList.remove("active"));
    contents.forEach(content => content.classList.remove("active"));

    // Activar botón correspondiente
    const activeButton = document.querySelector(
      `.tab-btn[data-sector="${target}"]`
    );
    if (activeButton) {
      activeButton.classList.add("active");
    }

    // Activar sección
    const activeSection = document.getElementById(target);
    if (activeSection) {
      activeSection.classList.add("active");
    } else {
      console.error("No existe un div con id:", target);
    }

    // Scroll suave hacia arriba
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Botones del HERO
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-sector");
      activateSector(target);
    });
  });

  // Títulos grandes (Sector Educativo, Gobierno, etc.)
  sectorLinks.forEach(link => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-sector");
      activateSector(target);
    });
  });

  // Links inline dentro de texto (educativos, industriales, etc.)
  inlineSectorLinks.forEach(link => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-sector");
      activateSector(target);
    });
  });

});
