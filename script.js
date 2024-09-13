const imageUrls = [
    "https://picsum.photos/id/1015/400/400",
    "https://picsum.photos/id/1016/400/400",
    "https://picsum.photos/id/1025/400/400",
    "https://picsum.photos/id/1027/400/400",
    "https://picsum.photos/id/1033/400/400",
    "https://picsum.photos/id/1042/400/400",
    "https://picsum.photos/id/1047/400/400",
    "https://picsum.photos/id/1052/400/400",
    "https://picsum.photos/id/1062/400/400",
    "https://picsum.photos/id/1069/400/400",
    "https://picsum.photos/id/1080/400/400",
    "https://picsum.photos/id/1084/400/400",
    "https://picsum.photos/id/1090/400/400",
    "https://picsum.photos/id/1095/400/400",
    "https://picsum.photos/id/1097/400/400"
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
  
  function generateImageSlider() {
    imageUrls.forEach((url) => {
      const img = document.createElement('img');
      img.src = url;
      imageSlider.appendChild(img);
    });
  }
  
  let translateX = 0;
  function autoSwipeImages() {
    const images = document.querySelectorAll('#image-slider img');
    translateX -= 200; 
    if (translateX <= -images.length * 210) {
      translateX = 0; 
    }
    images.forEach(img => {
      img.style.transform = `translateX(${translateX}px)`;
    });
  }
  
  let touchStartX = 0;
  imageSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  imageSlider.addEventListener('touchend', (e) => {
    let touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX) {
      translateX -= 200;
    } else if (touchEndX > touchStartX) {
      translateX += 200;
    }
  });
  
  generateConfetti();
  generateImageSlider();
  setInterval(autoSwipeImages, 2000); 
  