const imageUrls = [
  "https://picsum.photos/id/1015/390/844",
  "https://picsum.photos/id/1016/390/844",
  "https://picsum.photos/id/1025/390/844",
  "https://picsum.photos/id/1027/390/844",
  "https://picsum.photos/id/1033/390/844",
  "https://picsum.photos/id/1042/390/844",
  "https://picsum.photos/id/1047/390/844",
  "https://picsum.photos/id/1052/390/844",
  "https://picsum.photos/id/1062/390/844",
  "https://picsum.photos/id/1069/390/844",
  "https://picsum.photos/id/1080/390/844",
  "https://picsum.photos/id/1084/390/844",
  "https://picsum.photos/id/1090/390/844",
  "https://picsum.photos/id/1095/390/844",
  "https://picsum.photos/id/1097/390/844"
];

const confettiIcons = ['fas fa-ribbon', 'fas fa-heart', 'fas fa-candy-cane', 'fas fa-crown', 'fas fa-birthday-cake', 'fas fa-star', 'fas fa-music'];

const confettiContainer = document.getElementById('confetti');
const imageSlider = document.getElementById('image-slider');

function generateConfetti() {
  for (let i = 0; i < 100; i++) {
    let confetti = document.createElement('i');
    let icon = confettiIcons[Math.floor(Math.random() * confettiIcons.length)];
    confetti.className = `confetti-icon ${icon}`;
    
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.animationDuration = (Math.random() * 3 + 3) + 's'; 
    confetti.style.opacity = Math.random();
    confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';

    confettiContainer.appendChild(confetti);
  }
}

let currentIndex = 0;

function generateImageSlider() {
  imageUrls.forEach((url) => {
    const img = document.createElement('img');
    img.src = url;
    imageSlider.appendChild(img);
  });

  showNextImage();
}

function showNextImage() {
  const images = document.querySelectorAll('#image-slider img');
  images.forEach((img, index) => {
    if (index === currentIndex) {
      img.style.transform = 'translateX(0) scale(1)';
    } else {
      img.style.transform = 'translateX(100%) scale(0.9)';
    }
  });

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showNextImage();
  }, 3000); 
}

let touchStartX = 0;
imageSlider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});
imageSlider.addEventListener('touchend', (e) => {
  let touchEndX = e.changedTouches[0].screenX;
  if (touchEndX < touchStartX) {
    currentIndex = (currentIndex + 1) % imageUrls.length; 
  } else if (touchEndX > touchStartX) {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length; 
  }
  showNextImage();
});

generateConfetti();
generateImageSlider();
