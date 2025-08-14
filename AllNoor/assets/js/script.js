'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});




document.getElementById("readMoreBtn").addEventListener("click", function(e) {
    e.preventDefault();
    const mission = document.getElementById("missionText");
    const btnText1 = this.querySelector(".text-1");
    const btnText2 = this.querySelector(".text-2");

    if (mission.style.display === "none" || mission.style.display === "") {
        mission.style.display = "block";
        btnText1.textContent = "Read Less";
        btnText2.textContent = "Read Less";
    } else {
        mission.style.display = "none";
        btnText1.textContent = "Read More";
        btnText2.textContent = "Read More";
    }
});





/**
 * 
 * 
 * menu item 
 */
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuItems = document.querySelectorAll(".menu-item");
  const viewAllBtn = document.getElementById("view-all-btn");

  let activeCategory = "all";
  let showAll = false;
  const defaultLimit = 4; // items before "View All"

  function renderMenu() {
    menuItems.forEach(item => item.style.display = "none"); // hide all

    if (activeCategory === "all" && !showAll) {
      // Group items by category
      const categories = {};
      menuItems.forEach(item => {
        item.classList.forEach(cls => {
          if (cls !== "menu-item") {
            categories[cls] = categories[cls] || [];
            categories[cls].push(item);
          }
        });
      });

      // Take 1 random item from each category until we have up to defaultLimit
      let selected = [];
      Object.keys(categories).forEach(cat => {
        if (selected.length < defaultLimit && categories[cat].length > 0) {
          let randomItem = categories[cat][Math.floor(Math.random() * categories[cat].length)];
          selected.push(randomItem);
        }
      });

      selected.forEach(item => item.style.display = "block");

    } else {
      // Filter normally
      const filteredItems = [...menuItems].filter(item =>
        activeCategory === "all" || item.classList.contains(activeCategory)
      );

      filteredItems.forEach((item, index) => {
        if (!showAll && index >= defaultLimit) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      });
    }
  }

  // Filter button click
  filterButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      filterButtons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");

      activeCategory = this.getAttribute("data-filter");
      showAll = false;
      viewAllBtn.querySelector(".text-1").textContent = "View All Menu";
      viewAllBtn.querySelector(".text-2").textContent = "View All Menu";

      renderMenu();
    });
  });

  // View All button click
  viewAllBtn.addEventListener("click", function () {
    showAll = !showAll;
    this.querySelector(".text-1").textContent = showAll ? "Show Less" : "View All Menu";
    this.querySelector(".text-2").textContent = showAll ? "Show Less" : "View All Menu";
    renderMenu();
  });

  renderMenu();
});



/**
 * services
 */
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('modalImg').src = this.dataset.img;
    document.getElementById('modalName').textContent = this.dataset.name;
    document.getElementById('modalDesc').textContent = this.dataset.desc;
    document.getElementById('modalPrice').textContent = this.dataset.price;
    document.getElementById('modalIngredients').textContent = this.dataset.ingredients;
    document.getElementById('galleryModal').style.display = 'flex';
  });
});

document.getElementById('galleryModal').addEventListener('click', function (e) {
  if (e.target === this) { // close only if background clicked
    this.style.display = 'none';
  }
});


