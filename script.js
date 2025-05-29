document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Greeting based on time
    const greetingElement = document.getElementById("greeting");
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        greetingElement.innerHTML = `Good Morning <span class="emoji">😊</span>`;
    } else if (currentHour < 18) {
        greetingElement.innerHTML = `Good Afternoon <span class="emoji">😎</span>`;
    } else {
        greetingElement.innerHTML = `Good Evening <span class="emoji">😎</span>`;
    }

    //typing effect
    new Typed(".input", {
        strings: ["Software Developer", "Database Administrator", "Data Engineer"],
        typeSpeed: 100,
        backSpeed: 100,
        loop: true
    });

    // Theme toggle
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        const isDark = savedTheme === "dark";
        body.classList.toggle("dark-mode", isDark);
        themeToggle.textContent = isDark ? "☀" : "☾";
    }

    themeToggle.addEventListener("click", () => {
        const isDarkMode = body.classList.toggle("dark-mode");
        themeToggle.textContent = isDarkMode ? "☀" : "☾";
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });

    // Back to top
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
