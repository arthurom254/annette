const imageUrls = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg"
];

const confettiIcons = ['fas fa-ribbon', 'fas fa-heart', 'fas fa-candy-cane', 'fas fa-crown', 'fas fa-birthday-cake', 'fas fa-star', 'fas fa-music'];

const confettiContainer = document.getElementById('confetti');
const imageSlider = document.getElementById('image-slider');

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateConfetti() {
  for (let i = 0; i < 100; i++) {
    let confetti = document.createElement('i');
    let icon = confettiIcons[Math.floor(Math.random() * confettiIcons.length)];
    confetti.className = `confetti-icon ${icon}`;
    
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.animationDuration = (Math.random() * 3 + 3) + 's'; 
    confetti.style.opacity = Math.random();
    confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';

    confetti.style.color = getRandomColor();

    confetti.style.animation = `fall ${Math.random() * 5 + 5}s linear infinite, colorChange ${Math.random() * 3 + 3}s ease-in-out infinite`;

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

function play(){
  var audio = document.getElementById('audio-annette');
  document.getElementById('button-container').style.display='none'
  document.getElementById('birthday-container').style.display='block'
  audio.play();
}

generateConfetti();
generateImageSlider(); 
