// after document loads
document.addEventListener("DOMContentLoaded", function() {
    // Initialize dropdowns
    document.querySelectorAll(".dropdown-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        const dropdown = this.nextElementSibling;
        dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });
    });
});
