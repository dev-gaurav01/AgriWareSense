// Enhanced script.js for Smart Warehouse Dashboard

console.log("Smart Warehouse Dashboard Loaded");

// DOM Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const userMenuToggle = document.getElementById('userMenuToggle');
const logoutBtn = document.getElementById('logoutBtn');
const inventorySearch = document.getElementById('inventorySearch');
const inventorySort = document.getElementById('inventorySort');
const loadMoreInventory = document.getElementById('loadMoreInventory');

// Mobile Menu Toggle
if (mobileMenuToggle && navLinks) {
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.innerHTML = navLinks.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
}

// Authentication & Session Management
function checkAuthentication() {
  const token = localStorage.getItem("access_token");
  
  // For demo purposes - in a real app, this would validate the token
  if (token) {
    console.log("User is authenticated");
    return true;
  }
  
  // For development, comment this out to stay on the page even without auth
  // window.location.href = "login.html";
  return false;
}

// Logout function
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("access_token");
    sessionStorage.clear();
    console.log("User logged out");
    // Redirect to login page
    window.location.href = "login.html";
  });
}

// Fetch and display inventory
function fetchInventory() {
  // For demo purposes - show loading state
  const inventoryGrid = document.getElementById("inventoryGrid");
  if (!inventoryGrid) return;
  
  inventoryGrid.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading inventory...</div>';
  
  // In a real application, this would be an API endpoint
  // For now, we'll use a timeout to simulate network request
  setTimeout(() => {
    // Sample data - in production, this would come from your API
    const data = {
      inventory: [
        {
          item_name: "Grains",
          quantity: "2,450 kg",
          last_updated: "2h ago",
          image: "DALL·E 2025-02-20 21.47.19 - A detailed and realistic image of various Indian grains arranged in traditional bowls and sacks. The display includes rice, wheat, millet, lentils, ch.webp"
        },
        {
          item_name: "Vegetables",
          quantity: "1,320 kg",
          last_updated: "1h ago",
          image: "DALL·E 2025-02-20 21.45.28 - A vibrant assortment of fresh Indian vegetables arranged beautifully. The image includes tomatoes, brinjals (eggplants), green chilies, okra, bitter g.webp"
        },
        {
          item_name: "Fruits",
          quantity: "980 kg",
          last_updated: "30m ago",
          image: "DALL·E 2025-02-20 21.48.50 - A detailed and realistic image of various Indian fruits arranged in a traditional basket. The display includes mangoes, bananas, guavas, pomegranates,.webp"
        },
        {
          item_name: "Seeds",
          quantity: "560 kg",
          last_updated: "4h ago",
          image: "DALL·E 2025-02-20 22.02.41 - A detailed and realistic image of various Indian lentils arranged in neatly organized boxes. The display includes red lentils (masoor dal), yellow spl.webp"
        }
      ]
    };

    renderInventory(data.inventory);
  }, 800);
}

// Render inventory items to the grid
function renderInventory(items) {
  const grid = document.getElementById("inventoryGrid");
  if (!grid) return;

  grid.innerHTML = "";
  
  if (items && items.length > 0) {
    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "inventory-item";
      div.innerHTML = `
        <div class="item-image">
          <img src="${item.image}" alt="${item.item_name}">
        </div>
        <h3>${item.item_name}</h3>
        <div class="item-stats">
          <span><i class="fas fa-weight"></i> ${item.quantity}</span>
          <span><i class="fas fa-calendar-alt"></i> Updated ${item.last_updated}</span>
        </div>
        <button class="btn" onclick="window.location.href='${item.item_name.toLowerCase()}.html'">
          <i class="fas fa-info-circle"></i> View Details
        </button>
      `;
      grid.appendChild(div);
    });
  } else {
    grid.innerHTML = '<div class="no-data">No inventory items found</div>';
  }
}

