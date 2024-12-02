document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  toggleButton.addEventListener("click", () => {
      navMenu.classList.toggle("show");
  });
});

// Existing cart functionality from the previous implementation
document.addEventListener('DOMContentLoaded', () => {
  let cartItems = [];
  let cartTotal = 0;

  // Cart Modal Elements
  const cartModal = document.getElementById('cart-modal');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total-amount');
  const cartCloseBtn = document.querySelector('.cart-close');
  const checkoutButton = document.getElementById('checkout-button');

  // Create and append cart icon
  const cartIcon = document.createElement('div');
  cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>';
  cartIcon.id = 'cart-icon';
  
  const socialFooter = document.querySelector('.social-footer');
  if (socialFooter) {
    socialFooter.appendChild(cartIcon);
  }

  // Add to Cart Functionality
  function addToCart(event) {
    const merchandiseItem = event.target.closest('.merch-item');
    const name = merchandiseItem.querySelector('.merch-name').textContent;
    const price = parseFloat(
      merchandiseItem.querySelector('.merch-price').textContent.slice(1)
    );

    const item = { name, price };
    cartItems.push(item);
    cartTotal += price;

    updateCartDisplay();
    
    event.target.textContent = 'Added!';
    event.target.disabled = true;
  }

  // Attach event listeners to all "Add to Cart" buttons
  function attachCartListeners() {
    const addToCartButtons = document.querySelectorAll('.merch-button');
    addToCartButtons.forEach((button) => {
      button.addEventListener('click', addToCart);
    });
  }

  // Update Cart Display
  function updateCartDisplay() {
    cartItemsContainer.innerHTML = cartItems.map((item, index) => `
      <div class="cart-item">
        ${item.name} - $${item.price.toFixed(2)}
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `).join('');
    
    cartTotalElement.textContent = cartTotal.toFixed(2);
  }

  // Remove Item from Cart
  window.removeItem = (index) => {
    cartTotal -= cartItems[index].price;
    cartItems.splice(index, 1);
    updateCartDisplay();
  };

  // Cart Icon Click to Open Modal
  cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
  });

  // Close Cart Modal
  cartCloseBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });

  // Checkout Button
  checkoutButton.addEventListener('click', () => {
    alert(`Checkout total: $${cartTotal.toFixed(2)}`);
    cartItems = [];
    cartTotal = 0;
    updateCartDisplay();
    cartModal.style.display = 'none';
  });

  // Initial setup
  attachCartListeners();
});