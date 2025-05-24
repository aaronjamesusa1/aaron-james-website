// product.js - eBook Product Page Functionality

document.addEventListener('DOMContentLoaded', function() {
  // ====== CART FUNCTIONALITY ======
  const addToCartBtn = document.querySelector('.add-to-cart');
  const buyNowBtn = document.querySelector('.buy-now');
  const cartCount = document.querySelector('.cart-count');
  
  // Initialize cart count
  let cartQuantity = localStorage.getItem('cartQuantity') || 0;
  cartCount.textContent = cartQuantity;
  
  // Add to Cart
  addToCartBtn.addEventListener('click', function() {
    cartQuantity++;
    updateCart();
    showNotification('Added to Cart!');
  });
  
  // Buy Now
  buyNowBtn.addEventListener('click', function() {
    cartQuantity++;
    updateCart();
    window.location.href = 'cart/cart.html';
  });
  
  function updateCart() {
    cartCount.textContent = cartQuantity;
    localStorage.setItem('cartQuantity', cartQuantity);
  }
  
  // Notification System
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <i class="fas fa-check-circle"></i> ${message}
      <a href="cart/cart.html" class="view-cart">View Cart</a>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
  
  // ====== EBOOK PREVIEW FUNCTIONALITY ======
  // (For when you add sample pages)
  const previewButtons = document.querySelectorAll('.preview-btn');
  
  previewButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const pageNum = this.dataset.page;
      showPreview(pageNum);
    });
  });
  
  function showPreview(page) {
    // In a real implementation, this would show a modal with PDF preview
    console.log('Showing preview of page', page);
  }
  
  // ====== REVIEW SYSTEM ======
  const reviewStars = document.querySelectorAll('.rating-input i');
  
  reviewStars.forEach(star => {
    star.addEventListener('click', function() {
      const value = parseInt(this.dataset.value);
      setRating(value);
    });
  });
  
  function setRating(rating) {
    reviewStars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('active');
        star.classList.remove('far');
        star.classList.add('fas');
      } else {
        star.classList.remove('active');
        star.classList.remove('fas');
        star.classList.add('far');
      }
    });
  }
  
  // ====== MOBILE MENU ======
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  mobileMenuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('active');
  });
});

// ====== CART NOTIFICATION STYLES ======
// Added via JavaScript to avoid FOUC
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  .cart-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #27ae60;
    color: white;
    padding: 15px 25px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
  }
  
  .cart-notification.show {
    transform: translateY(0);
    opacity: 1;
  }
  
  .cart-notification i {
    margin-right: 10px;
    font-size: 1.2rem;
  }
  
  .cart-notification .view-cart {
    color: white;
    text-decoration: underline;
    margin-left: 15px;
    font-weight: 600;
  }
`;
document.head.appendChild(notificationStyles);