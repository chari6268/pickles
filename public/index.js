document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "";
    }, 150);
  });
});

document.querySelectorAll(".product-card").forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02) rotateY(5deg)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1) rotateY(0deg)";
  });
});

function route(page) {
  if (page === "home") {
    window.location.href = "./index.html";
  } else if (page === "veg-pickles") {
    window.location.href = "screen1.html";
  } else if (page === "non-veg-pickles") {
    window.location.href = "screen2.html";
  } else if (page === "snacks") {
    window.location.href = "screen3.html";
  } else if (page === "cart") {
    window.location.href = "cart.html";
  } else if (page === "login") {
    window.location.href = "login.html";
  } else if (page === "signup") {
    window.location.href = "signup.html";
  } else if (page === "contact") {
    window.location.href = "contact.html";
  } else if (page === "about") {
    window.location.href = "about.html";
  }
}

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".pickle-bg");
  const speed = scrolled * 0.5;
  parallax.style.transform = `translateY(${speed}px)`;
});

function addToCart() {
  const button = event.target;
  const card = button.closest(".product-card");
  const title = card.querySelector(".product-title").textContent;
  const priceMatch = title.match(/₹(\d+(\.\d+)?)/);
  const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

  const product = {
    name: title,
    price: price,
    quantity: 1,
  };

  // Get existing cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if item already exists
  const existing = cart.find((item) => item.name === product.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(product);
  }

  // Save updated cart
  localStorage.setItem("cart", JSON.stringify(cart));

  // Show animation/message
  button.classList.add("added-animation");
  card.classList.add("added-animation");
  const originalText = button.textContent;
  button.textContent = "Added!";
  button.style.background = "#4CAF50";
  const successMessage = document.getElementById("successMessage");
  successMessage.classList.add("show");

  setTimeout(() => {
    button.classList.remove("added-animation");
    card.classList.remove("added-animation");
    button.textContent = originalText;
    button.style.background = "#d2691e";
    successMessage.classList.remove("show");
  }, 2000);
}
