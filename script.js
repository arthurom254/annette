const imageUrls = [
  "https://lh3.googleusercontent.com/pw/AP1GczOPhKzm_mxDpedrZd-x2yAZNrJ2JN-Uxg9Nu_aZCR9S1y_QJQ4JpN-sKamsJBpSxfu0Ifoid97_NrPiTDgmuQf1D_J_-g0Af6TJ7A52r93U18GQ_IoescG5iGK1U7NnhgAmrt7uMYjN2uQ05B5mRS3I=w487-h649-s-no?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczNHpy9X_wFexM62OZeoTZwxdOwJR0Mn6tQgpJCMsvvLe_eS5jOk2RMcEAKATgeqirQLYC1LLKf-_sBgSgnmbt-mRf-cKPGwa0JdTw_K4jUmPDVsSStast7mUwRMjezQEiq7kdBKgOPHjyXcOIWCKN21=w487-h649-s-no?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczNZKDKWjtTAQ3rcfp-iovOROajHthgmo2713SIbYYgLCOeZCpCaBYaZh1bCvoJANEBvPGifzMw32vTFD4Sl-WbBH1EAjhXAdrnoc4mQXO0aBwySgANFepaIutZ5XeIHN--V671Ggg97Sa9TtwuVa5ZR=w487-h649-s-no?authuser=0",
  "https://lh3.googleusercontent.com/pw/AP1GczO4I1T1lNzwAGxNaqCAQBbrP0wzTA9A5YeGq5qSz_Td9Um0YnO8oFYBDo6L-Cxb3zlnZn85R7SV9XdrLItXGMa4ReXPkj0S_ykco8UlZ-CN10ZjjY5lU4WHeNGYJ-qaqoR-yRtmBKlUFqtL_eIEvmwR=w487-h649-s-no?authuser=0"
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

function loadBackgroundMusic() {
  const audio = new Audio('music/music.mp3'); 
  audio.loop = true; 
  audio.autoplay = true; 
  audio.volume = 0.5; 
  document.body.appendChild(audio);
}

generateConfetti();
generateImageSlider();
// loadBackgroundMusic(); 