// Search functionality
if (inventorySearch) {
  inventorySearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.inventory-item');
    
    items.forEach(item => {
      const itemName = item.querySelector('h3').textContent.toLowerCase();
      if (itemName.includes(searchTerm)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// Sorting functionality
if (inventorySort) {
  inventorySort.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    const grid = document.getElementById('inventoryGrid');
    const items = Array.from(grid.querySelectorAll('.inventory-item'));
    
    items.sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = a.querySelector('h3').textContent;
        const nameB = b.querySelector('h3').textContent;
        return nameA.localeCompare(nameB);
      } else if (sortBy === 'quantity') {
        const qtyA = a.querySelector('.item-stats span:first-child').textContent;
        const qtyB = b.querySelector('.item-stats span:first-child').textContent;
        return qtyB.localeCompare(qtyA); // Higher quantities first
      } else if (sortBy === 'updated') {
        const timeA = a.querySelector('.item-stats span:last-child').textContent;
        const timeB = b.querySelector('.item-stats span:last-child').textContent;
        return timeA.localeCompare(timeB); // Recently updated first
      }
      return 0;
    });
    
    // Clear and re-append sorted items
    grid.innerHTML = '';
    items.forEach(item => grid.appendChild(item));
  });
}

// Load more inventory items
if (loadMoreInventory) {
  loadMoreInventory.addEventListener('click', () => {
    // In a real app, this would load the next page of inventory items
    const additionalItems = [
      {
        item_name: "Dairy",
        quantity: "860 kg",
        last_updated: "5h ago",
        image: "DALL·E 2025-02-20 21.48.50 - A detailed and realistic image of various Indian fruits arranged in a traditional basket. The display includes mangoes, bananas, guavas, pomegranates,.webp"
      },
      {
        item_name: "Spices",
        quantity: "320 kg",
        last_updated: "2d ago",
        image: "DALL·E 2025-02-20 22.02.41 - A detailed and realistic image of various Indian lentils arranged in neatly organized boxes. The display includes red lentils (masoor dal), yellow spl.webp"
      }
    ];
    
    const grid = document.getElementById("inventoryGrid");
    
    additionalItems.forEach(item => {
      const div = document.createElement("div");
      div.className = "inventory-item";
      div.innerHTML = `
        <div class="item-image">
          <img src="${item.image}" alt="${item.item_name}">
        </div>
        <h3>${item.item_name}</h3>
        <div class="item-stats">
          <span><i class="fas fa-weight"></i> ${item.quantity}</span>
          <span><i class="fas fa-calendar-alt"></i> Updated ${item.last_updated}</span>
        </div>
        <button class="btn" onclick="window.location.href='${item.item_name.toLowerCase()}.html'">
          <i class="fas fa-info-circle"></i> View Details
        </button>
      `;
      grid.appendChild(div);
    });
    
    // Hide the load more button after loading extra items
    loadMoreInventory.style.display = 'none';
  });
}

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is authenticated
  checkAuthentication();
  
  // Initialize inventory if on the right page
  if (document.getElementById("inventoryGrid")) {
    fetchInventory();
  }
  
  // Initialize animations and transitions
  document.querySelectorAll('.inventory-item, .stat-card').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = item.classList.contains('inventory-item') 
        ? 'translateY(-8px)' 
        : 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0)';
    });
  });
});

// Notification system (simulated)
function setupNotifications() {
  const notificationBell = document.querySelector('.notification-bell');
  
  if (notificationBell) {
    notificationBell.addEventListener('click', () => {
      alert('Notifications feature coming soon!');
    });
  }
}

// Call notification setup
setupNotifications();

// Connect to WebSocket
const ws = new WebSocket('ws://localhost:4000');

// Handle incoming messages
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'alert') {
    // Show alert notification on the home page
    const alertNotification = document.getElementById('alertNotification');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = data.message;
    alertNotification.style.display = 'flex';

    // Add alert to the alerts page
    const alertsList = document.getElementById('alertsList');
    if (alertsList) {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert ${data.severity}`;
      alertDiv.innerHTML = `
        <div class="alert-header">
          <span>${data.message}</span>
          <span class="alert-time">${data.timestamp}</span>
        </div>
        <div class="alert-details">
          <p>${data.details}</p>
        </div>
      `;
      alertsList.appendChild(alertDiv);
    }
  }
};