// Typing Animation
const typingText = document.querySelector(".typing-text");
const words = ["Aspiring Data Analyst Intern Specialist", "Web-Developer", "Problem Solver", "Creative Thinker"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => (isDeleting = true), 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, typingSpeed);
}

// Start typing animation
typeWriter();

// Mobile Navigation
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Skills Animation
function animateSkills() {
    const skillBars = document.querySelectorAll(".skill-progress");

    skillBars.forEach((bar) => {
        const width = bar.getAttribute("data-width");
        bar.style.width = width;
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Trigger specific animations
            if (entry.target.classList.contains("about-stats")) {
                animateCounters();
            }

            if (entry.target.classList.contains("skills-grid")) {
                animateSkills();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll("section").forEach((section) => {
    section.classList.add("fade-in");
    observer.observe(section);
});

// Specific observers for stats and skills
const statsSection = document.querySelector(".about-stats");
const skillsSection = document.querySelector(".skills-grid");

if (statsSection) observer.observe(statsSection);
if (skillsSection) observer.observe(skillsSection);

// Contact Form
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector("textarea").value;

    // Simple validation
    if (!name || !email || !subject || !message) {
        alert("Please fill in all fields");
        return;
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector(".btn");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
        alert("Thank you for your message! I'll get back to you soon.");
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    const rate = scrolled * -0.5;

    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// Cursor trail effect (optional)
document.addEventListener("mousemove", (e) => {
    const cursor = document.createElement("div");
    cursor.className = "cursor-trail";
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    document.body.appendChild(cursor);

    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// Add cursor trail styles
const style = document.createElement("style");
style.textContent = `
    .cursor-trail {
        position: fixed;
        width: 10px;
        height: 10px;
        background: rgba(52, 152, 219, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: cursorTrail 1s ease-out forwards;
        z-index: 9999;
    }
    
    @keyframes cursorTrail {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    .loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);