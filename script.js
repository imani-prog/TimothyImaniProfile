document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Set dynamic greeting based on the current time
    const greetingElement = document.getElementById("greeting");
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
        greetingElement.textContent = "Good Morning 😊";
    } else if (currentHour < 18) {
        greetingElement.textContent = "Good Afternoon 😊";
    } else {
        greetingElement.textContent = "Good Evening 😊";
    }

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        body.classList.toggle("dark-mode", savedTheme === "dark");
        themeToggle.textContent = savedTheme === "dark" ? "☀" : "☾";
    }

    // Toggle theme on button click
    themeToggle.addEventListener("click", () => {
        const isDarkMode = body.classList.toggle("dark-mode");
        themeToggle.textContent = isDarkMode ? "☀" : "☾";
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });
});
