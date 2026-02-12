document.addEventListener("DOMContentLoaded", function () {

  const params = new URLSearchParams(window.location.search);
  const fromSector = params.get("from");

  const backLink = document.getElementById("back-link");
  const breadcrumbContext = document.getElementById("breadcrumb-context");

  function getSectorLabel(sectorId) {
    switch (sectorId) {
      case "sector-edu":
        return "Educación / Universidades";
      case "sector-gov":
        return "Gobierno / C4-C5";
      case "sector-ind":
        return "Industrial / Residencial";
      case "movil":
        return "Aplicación Móvil";
      default:
        return null;
    }
  }

  const label = getSectorLabel(fromSector);

  if (label && backLink) {
    backLink.textContent = "← Volver a " + label;
    backLink.href = "index.html?sector=" + fromSector;

    if (breadcrumbContext) {
      breadcrumbContext.textContent = " / " + label;
    }
  } else {
    // Si no hay parámetro válido
    backLink.textContent = "← Volver al Inicio";
    backLink.href = "index.html";
  }

});
