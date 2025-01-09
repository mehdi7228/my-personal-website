// Smooth Scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

document.querySelectorAll("a").forEach(anchor => {
    if (anchor.getAttribute("href").startsWith("#")) {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute("href"));
            target.scrollIntoView({ behavior: "smooth" });
        });

        anchor.addEventListener("touchstart", (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute("href"));
            target.scrollIntoView({ behavior: "smooth" });
        });
    }
});

//translations
document.addEventListener("DOMContentLoaded", () => {
    const languageDropdown = document.getElementById("language-dropdown");
    const dropdownButton = document.getElementById("dropdownLanguage");

    const changeLanguage = (lang) => {
        const elementsToTranslate = document.querySelectorAll("[data-translate]");
        elementsToTranslate.forEach((element) => {
            const key = element.getAttribute("data-translate");
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    };

    document.querySelectorAll(".dropdown-item").forEach((item) => {
        const handleEvent = (event) => {
            event.preventDefault();
            const selectedLang = item.getAttribute("data-lang");
            if (selectedLang) {
                changeLanguage(selectedLang);

                dropdownButton.innerHTML = item.innerHTML;
            }
        };

        item.addEventListener("click", handleEvent);
        item.addEventListener("touchstart", handleEvent, { passive: true });
    });
});

// Skills progress-bar functionality
document.addEventListener("scroll", () => {
    const skillsSection = document.querySelector(".skills-section");
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight) {
        const progressBars = document.querySelectorAll(".progress");
        progressBars.forEach(bar => {
            const percentage = bar.getAttribute("data-percentage"); // Target percentage
            bar.style.width = `${percentage}%`; // Set progress bar width
        });
    }
});

// Dark mode functionality
const darkModeToggle = document.getElementById("darkModeToggle");
const toggleIcon = document.getElementById("toggleIcon");

darkModeToggle.addEventListener("click", () => {
document.body.classList.toggle("dark-mode");

darkModeToggle.classList.toggle("dark-mode");
  
if (document.body.classList.contains("dark-mode")) {
  toggleIcon.classList.replace("bi-moon-fill", "bi-sun-fill"); // ماه به خورشید
} else {
  toggleIcon.classList.replace("bi-sun-fill", "bi-moon-fill"); // خورشید به ماه
}
});

// Prevent transition flicker on page load
document.body.classList.add("no-transition");

// Apply dark mode if saved in localStorage
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    toggleIcon.classList.remove("bi-moon-fill");
    toggleIcon.classList.add("bi-sun-fill");
}

// Remove no-transition class after page is fully loaded
window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove("no-transition");
});


// Show or hide the button based on scrolling
window.addEventListener("scroll", function () {
    const backToTopButton = document.getElementById("backToTop");
    if (window.scrollY > 300) {
        backToTopButton.classList.remove("hidden");
    } else {
        backToTopButton.classList.add("hidden");
    }
});

// scroll page up by click
document.getElementById("backToTop").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

const backToTopButton = document.getElementById("backToTop");
let hideTimeout;

// Managing the visibility of the button during scrolling.
window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTopButton.classList.remove("hidden");
        
        clearTimeout(hideTimeout);
        
        hideTimeout = setTimeout(() => {
            backToTopButton.classList.add("hidden");
        }, 2000);
    } else {
        backToTopButton.classList.add("hidden");
    }
});

backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// sent message successfully
const form = document.querySelector("form");
const confirmationMessage = document.getElementById("confirmation-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: { Accept: "application/json" },
  })
    .then(() => {
      confirmationMessage.style.display = "block";
      form.reset();
    })
    .catch(() => {
      alert("There was an error sending your message. Please try again.");
    });
});