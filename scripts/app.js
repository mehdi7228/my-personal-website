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
});

// Language Dropdown Functionality
// const dropdownButton = document.getElementById("dropdownLanguage");
// const dropdownItems = document.querySelectorAll(".dropdown-item");

// dropdownItems.forEach(item => {
//     item.addEventListener("click", function (e) {
//         e.preventDefault();
//         const selectedLanguage = this.textContent;
//         dropdownButton.textContent = selectedLanguage;
//         dropdownButton.classList.add("selected-lang");
//     });
// });

document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", handleLanguageChange);
    item.addEventListener("touchstart", handleLanguageChange);
});

function handleLanguageChange(event) {
    event.preventDefault(); // جلوگیری از رفتار پیش‌فرض مرورگر
    const selectedLang = event.target.getAttribute("data-lang");
    if (selectedLang) {
        changeLanguage(selectedLang); // تابعی که زبان را تغییر می‌دهد
    }
}

function changeLanguage(lang) {
    // مثال ساده از تغییر محتوا بر اساس زبان
    const translations = {
        en: "Hello, welcome!",
        fa: "سلام، خوش آمدید!",
        tr: "Merhaba, hoş geldiniz!"
    };

    // اعمال ترجمه جدید به عنوان مثال
    document.getElementById("content").innerText = translations[lang] || "Translation not available.";
}

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

//translations
document.addEventListener("DOMContentLoaded", () => {
    const languageDropdown = document.getElementById("language-dropdown");
  
    // change translate language
    const changeLanguage = (lang) => {
      const elementsToTranslate = document.querySelectorAll("[data-translate]");
      elementsToTranslate.forEach((element) => {
        const key = element.getAttribute("data-translate");
        element.textContent = translations[lang][key];
      });
    };
  
    // change translate by click on language
    languageDropdown.addEventListener("click", (event) => {
      const selectedLang = event.target.getAttribute("data-lang");
      if (selectedLang) {
        changeLanguage(selectedLang);
  
        // show language on button
        const dropdownButton = document.getElementById("dropdownLanguage");
        dropdownButton.textContent = event.target.textContent;
      }
    });
  });