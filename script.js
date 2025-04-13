document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Set dynamic greeting based on the current time
    const greetingElement = document.getElementById("greeting");
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        greetingElement.innerHTML = `Good Morning<span class="emoji">😊</span>`;
    } else if (currentHour < 18) {
        greetingElement.innerHTML = `Good Afternoon<span class="emoji">😎</span>`;
    } else {
        greetingElement.innerHTML = `Good Evening<span class="emoji">🌙</span>`;
    }

    // Create star background container
    const stars = document.createElement("div");
    stars.className = "stars";

    // Add stars only in dark mode
    const toggleStars = (isDark) => {
        if (isDark) {
            if (!document.querySelector(".stars")) {
                document.body.appendChild(stars);
            }
        } else {
            const existingStars = document.querySelector(".stars");
            if (existingStars) {
                existingStars.remove();
            }
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        const isDark = savedTheme === "dark";
        body.classList.toggle("dark-mode", isDark);
        themeToggle.textContent = isDark ? "☀" : "☾";
        toggleStars(isDark);
    }

    // Toggle theme on button click
    themeToggle.addEventListener("click", () => {
        const isDarkMode = body.classList.toggle("dark-mode");
        themeToggle.textContent = isDarkMode ? "☀" : "☾";
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        toggleStars(isDarkMode);
    });

    

    // Typing effect on .input span inside the <p>
    var typed = new Typed(".input", {
        strings: ["Database Administrator", "Data Engineer", "Web Developer", "Microsoft Excel Data Analyst"],
        typeSpeed: 100,
        backSpeed: 100,
        loop: true
    });

    // Back to Top button logic
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
