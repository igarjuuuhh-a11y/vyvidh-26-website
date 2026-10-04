/* ==========================================
   VYVIDH '26 - JAVASCRIPT
   Interactivity for Main Events Modal, Gallery Lightbox,
   Slow Smooth Motion Mouse Scroll, Intro Split Curtain,
   Navbar Auto-Hide on Scroll, and Text Reveal Animations
   ========================================== */

// Main Events Data Structure with updated metadata
const mainEventsData = [
  {
    title: "AVISHKAR",
    logo: "MAIN EVENTS/AVISHKAR.png",
    description: "Got a cool project? Show it off, impress the crowd, and compete for the prize pool. This is your stage — own it!",
    prize: "₹10,000",
    date: "26/9/2025",
    type: "Project Expo",
    staff: "Ms. Anu Maria Antony (9562920684)",
    student: "Ms. Jinsi P J (9037805334)"
  },
  {
    title: "FLUXFORUM",
    logo: "MAIN EVENTS/FLEX_FORUM.png",
    description: "Take the stage, share your perspective, and challenge the status quo. Show off your research and compete for the top spot!",
    prize: "₹10,000",
    date: "26/9/2025",
    type: "Paper Presentation",
    staff: "Manesh D (9446370487)",
    student: "Gopika TM (9037794059)"
  },
  {
    title: "IDEAGRAM",
    logo: "MAIN EVENTS/IDEAGRAM.png",
    description: "Bring your ideas, roll up your sleeves, and build something epic. Learn, create, and have fun doing it!",
    prize: "Certificates & Rewards",
    date: "26/9/2025",
    type: "Workshop",
    staff: "Fetsy K Francis (9037986238)",
    student: "Niranjan T (9567058193)"
  },
  {
    title: "IDEATHON",
    logo: "MAIN EVENTS/IDEATHON.png",
    description: "Bring your ideas, roll up your sleeves, and build something epic. Learn, create, and pitch your startup innovation!",
    prize: "₹15,000+",
    date: "26/9/2025",
    type: "Innovation Pitch",
    staff: "Dr. Remya K. R. (MCA)",
    student: "Sneha P. (+91 98765 43213)"
  },
  {
    title: "NAVAYUVA",
    logo: "MAIN EVENTS/NAVAYUVA.png",
    description: "Calling all young innovators! Bring your best projects, battle it out with other brilliant minds, and grab the top spot.",
    prize: "₹25,000",
    date: "26/9/2025",
    type: "School Project Expo",
    staff: "Ms. Jini PJ (9745933148)",
    student: "Vaishnavi C S (9744519179)"
  },
  {
    title: "REELRUSH",
    logo: "MAIN EVENTS/REEL_RUSH.png",
    description: "Got a story to tell? Grab your camera, get creative, and make a reel that steals the show!",
    prize: "₹25,000",
    date: "26/9/2025 - 27/9/2025",
    type: "Reel & Short Film Contest",
    staff: "Mr. Vishnu Rach K. (ME)",
    student: "Devika S. (+91 98765 43215)"
  }
];

/* ==========================================
   1. FAST SPLIT-SCREEN INTRO CURTAIN OPENING
   ========================================== */
function initIntroCurtain() {
  const curtain = document.getElementById('intro-curtain');
  if (!curtain) return;

  // Open curtain fast and smoothly on load
  setTimeout(() => {
    curtain.classList.add('open');
  }, 100);
}

/* ==========================================
   2. NAVBAR HIDE ON SCROLL DOWN / SHOW ON SCROLL UP
   ========================================== */
function initNavbarScrollBehavior() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100 && currentScrollY > lastScrollY) {
      // Scroll Down -> Hide Navbar
      navbar.classList.add('nav-hidden');
    } else {
      // Scroll Up or Top -> Show Navbar
      navbar.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}

/* ==========================================
   3. ANIMATE TEXTS & DESCRIPTIONS ON SCROLL
   ========================================== */
function initTextScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================
   4. SLOW & SMOOTH MOUSE WHEEL SCROLLING
   ========================================== */
function initSlowSmoothScroll() {
  // Mobile & Touch devices use native momentum
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (isTouchDevice || window.innerWidth <= 768) return;

  let currentScroll = window.scrollY;
  let targetScroll = window.scrollY;
  let isScrolling = false;
  const ease = 0.045; // Ultra-silky smooth slow interpolation factor

  window.addEventListener('wheel', (e) => {
    if (document.body.style.overflow === 'hidden') return;

    e.preventDefault();
    targetScroll += e.deltaY * 0.55; // Controlled slow scroll velocity factor
    targetScroll = Math.max(0, Math.min(targetScroll, document.documentElement.scrollHeight - window.innerHeight));

    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(updateScroll);
    }
  }, { passive: false });

  function updateScroll() {
    currentScroll += (targetScroll - currentScroll) * ease;
    window.scrollTo(0, currentScroll);

    if (Math.abs(targetScroll - currentScroll) > 0.3) {
      requestAnimationFrame(updateScroll);
    } else {
      isScrolling = false;
    }
  }

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      targetScroll = window.scrollY;
      currentScroll = window.scrollY;
    }
  }, { passive: true });
}

