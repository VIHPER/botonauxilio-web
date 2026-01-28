document.addEventListener("DOMContentLoaded", function () {

  console.log("JS de pestañas cargado correctamente");

  const buttons = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".sector-content");
  const sectorLinks = document.querySelectorAll(".sector-link");
  const inlineSectorLinks = document.querySelectorAll(".inline-sector-link");
  const contactBtn = document.getElementById("contactBtn");

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

    // Activar sección correspondiente
    const activeSection = document.getElementById(target);
    if (activeSection) {
      activeSection.classList.add("active");
    } else {
      console.error("No existe un div con id:", target);
    }

    // Scroll al HERO
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Botones de sector
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-sector");
      activateSector(target);
    });
  });

  // Títulos grandes de sector
  sectorLinks.forEach(link => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-sector");
      activateSector(target);
    });
  });

  // Links inline dentro del texto
  inlineSectorLinks.forEach(link => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-sector");
      activateSector(target);
    });
  });

  // Botón Contacto
  contactBtn.addEventListener("click", () => {
    const activeSector = document.querySelector(".sector-content.active");
    if (!activeSector) return;

    let contactSection = null;

    const sections = activeSector.querySelectorAll("section");
    sections.forEach(sec => {
      const h2 = sec.querySelector("h2");
      if (h2 && h2.textContent.toLowerCase().includes("contacto")) {
        contactSection = sec;
      }
    });

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("No se encontró sección de contacto en el sector activo");
    }
  });

});
