// after document loads
document.addEventListener("DOMContentLoaded", function() {
    // Helper: normalize the pathname for comparison (resolve relative hrefs)
    function normalizePath(path) {
        if (!path) return '/index.html';
        // Ensure we have an absolute URL then return pathname without trailing slash
        try {
            const url = new URL(path, location.href);
            let p = url.pathname || '/';
            // Normalize directory index to explicit index.html
            if (p.endsWith('/')) p += 'index.html';
                return p;
        } catch (e) {
            return path;
        }
    }

    const currentPath = normalizePath(location.pathname || location.href);

    // Initialize dropdowns
    document.querySelectorAll(".dropdown-btn").forEach(btn => {
        const dropdown = btn.nextElementSibling;

        // Preserve click toggle behavior and update aria-expanded/class
        btn.addEventListener("click", function() {
            const isOpen = dropdown.style.display === "block";
            dropdown.style.display = isOpen ? "none" : "block";
            btn.classList.toggle("current", !isOpen);
            btn.setAttribute('aria-expanded', String(!isOpen));
        });

        // If any link inside the dropdown matches the current page, mark that exact link and expand
        if (dropdown) {
            const links = dropdown.querySelectorAll("a[href]");
            let matchedLink = null;
            links.forEach(a => {
                try {
                    const href = a.getAttribute('href');
                    const aPath = normalizePath(href);
                    if (aPath === currentPath) {
                        matchedLink = a;
                    }
                } catch (e) {
                    // ignore invalid hrefs
                }
            });
            if (matchedLink) {
                // Expand this dropdown and mark button + link
                dropdown.style.display = "block";
                btn.classList.add("current");
                dropdown.classList.add("current");
                btn.setAttribute('aria-expanded', 'true');
                // add class to the exact matching link for styling
                matchedLink.classList.add('current-link');
            } else {
                btn.setAttribute('aria-expanded', 'false');
            }
        }
    });
});



