// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const distance = tomorrow - now;
    
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('countdown').innerHTML = 
        String(hours).padStart(2, '0') + ':' + 
        String(minutes).padStart(2, '0') + ':' + 
        String(seconds).padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Spots counter (simulates decreasing spots)
let spots = 7;
function updateSpots() {
    if (Math.random() < 0.1 && spots > 1) { // 10% chance to decrease
        spots--;
        document.getElementById('spots').textContent = spots;
        
        // Save to localStorage to persist across page reloads
        localStorage.setItem('spotsLeft', spots);
    }
}

// Load spots from localStorage or set default
const savedSpots = localStorage.getItem('spotsLeft');
if (savedSpots) {
    spots = parseInt(savedSpots);
    document.getElementById('spots').textContent = spots;
}

// Update spots every 30 seconds
setInterval(updateSpots, 30000);

// Mobile menu toggle
const navMenu = document.querySelector('.nav-menu');
const navBrand = document.querySelector('.nav-brand');

if (navMenu && navBrand) {
    navBrand.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}