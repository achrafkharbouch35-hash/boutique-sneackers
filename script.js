/* =========================================
   SOLEX — MEN'S SNEAKERS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     CONFIGURATION
  ========================================= */

  // 🔴 CHANGE THIS TO YOUR REAL WHATSAPP NUMBER
  const WHATSAPP_NUMBER = "212600000000";

  /* =========================================
     LOADER
  ========================================= */

  const loader = document.querySelector(".loader");

  window.addEventListener("load", () => {

    setTimeout(() => {
      loader.classList.add("hide");
      document.body.classList.remove("no-scroll");
    }, 1700);

  });

  /* =========================================
     CUSTOM CURSOR
  ========================================= */

  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  if (window.innerWidth > 900) {

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener("mousemove", (e) => {

      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";

    });

    function animateCursor() {

      followerX += (mouseX - followerX) * .12;
      followerY += (mouseY - followerY) * .12;

      follower.style.left = followerX + "px";
      follower.style.top = followerY + "px";

      requestAnimationFrame(animateCursor);

    }

    animateCursor();

    document.querySelectorAll("a, button, .product-image").forEach(el => {

      el.addEventListener("mouseenter", () => {
        follower.classList.add("hover");
      });

      el.addEventListener("mouseleave", () => {
        follower.classList.remove("hover");
      });

    });

  }

  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileClose = document.querySelector(".mobile-close");

  menuBtn.addEventListener("click", () => {

    mobileMenu.classList.add("active");
    document.body.classList.add("no-scroll");

  });

  mobileClose.addEventListener("click", () => {

    mobileMenu.classList.remove("active");
    document.body.classList.remove("no-scroll");

  });

  document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");

    });

  });

  /* =========================================
     SEARCH
  ========================================= */

  const searchOverlay = document.querySelector(".search-overlay");
  const searchOpen = document.querySelector(".search-open");
  const searchClose = document.querySelector(".search-close");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  const products = [...document.querySelectorAll(".product-card")];

  searchOpen.addEventListener("click", () => {

    searchOverlay.classList.add("active");
    document.body.classList.add("no-scroll");

    setTimeout(() => {
      searchInput.focus();
    }, 300);

  });

  searchClose.addEventListener("click", closeSearch);

  function closeSearch() {

    searchOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
    searchInput.value = "";
    searchResults.innerHTML = "";

  }

  searchInput.addEventListener("input", () => {

    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
      searchResults.innerHTML = "";
      return;
    }

    const matches = products.filter(product => {

      const name = product.dataset.name.toLowerCase();

      return name.includes(query);

    });

    if (!matches.length) {

      searchResults.innerHTML = `
        <div class="search-result">
          <span>Aucun résultat</span>
          <span>—</span>
        </div>
      `;

      return;
    }

    searchResults.innerHTML = matches.map(product => {

      return `
        <div class="search-result">
          <strong>${product.dataset.name}</strong>
          <span>${Number(product.dataset.price).toLocaleString("fr-FR")} DH</span>
        </div>
      `;

    }).join("");

  });

  /* =========================================
     FILTERS
  ========================================= */

  const filters = document.querySelectorAll(".filter");

  filters.forEach(filter => {

    filter.addEventListener("click", () => {

      filters.forEach(item => item.classList.remove("active"));

      filter.classList.add("active");

      const selected = filter.dataset.filter;

      products.forEach(product => {

        const categories = product.dataset.category;

        if (
          selected === "all" ||
          categories.includes(selected)
        ) {

          product.style.display = "";

          setTimeout(() => {
            product.style.opacity = "1";
            product.style.transform = "translateY(0)";
          }, 50);

        } else {

          product.style.opacity = "0";
          product.style.transform = "translateY(20px)";

          setTimeout(() => {
            product.style.display = "none";
          }, 300);

        }

      });

    });

  });

  /* =========================================
     MOBILE FILTER BUTTON
  ========================================= */

  const filterToggle = document.querySelector(".filter-toggle");
  const filterContainer = document.querySelector(".filters");

  filterToggle.addEventListener("click", () => {

    filterContainer.classList.toggle("active");

    const symbol = filterToggle.querySelector("span");

    symbol.textContent =
      filterContainer.classList.contains("active")
        ? "−"
        : "+";

  });

  /* =========================================
     HEARTS
  ========================================= */

  document.querySelectorAll(".heart").forEach(heart => {

    heart.addEventListener("click", (e) => {

      e.stopPropagation();

      heart.classList.toggle("liked");

      heart.textContent =
        heart.classList.contains("liked")
          ? "♥"
          : "♡";

    });

  });

  /* =========================================
     PRODUCT MODAL
  ========================================= */

  const modal = document.getElementById("productModal");
  const modalBg = document.querySelector(".modal-bg");
  const modalClose = document.querySelector(".modal-close");

  const modalImage = document.getElementById("modalImage");
  const modalName = document.getElementById("modalName");
  const modalPrice = document.getElementById("modalPrice");

  const sizeButtons = document.querySelectorAll(".size-grid button");

  let currentProduct = null;
  let selectedSize = null;

  document.querySelectorAll(".quick-view").forEach(button => {

    button.addEventListener("click", (e) => {

      const product = e.target.closest(".product-card");

      currentProduct = product;

      const image = product.querySelector("img").src;
      const name = product.dataset.name;
      const price = product.dataset.price;

      modalImage.src = image;
      modalName.textContent = name;
      modalPrice.textContent =
        Number(price).toLocaleString("fr-FR") + " DH";

      sizeButtons.forEach(size => {
        size.classList.remove("selected");
      });

      selectedSize = null;

      modal.classList.add("active");
      document.body.classList.add("no-scroll");

    });

  });

  function closeModal() {

    modal.classList.remove("active");
    document.body.classList.remove("no-scroll");

  }

  modalClose.addEventListener("click", closeModal);
  modalBg.addEventListener("click", closeModal);

  sizeButtons.forEach(button => {

    button.addEventListener("click", () => {

      sizeButtons.forEach(item => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");

      selectedSize = button.textContent;

    });

  });

  /* =========================================
     CART
  ========================================= */

  let cart = [];

  const cartDrawer = document.querySelector(".cart-drawer");
  const cartOverlay = document.querySelector(".cart-overlay");

  const cartOpenButtons = document.querySelectorAll(".cart-open");
  const cartClose = document.querySelector(".cart-close");

  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  function openCart() {

    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.classList.add("no-scroll");

  }

  function closeCart() {

    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");

  }

  cartOpenButtons.forEach(button => {
    button.addEventListener("click", openCart);
  });

  cartClose.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  /* =========================================
     ADD TO CART
  ========================================= */

  const addCartButton = document.querySelector(".add-cart-modal");

  addCartButton.addEventListener("click", () => {

    if (!selectedSize) {

      alert("Veuillez sélectionner une pointure.");

      return;

    }

    const productName = currentProduct.dataset.name;
    const price = Number(currentProduct.dataset.price);
    const image = currentProduct.querySelector("img").src;

    const item = {
      id: Date.now(),
      name: productName,
      price: price,
      image: image,
      size: selectedSize
    };

    cart.push(item);

    updateCart();
    closeModal();
    openCart();

  });

  /* =========================================
     UPDATE CART
  ========================================= */

  function updateCart() {

    const countElements =
      document.querySelectorAll(".cart-count");

    countElements.forEach(element => {
      element.textContent = cart.length;
    });

    if (!cart.length) {

      cartItems.innerHTML = `
        <div class="empty-cart">
          <div>🛒</div>
          <p>Your bag is empty.</p>
          <button class="continue-shopping">
            CONTINUE SHOPPING
          </button>
        </div>
      `;

      const continueButton =
        cartItems.querySelector(".continue-shopping");

      continueButton.addEventListener("click", closeCart);

    } else {

      cartItems.innerHTML = cart.map(item => {

        return `
          <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">

              <strong>${item.name}</strong>

              <span>
                Pointure ${item.size}
              </span>

              <span>
                ${item.price.toLocaleString("fr-FR")} DH
              </span>

            </div>

            <button
              class="remove-item"
              data-id="${item.id}"
            >
              ×
            </button>

          </div>
        `;

      }).join("");

      document.querySelectorAll(".remove-item").forEach(button => {

        button.addEventListener("click", () => {

          const id = Number(button.dataset.id);

          cart = cart.filter(item => item.id !== id);

          updateCart();

        });

      });

    }

    const total = cart.reduce(
      (sum, item) => sum + item.price,
      0
    );

    cartTotal.textContent =
      total.toLocaleString("fr-FR") + " DH";

  }

  /* =========================================
     WHATSAPP ORDER
  ========================================= */

  const whatsappOrder =
    document.getElementById("whatsappOrder");

  whatsappOrder.addEventListener("click", () => {

    if (!cart.length) {

      alert("Votre panier est vide.");

      return;

    }

    let message =
      "Bonjour SOLEX 👟%0A%0A" +
      "Je souhaite commander :%0A%0A";

    cart.forEach((item, index) => {

      message +=
        `${index + 1}. ${item.name}%0A` +
        `Pointure : ${item.size}%0A` +
        `Prix : ${item.price.toLocaleString("fr-FR")} DH%0A%0A`;

    });

    const total = cart.reduce(
      (sum, item) => sum + item.price,
      0
    );

    message +=
      `Total : ${total.toLocaleString("fr-FR")} DH`;

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    window.open(url, "_blank");

  });

  /* =========================================
     SCROLL REVEAL
  ========================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: .12
      }
    );

  revealElements.forEach(element => {
    observer.observe(element);
  });

  /* =========================================
     COUNTER ANIMATION
  ========================================= */

  const counters =
    document.querySelectorAll("[data-number]");

  const counterObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const element = entry.target;

          const target =
            Number(element.dataset.number);

          let current = 0;

          const duration = 1200;
          const start = performance.now();

          function animateCounter(time) {

            const progress =
              Math.min(
                (time - start) / duration,
                1
              );

            current =
              Math.floor(progress * target);

            element.textContent = current;

            if (progress < 1) {

              requestAnimationFrame(
                animateCounter
              );

            } else {

              element.textContent = target;

            }

          }

          requestAnimationFrame(animateCounter);

          counterObserver.unobserve(element);

        });

      },
      {
        threshold: .7
      }
    );

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  /* =========================================
     MAGNETIC BUTTONS
  ========================================= */

  if (window.innerWidth > 900) {

    document.querySelectorAll(".magnetic").forEach(button => {

      button.addEventListener("mousemove", e => {

        const rect =
          button.getBoundingClientRect();

        const x =
          e.clientX -
          rect.left -
          rect.width / 2;

        const y =
          e.clientY -
          rect.top -
          rect.height / 2;

        button.style.transform =
          `translate(${x * .12}px, ${y * .12}px)`;

      });

      button.addEventListener("mouseleave", () => {

        button.style.transform =
          "translate(0, 0)";

      });

    });

  }

  /* =========================================
     PARALLAX HERO
  ========================================= */

  const heroImage =
    document.querySelector(".hero-image img");

  window.addEventListener("scroll", () => {

    if (window.scrollY < window.innerHeight) {

      heroImage.style.transform =
        `translateY(${window.scrollY * .12}px) scale(1.03)`;

    }

  });

  /* =========================================
     ESCAPE KEY
  ========================================= */

  document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

      closeSearch();
      closeModal();
      closeCart();

      mobileMenu.classList.remove("active");

      document.body.classList.remove("no-scroll");

    }

  });

});
