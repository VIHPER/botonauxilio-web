document.addEventListener("DOMContentLoaded", function () {
  
  let activeSector = null;
  let sectorClickCount = {
    educacion: 0,
    gobierno: 0,
    industrial: 0
  };


  console.log("JS de pestañas cargado correctamente");

  const buttons = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".sector-content");
  const sectorLinks = document.querySelectorAll(".sector-link");
  const inlineSectorLinks = document.querySelectorAll(".inline-sector-link");
  const contactBtn = document.getElementById("contactBtn");

  function activateSector(target) {
    activeSector = target;

    if (sectorClickCount[target] !== undefined) {
      sectorClickCount[target]++;
    }

    console.log("Sector activo:", activeSector);
    console.log("Clicks por sector:", sectorClickCount);

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

  const contactModal = document.getElementById("contactModal");
  const closeModal = document.querySelector(".close-modal");

  // 🔒 FORZAR MODAL CERRADO AL CARGAR
  contactModal.style.display = "none";


  const contactOpenButtons = document.querySelectorAll(".contact-open-btn");

  contactOpenButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      contactModal.style.display = "flex";
    });
  });

  // Cerrar con la X
  closeModal.addEventListener("click", () => {
    contactModal.style.display = "none";
  });

  // Cerrar haciendo click fuera
  window.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.style.display = "none";
    }
  });


  // Formulario de contacto con modal de agradecimiento
  const contactForm = document.getElementById("contactForm");
  const thankYouModal = document.getElementById("thankYouModal");
  const closeThankYou = document.getElementById("closeThankYou");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const sectorField = document.getElementById("sectorField");
      sectorField.value = activeSector ?? "no_definido";

      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          contactForm.reset();
          thankYouModal.style.display = "flex";
        } else {
          alert("Ocurrió un error al enviar el mensaje. Intenta nuevamente.");
        }
      }).catch(() => {
        alert("Error de conexión. Revisa tu internet.");
      });
    });
  }

  // Botón cerrar modal
  closeThankYou.addEventListener("click", function () {
    thankYouModal.style.display = "none";
  });

  // Cerrar al hacer clic fuera
  thankYouModal.addEventListener("click", function (e) {
    if (e.target === thankYouModal) {
      thankYouModal.style.display = "none";
    }
  });

  
});
