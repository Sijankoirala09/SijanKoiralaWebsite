/**
 * SIJAN KOIRALA — PORTFOLIO JAVASCRIPT
 * Apple-Inspired Interactions & Micro-animations
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // PROJECT DATA DICTIONARY (For Modal Lightbox)
  // ==========================================================================
  const projectDetails = {
    p1: {
      title: 'Luminary Architects Brand Identity',
      category: 'Identity & Typography',
      year: '2026',
      image: 'assets/projects/project-1.svg',
      description: 'A comprehensive branding system designed for a high-end architectural studio. Focused on structural geometric monograms, bespoke typographic hierarchy, and a restrained monochromatic color palette inspired by modern minimalist architecture.',
      tags: ['Brand Identity', 'Monogram Design', 'Design Guidelines', 'Stationery']
    },
    p2: {
      title: 'Himalaya Editorial Poster Series',
      category: 'Editorial & Print',
      year: '2026',
      image: 'assets/projects/project-2.svg',
      description: 'An experimental typographic poster collection inspired by the majestic contours and high-altitude landscapes of Nepal. Utilizes strict Swiss grid layout rules, asymmetrical text placement, and bold typography.',
      tags: ['Poster Series', 'Swiss Design', 'Typography', 'Exhibition']
    },
    p3: {
      title: 'Aura Audio Labs Visual Identity',
      category: 'Sound Identity & Motion',
      year: '2026',
      image: 'assets/projects/project-3.svg',
      description: 'Visual identity system for a spatial sound engineering collective. Translates harmonic frequencies into iridescent waveforms, organic curves, and frosted glass user interface assets.',
      tags: ['Visual Identity', 'Generative Art', 'Key Visuals', 'Digital Assets']
    },
    p4: {
      title: 'Kāvya Botanicals Luxury Packaging',
      category: 'Packaging & Art Direction',
      year: '2026',
      image: 'assets/projects/project-4.svg',
      description: 'Tactile packaging concept for an organic Himalayan apothecary line. Features custom frosted dark-amber glass apothecary bottles, foil-stamped labels, and sustainable unboxing architecture.',
      tags: ['Packaging Design', 'Bottle Mockups', 'Print Finishes', 'Art Direction']
    },
    p5: {
      title: 'Nexus 3D Visual Explorations',
      category: '3D Exploration & Motion',
      year: '2026',
      image: 'assets/projects/project-5.svg',
      description: 'A series of 3D spatial renders exploring refractive materials, geometric caustics, and cinematic lighting in Blender. Created as hero visual assets for digital brand storytelling.',
      tags: ['3D Modeling', 'Blender', 'Lighting & Shaders', 'Digital Art']
    },
    p6: {
      title: 'Monolith Archive Minimal Catalogue',
      category: 'Branding & Editorial',
      year: '2026',
      image: 'assets/projects/project-6.svg',
      description: 'Brutalist exhibition monograph and archive catalogue. Explores heavy typography, structural grid systems, and monochrome materiality with tactile binding specifications.',
      tags: ['Editorial Design', 'Book Design', 'Brutalist Grid', 'Typography']
    }
  };

  // ==========================================================================
  // CURSOR SPOTLIGHT EFFECT (Apple Keynote Style)
  // ==========================================================================
  const spotlight = document.getElementById('cursorSpotlight');
  if (spotlight && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth animation loop for spotlight
    function animateSpotlight() {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      spotlight.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      requestAnimationFrame(animateSpotlight);
    }
    requestAnimationFrame(animateSpotlight);
  } else if (spotlight) {
    spotlight.style.display = 'none';
  }

  // ==========================================================================
  // SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================================================
  // PORTFOLIO FILTERING
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ==========================================================================
  // PROJECT DETAIL MODAL / LIGHTBOX
  // ==========================================================================
  const modal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImage = document.getElementById('modalImage');
  const modalCategory = document.getElementById('modalCategory');
  const modalYear = document.getElementById('modalYear');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const modalTags = document.getElementById('modalTags');

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalCategory.textContent = data.category;
    modalYear.textContent = data.year;
    modalTitle.textContent = data.title;
    modalText.textContent = data.description;

    modalTags.innerHTML = '';
    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'modal-tag';
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.getAttribute('data-modal');
      openProjectModal(modalId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // ==========================================================================
  // COPY EMAIL TO CLIPBOARD WITH TOAST
  // ==========================================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'sijankoirala.design@gmail.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        showToast('Email copied to clipboard!');
      } catch (err) {
        showToast('Email: ' + email);
      }
    });
  }

  // ==========================================================================
  // MOBILE NAVIGATION DRAWER
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target) && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
      }
    });
  }

  // ==========================================================================
  // BACK TO TOP
  // ==========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // DYNAMIC COPYRIGHT YEAR
  // ==========================================================================
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // NAVBAR SCROLL ELEVATION
  // ==========================================================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.top = '12px';
    } else {
      header.style.top = '20px';
    }
  });

});
