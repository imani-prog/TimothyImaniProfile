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
    
// Create star rain effect
    function createColorfulStar() {
        const colors = ['#FFD700', '#FFFFFF', '#ADD8E6', '#FFFAF0', '#F0E68C', 'blue', 'purple', 'pink', 'orange', 'red', 'green', 'yellow', 'cyan', 'magenta', 'lime', 'teal', 'navy', 'maroon', 'olive', 'silver', 'gray'];
        const size = Math.random() * 12 + 10; // size between 10px and 22px
      
        // Create SVG element
        const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        star.setAttribute("viewBox", "0 0 24 24");
        star.setAttribute("width", size);
        star.setAttribute("height", size);
        star.classList.add('star'); // Add .star class for animation and positioning
      
        // Create star shape path
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M12 2l2.9 6.6L22 9.3l-5 5.1 1.2 7.6L12 18l-6.2 4 1.2-7.6-5-5.1 7.1-0.7L12 2z");
        path.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)]);
      
        star.appendChild(path);
      
        // Set position and animation
        star.style.position = "absolute";
        star.style.left = Math.random() * window.innerWidth + "px";
        star.style.top = "0px";
        star.style.animation = `fall ${1.5 + Math.random() * 1.5}s linear`;
      
        // Append to container
        document.getElementById('starContainer').appendChild(star);
      
        // Remove after 6 seconds
        setTimeout(() => {
          star.remove();
        }, 6000);
      }
      
      // Start the star rain
      window.addEventListener('load', () => {
        const interval = setInterval(() => {
          for (let i = 0; i < 20; i++) {
            createColorfulStar(); // 20 stars per wave
          }
        }, 200);
      
        setTimeout(() => clearInterval(interval), 3000); // Stop spawning after 3 seconds
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
