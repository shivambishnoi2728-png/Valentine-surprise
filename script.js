// ===== GIFT BOX PAGE =====
if (document.querySelector('.gift-page')) {
    const giftBox = document.getElementById('giftBox');
    const heartsContainer = document.getElementById('heartsContainer');
    let isOpening = false;

    giftBox.addEventListener('click', function() {
        if (isOpening) return;
        isOpening = true;

        // Add opening animation
        giftBox.classList.add('opening');

        // Create heart burst
        createHeartBurst();

        // Redirect to question page after animation
        setTimeout(() => {
            window.location.href = 'question.html';
        }, 1500);
    });

    function createHeartBurst() {
        const colors = ['💖', '💕', '💗', '💓', '💝'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.textContent = colors[Math.floor(Math.random() * colors.length)];
                heart.style.left = (giftBox.offsetLeft + giftBox.offsetWidth / 2) + 'px';
                heart.style.top = (giftBox.offsetTop + giftBox.offsetHeight / 2) + 'px';
                heart.style.transform = `translate(${(Math.random() - 0.5) * 300}px, 0)`;
                
                heartsContainer.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, i * 50);
        }
    }
}

// ===== QUESTION PAGE - DISAPPEARING NO BUTTON =====
if (document.querySelector('.question-page')) {
    const noButton = document.getElementById('noButton');
    const hint = document.getElementById('hint');
    let noButtonAttempts = 0;
    
    const hints = [
        "Come on, you know you want to say yes! 😊",
        "The YES button is right there... 💕",
        "Why are you trying so hard to say no? 🥺",
        "Madam jiii, please? 💖",
        "I think the universe wants you to click YES! ✨"
    ];

    // Make NO button run away on hover
    noButton.addEventListener('mouseenter', moveNoButton);
    noButton.addEventListener('touchstart', moveNoButton);

    function moveNoButton(e) {
        e.preventDefault();
        noButtonAttempts++;

        // Show progressive hints
        if (noButtonAttempts <= hints.length) {
            hint.textContent = hints[noButtonAttempts - 1];
        }

        // Get viewport dimensions
        const maxX = window.innerWidth - noButton.offsetWidth - 40;
        const maxY = window.innerHeight - noButton.offsetHeight - 40;

        // Generate random position
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        // Move the button
        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';

        // Make it smaller each time
        const newSize = Math.max(0.5, 1 - (noButtonAttempts * 0.1));
        noButton.style.transform = `scale(${newSize})`;

        // After 5 attempts, make it super tiny and hard to catch
        if (noButtonAttempts >= 5) {
            noButton.style.transform = 'scale(0.3)';
        }

        // After 8 attempts, make it almost invisible
        if (noButtonAttempts >= 8) {
            noButton.style.opacity = '0.3';
        }
    }

    // Prevent clicking the NO button
    noButton.addEventListener('click', function(e) {
        e.preventDefault();
        moveNoButton(e);
    });
}

// ===== SUCCESS PAGE - CONFETTI =====
if (document.querySelector('.success-page')) {
    createConfetti();

    function createConfetti() {
        const confettiContainer = document.getElementById('confetti');
        const colors = ['#FF1493', '#FF69B4', '#FFB6C1', '#C71585', '#8B008B'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.opacity = Math.random();
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                
                document.body.appendChild(confetti);

                const fallDuration = Math.random() * 3 + 2;
                const fallDistance = Math.random() * 100 + window.innerHeight;
                const drift = (Math.random() - 0.5) * 200;

                confetti.animate([
                    { 
                        transform: `translateY(0) translateX(0) rotate(0deg)`,
                        opacity: 1
                    },
                    { 
                        transform: `translateY(${fallDistance}px) translateX(${drift}px) rotate(${Math.random() * 720}deg)`,
                        opacity: 0
                    }
                ], {
                    duration: fallDuration * 1000,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });

                setTimeout(() => {
                    confetti.remove();
                }, fallDuration * 1000);
            }, i * 30);
        }
    }
}

// ===== PHOTOS PAGE - LAZY LOADING =====
if (document.querySelector('.photos-page')) {
    // Add smooth scroll reveal for photos
    const photoCards = document.querySelectorAll('.photo-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    photoCards.forEach(card => {
        observer.observe(card);
    });
}
