var typed= new Typed(".text", {
strings: [" Web Developer" , " Java Developer", "Scrum Master"],
typeSpeed: 100,
backSpeed: 100,
backDelay: 1000,
loop: true


});
var sections = document.querySelectorAll(".animated-section");

sections.forEach(function(section) {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Entrando en la sección
        section.style.opacity = "1";
        section.style.visibility = "visible";
      } else {
        // Saliendo de la sección
        section.style.opacity = "0";
        section.style.visibility = "hidden";
      }
    });
  }, { threshold: 0.1 }); 

  observer.observe(section);
});

const text = "I am a web and Java application developer with a strong background in Systems Engineering. I completed my degree at Universidad Mariano Gálvez and specialize in creating customized solutions for small businesses. My expertise includes web development, computer systems, research methodology, analytical skills, teamwork, and mathematical abilities. I also have extensive knowledge in web technologies like JavaScript, HTML5, CSS3, Bootstrap, MySQL, and Others. I am experienced in professional development practices, software documentation, team leadership, responsive design, and creating user-friendly interfaces.";

const words = text.split(' ');
let index = 0;
const speed = 100; 

function typeWriter() {
  const container = document.getElementById("custom-text");
  if (index < words.length) {
    container.innerHTML += words[index] + ' ';
    index++;
    if (container.scrollHeight > container.offsetHeight) {
      container.innerHTML += '<br>';
    }
    setTimeout(typeWriter, speed);
  }
}

function startTypingAnimation() {
  const container = document.getElementById("custom-text");
  container.innerHTML = '';
  index = 0;
  typeWriter();
}


window.addEventListener("scroll", function() {
  const section = document.querySelector(".about-text");
  const sectionPosition = section.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (sectionPosition < screenHeight && !section.classList.contains("animation-started")) {
    section.classList.add("animation-started");
    startTypingAnimation();
  }
});

const edd = document.querySelector(".edd");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".edd i");
const carouselChildrens = [...carousel.children];
let isDragging = false,
  isAutoPlay = true,
  
  startScrollLeft,
  timeoutId;
// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}
const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!edd.matches(":hover")) autoPlay();
}
const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
edd.addEventListener("mouseenter", () => clearTimeout(timeoutId));
edd.addEventListener("mouseleave", autoPlay);

// Agregar la funcionalidad Draggable al slider
const slider = document.querySelector(".card-slider");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});


ScrollReveal().reveal('.animate__animated', {
    delay: 200,
    duration: 1000,
    distance: '50px',
    origin: 'bottom',
    easing: 'ease-out',
    interval: 200
});
