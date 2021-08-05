// Kode til at toggle burger menuen
function burgerToggle() {
    const navLinks = document.querySelector("#nav-links");
    // Hvis navLinks er vist, skjul den da
    if (navLinks.style.display === "block") {
        navLinks.style.display = "";
    // ellers vis den
    } else {
        navLinks.style.display = "block";
    }
}