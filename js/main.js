document.addEventListener("DOMContentLoaded", function () {
  
  console.log("JS de pestañas cargado correctamente");

  /* =====================================================
    NUEVA ARQUITECTURA: APLICACIONES / PRODUCTOS
  ===================================================== */

  let activeSector = null;

  const mainTabs = document.querySelectorAll(".main-tab");
  const subTabsContainers = document.querySelectorAll(".sub-tabs");
  const subTabs = document.querySelectorAll(".sub-tab");
  const contents = document.querySelectorAll(".sector-content");
  const contactBtn = document.getElementById("contactBtn");

  // FUNCIÓN CENTRAL  
  function activateSector(sectorId) {

    if (!sectorId) return;

    // Reset contenidos
    contents.forEach(c => c.classList.remove("active"));

    const activeContent = document.getElementById(sectorId);
    if (activeContent) {
      activeContent.classList.add("active");
      activeSector = sectorId;
    }

    // Determinar grupo automáticamente
    let group = null;

    if (sectorId.startsWith("sector-")) {
      group = "applications";
    }

    if (sectorId.startsWith("producto-")) {
      group = "products";
    }

    if (!group) return;

    // Activar main-tab correcto
    mainTabs.forEach(t => t.classList.remove("active"));
    const activeMainTab = document.querySelector(`.main-tab[data-group="${group}"]`);
    if (activeMainTab) activeMainTab.classList.add("active");

    // Mostrar sub-tabs correcto
    subTabsContainers.forEach(container => {
      container.classList.remove("active");
    });

    const activeContainer = document.getElementById(group + "-tabs");
    if (activeContainer) {
      activeContainer.classList.add("active");
    }

    // Activar sub-tab correcto
    subTabs.forEach(t => t.classList.remove("active"));
    const activeSubTab = document.querySelector(`.sub-tab[data-sector="${sectorId}"]`);
    if (activeSubTab) activeSubTab.classList.add("active");

    // Scroll al hero
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  }

  // LISTENERS PARA SUBTABS
  subTabs.forEach(tab => {
    tab.addEventListener("click", function () {
      const sectorId = tab.dataset.sector;
      activateSector(sectorId);
    });
  });


  // LISTENERS PARA LINKS INLINE
  const inlineLinks = document.querySelectorAll(".inline-sector-link");

  inlineLinks.forEach(link => {
    link.addEventListener("click", function () {
      const sectorId = link.dataset.sector;
      activateSector(sectorId);
    });
  });

  /* ===============================
    LISTENERS PARA BLOQUES SECTOR (HOME)
  =============================== */

  const sectorLinks = document.querySelectorAll(".sector-link");

  sectorLinks.forEach(link => {
    link.addEventListener("click", function () {
      const sectorId = link.dataset.sector;
      activateSector(sectorId);
    });
  });

  
  /* ===============================
    CAMBIO ENTRE APLICACIONES / PRODUCTOS
  =============================== */

  mainTabs.forEach(tab => {
    tab.addEventListener("click", function () {

      const group = tab.dataset.group;
      if (!group) return;

      // Si ya estamos en ese grupo, no hacemos nada
      const currentActive = document.querySelector(".main-tab.active");
      if (currentActive === tab) return;

      // Definir sector por defecto
      let defaultSector = null;

      if (group === "applications") {
        defaultSector = "sector-edu";
      }

      if (group === "products") {
        defaultSector = "producto-basic";
      }

      // Activar sector automáticamente
      activateSector(defaultSector);

    });
  });

  


  /* ===============================
     BOTÓN CONTACTO (PROTEGIDO)
  =============================== */
  if (contactBtn) {
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
  }

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
      sectorField.value = getSectorLabel(activeSector);

      const timestampField = document.getElementById("timestampField");

      // Fecha y hora local México (UTC-6 aprox)
      const now = new Date();

      const timestamp = now.toLocaleString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
      });

      timestampField.value = timestamp;

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

  // Lógica para rotación de imagen en dispositivos móviles
  const zoomDiagram = document.querySelector('.zoom-diagram');
  const overlay = document.querySelector('.zoom-overlay');

  if (zoomDiagram && overlay) {

    // ABRIR / CERRAR desde la imagen
    zoomDiagram.addEventListener('click', function(e) {
      if (window.innerWidth <= 767) {

        if (!this.classList.contains('rotated')) {
          // ABRIR
          this.classList.add('rotated');
          overlay.classList.add('active');
          document.body.classList.add('no-scroll');
        } else {
          // CERRAR
          closeImage();
        }

        e.stopPropagation(); // 🔥 evita conflictos con overlay
      }
    });

    // CERRAR tocando fuera
    overlay.addEventListener('click', function() {
      closeImage();
    });

    function closeImage() {
      zoomDiagram.classList.remove('rotated');
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');

      // 🔥 Fuerza re-render (soluciona desaparición)
      zoomDiagram.style.display = 'none';
      zoomDiagram.offsetHeight; 
      zoomDiagram.style.display = '';
    }
  }

  // Detectar rotación o cambio de tamaño
  window.addEventListener('resize', handleOrientationChange);
  window.addEventListener('orientationchange', handleOrientationChange);

  function handleOrientationChange() {
    if (zoomDiagram.classList.contains('rotated')) {
      // Recalcular layout correctamente
      fixRotatedImage();
    }
  }

  function fixRotatedImage() {
    // Paso 1: quitar temporalmente la clase
    zoomDiagram.classList.remove('rotated');

    // Paso 2: forzar reflow limpio
    zoomDiagram.style.display = 'none';
    zoomDiagram.offsetHeight;
    zoomDiagram.style.display = '';

    // Paso 3: volver a aplicar la clase
    zoomDiagram.classList.add('rotated');
  }

});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && zoomDiagram.classList.contains('rotated')) {
    fixRotatedImage();
  }
});