/* ==========================================
   5. FLOATING AUTO SCROLL CONTROLLER
   ========================================== */
let isAutoScrolling = false;
let autoScrollRafId = null;

function toggleAutoScroll() {
  isAutoScrolling = !isAutoScrolling;
  const btn = document.getElementById('auto-scroll-btn');
  if (!btn) return;

  const icon = btn.querySelector('i');

  if (isAutoScrolling) {
    btn.classList.add('scrolling');
    if (icon) icon.className = 'fa-solid fa-pause';
    startAutoScroll();
  } else {
    stopAutoScroll();
  }
}

function startAutoScroll() {
  function step() {
    if (!isAutoScrolling) return;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScroll - 4) {
      stopAutoScroll();
      return;
    }

    window.scrollBy(0, 2.2);
    autoScrollRafId = requestAnimationFrame(step);
  }
  autoScrollRafId = requestAnimationFrame(step);
}

function stopAutoScroll() {
  isAutoScrolling = false;
  if (autoScrollRafId) {
    cancelAnimationFrame(autoScrollRafId);
    autoScrollRafId = null;
  }
  const btn = document.getElementById('auto-scroll-btn');
  if (btn) {
    btn.classList.remove('scrolling');
    const icon = btn.querySelector('i');
    if (icon) icon.className = 'fa-solid fa-play';
  }
}

window.addEventListener('wheel', () => {
  if (isAutoScrolling) stopAutoScroll();
}, { passive: true });

window.addEventListener('touchstart', () => {
  if (isAutoScrolling) stopAutoScroll();
}, { passive: true });

/* ==========================================
   6. COLLEGE IMAGE BOTTOM-TO-TOP ANIMATION
   ========================================== */
function initCollegeImageAnimation() {
  const collegeImg = document.querySelector('.college-full-img');
  if (!collegeImg) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        collegeImg.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  observer.observe(collegeImg);

  window.addEventListener('scroll', () => {
    const rect = collegeImg.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const translateY = (1 - progress) * 40;
      if (collegeImg.classList.contains('in-view')) {
        collegeImg.style.transform = `translateY(${Math.max(0, translateY)}px)`;
      }
    }
  }, { passive: true });
}

/* ==========================================
   7. MAIN EVENT MODAL HANDLER
   ========================================== */
function openMainEventModal(index) {
  const event = mainEventsData[index];
  if (!event) return;

  document.getElementById('modal-event-title').textContent = event.title;
  document.getElementById('modal-event-logo').src = event.logo;
  document.getElementById('modal-event-logo').alt = event.title + " Logo";
  document.getElementById('modal-event-desc').textContent = event.description;
  document.getElementById('modal-event-prize').textContent = event.prize;
  document.getElementById('modal-event-date').textContent = event.date;
  document.getElementById('modal-event-type').textContent = event.type;
  document.getElementById('modal-event-staff').textContent = event.staff;
  document.getElementById('modal-event-student').textContent = event.student;

  const modal = document.getElementById('event-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMainEventModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('modal-close')) {
    return;
  }
  const modal = document.getElementById('event-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleRegister() {
  const title = document.getElementById('modal-event-title').textContent;
  alert(`Thank you for registering for ${title}! Registration details have been opened.`);
}

/* ==========================================
   8. GALLERY LIGHTBOX
   ========================================== */
function initGalleryLightbox() {
  const puzzleItems = document.querySelectorAll('.puzzle-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  puzzleItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.puzzle-img');
      const caption = item.querySelector('.puzzle-overlay span');
      if (img && lightbox) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption ? caption.textContent : 'Vyvidh Gallery';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================
   9. MOBILE MENU TOGGLE & SCROLL SPY
   ========================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animate = () => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const rect = aboutSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.75 && !animated) {
      animated = true;
      statNumbers.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const speed = Math.ceil(target / 40);

        const updateCount = () => {
          count += speed;
          if (count < target) {
            counter.textContent = `${count}+`;
            setTimeout(updateCount, 30);
          } else {
            counter.textContent = `${target}+`;
          }
        };
        updateCount();
      });
    }
  };

  window.addEventListener('scroll', animate, { passive: true });
  animate();
}

// ESC Key Listener to Close Modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMainEventModal();
    closeLightbox();
  }
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initIntroCurtain();
  initNavbarScrollBehavior();
  initTextScrollAnimations();
  initSlowSmoothScroll();
  initGalleryLightbox();
  initMobileMenu();
  initScrollSpy();
  initAnimatedCounters();
  initCollegeImageAnimation();
});
