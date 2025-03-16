// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Variables for the typing effect
    const typingTextElement = document.querySelector('.typing-text');
    const phrases = [
        "Yazılım Geliştirici",
        "Yapay Zeka Uzmanı",
        "Uzay Teknolojileri Meraklısı",
        "Geleceğin Mimarı"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    // Function to handle the typing animation
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        // Set typing speed based on the current action
        if (isDeleting) {
            typingSpeed = 50; // Delete faster
        } else {
            typingSpeed = 100 + Math.random() * 100; // Type with slight randomness
        }

        // Type or delete characters
        if (!isDeleting && charIndex <= currentPhrase.length) {
            typingTextElement.textContent = currentPhrase.substring(0, charIndex);
            charIndex++;
        } else if (isDeleting && charIndex >= 0) {
            typingTextElement.textContent = currentPhrase.substring(0, charIndex);
            charIndex--;
        }

        // Switch between typing and deleting
        if (!isDeleting && charIndex > currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at the end of the phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Move to the next phrase
            typingSpeed = 500; // Pause before typing the next phrase
        }

        // Continue the animation with the calculated speed
        setTimeout(typeEffect, typingSpeed);
    }

    // Start the typing animation
    typeEffect();

    // Make header transparent at top and solid when scrolled
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 14, 23, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 14, 23, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Create floating planets background
    function createFloatingPlanets() {
        const planetsContainer = document.getElementById('planets-background');
        const planetImages = ['planet1.png', 'planet2.png', 'planet3.png', 'planet4.png', 'planet5.png'];
        const totalPlanets = 15; // Kaç tane gezegen oluşturulacak

        // Mevcut içeriği temizle
        planetsContainer.innerHTML = '';

        for (let i = 0; i < totalPlanets; i++) {
            // Rastgele bir gezegen görseli seç
            const randomPlanetIndex = Math.floor(Math.random() * planetImages.length);
            const planetImage = planetImages[randomPlanetIndex];
            
            // Yeni gezegen elementi oluştur
            const planet = document.createElement('div');
            planet.className = 'floating-bg-planet';
            
            // Rastgele boyut (30px ile 100px arası)
            const size = Math.floor(Math.random() * 70 + 30);
            planet.style.width = `${size}px`;
            planet.style.height = `${size}px`;
            
            // Rastgele pozisyon
            const posX = Math.floor(Math.random() * 100);
            const posY = Math.floor(Math.random() * 100);
            planet.style.left = `${posX}%`;
            planet.style.top = `${posY}%`;
            
            // Rastgele opacity (0.1 ile 0.4 arası)
            const opacity = Math.random() * 0.3 + 0.1;
            planet.style.opacity = opacity.toString();
            
            // Rastgele animasyon süresi (15s ile 45s arası)
            const animationDuration = Math.floor(Math.random() * 30 + 15);
            planet.style.animation = `floatSlowly ${animationDuration}s ease-in-out infinite`;
            
            // Animasyon gecikmesi ekle (her gezegen farklı zamanda animasyona başlasın)
            const animationDelay = Math.floor(Math.random() * 10);
            planet.style.animationDelay = `${animationDelay}s`;
            
            // Görsel ekle
            const img = document.createElement('img');
            img.src = `images/${planetImage}`;
            img.alt = `Floating Planet`;
            
            planet.appendChild(img);
            planetsContainer.appendChild(planet);
        }
    }

    // Initialize the floating planets
    createFloatingPlanets();
    
    // Create random shooting stars
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        document.body.appendChild(shootingStar);
        
        // Rastgele büyüklük (1px-3px arası)
        const size = Math.floor(Math.random() * 3) + 1;
        shootingStar.style.width = `${size * 30}px`;
        shootingStar.style.height = `${size}px`;
        
        // Rastgele pozisyon ve yön
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight / 3; // Ekranın üst 1/3'ünden başlasın
        
        // Bitiş pozisyonu (çapraz aşağı doğru)
        const endX = startX + (Math.random() * 300 - 150);
        const endY = startY + (Math.random() * 400 + 200);
        
        // Rastgele hız (0.5s - 2s arası)
        const speed = Math.random() * 1.5 + 0.5;
        
        // Stiller
        shootingStar.style.left = `${startX}px`;
        shootingStar.style.top = `${startY}px`;
        shootingStar.style.transition = `transform ${speed}s linear, opacity ${speed}s linear`;
        
        // Kayan yıldız animasyonunu başlat
        setTimeout(() => {
            shootingStar.style.transform = `translate(${endX - startX}px, ${endY - startY}px)`;
            shootingStar.style.opacity = '0';
            
            // Animasyon tamamlandığında elementi kaldır
            setTimeout(() => {
                shootingStar.remove();
            }, speed * 1000);
        }, 10);
        
        // Rastgele aralıklarla yeni yıldızlar oluştur (2-10 saniye arası)
        const nextStarDelay = Math.random() * 8000 + 2000;
        setTimeout(createShootingStar, nextStarDelay);
    }
    
    // Mouse takip eden gelişmiş dalga efekti
    function setupMouseWaveEffect() {
        // Mouse izleme dizisi
        let mouseTrail = [];
        let isMouseMoving = false;
        let mouseTimeout;
        
        // Ana container
        const waveContainer = document.createElement('div');
        waveContainer.className = 'mouse-wave-container';
        document.body.appendChild(waveContainer);
        
        // Mouse hareketini takip et
        document.addEventListener('mousemove', (e) => {
            // Mouse hareketini işaretle
            isMouseMoving = true;
            clearTimeout(mouseTimeout);
            
            // Yeni pozisyonu kaydet
            mouseTrail.push({
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now()
            });
            
            // Trail'i son 25 pozisyonla sınırla
            if (mouseTrail.length > 25) {
                mouseTrail.shift();
            }
            
            // Dalga efekti oluştur
            createWaveEffect(waveContainer, e.clientX, e.clientY);
            
            // Kısa bir gecikme sonra mouse hareketinin durduğunu işaretle
            mouseTimeout = setTimeout(() => {
                isMouseMoving = false;
            }, 100);
        });
        
        // Sürekli animasyon için
        function animateWaves() {
            if (isMouseMoving && mouseTrail.length > 0) {
                const lastPos = mouseTrail[mouseTrail.length - 1];
                createWaveEffect(waveContainer, lastPos.x, lastPos.y);
            }
            requestAnimationFrame(animateWaves);
        }
        
        // Animasyonu başlat
        animateWaves();
        
        // Dalga efekti oluştur
        function createWaveEffect(container, x, y) {
            // Dalgaları temizle (performans için)
            const existingWaves = container.querySelectorAll('.mouse-wave, .mouse-trail-wave, .mouse-glow');
            if (existingWaves.length > 50) {
                for (let i = 0; i < 10; i++) {
                    if (existingWaves[i]) existingWaves[i].remove();
                }
            }
            
            // Sol ve sağ dalga
            for (let side = -1; side <= 1; side += 2) {
                for (let i = 0; i < 3; i++) {
                    const wave = document.createElement('div');
                    wave.className = 'mouse-wave';
                    
                    // Rastgele büyüklük ve offset
                    const size = Math.random() * 15 + 10; // 10px-25px arası
                    const xOffset = side * (Math.random() * 15 + 5 + i * 10); // Dalgaları kenarlara doğru dağıt
                    const yOffset = (Math.random() * 10 - 5); // Yukarı veya aşağı hafif ofset
                    
                    // Parıltı efekti için rastgele renkler (mavi tonlarında)
                    const hue = Math.random() * 60 + 190; // Mavi-turkuaz arası
                    const alpha = Math.random() * 0.3 + 0.2; // Saydamlık
                    
                    // Stiller
                    wave.style.width = `${size}px`;
                    wave.style.height = `${size}px`;
                    wave.style.left = `${x + xOffset}px`;
                    wave.style.top = `${y + yOffset}px`;
                    wave.style.backgroundColor = `hsla(${hue}, 100%, 70%, ${alpha})`;
                    wave.style.boxShadow = `0 0 10px 2px hsla(${hue}, 100%, 70%, ${alpha - 0.1})`;
                    
                    // Animasyon süresi
                    const duration = Math.random() * 0.5 + 0.8; // 0.8s-1.3s
                    wave.style.animation = `waveExpand ${duration}s ease-out forwards`;
                    
                    container.appendChild(wave);
                    
                    // Animasyon tamamlandığında elementi kaldır
                    setTimeout(() => {
                        wave.remove();
                    }, duration * 1000 + 100);
                }
            }
            
            // Ortadaki parıltı efekti
            const glowEffect = document.createElement('div');
            glowEffect.className = 'mouse-glow';
            glowEffect.style.left = `${x}px`;
            glowEffect.style.top = `${y}px`;
            container.appendChild(glowEffect);
            
            // Mouse hızına göre dalga izleri oluştur
            if (mouseTrail.length > 2) {
                // Son iki pozisyon arasındaki hızı hesapla
                const lastPos = mouseTrail[mouseTrail.length - 1];
                const prevPos = mouseTrail[mouseTrail.length - 2];
                
                // Hız ve mesafe hesapla
                const dx = lastPos.x - prevPos.x;
                const dy = lastPos.y - prevPos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const timeDiff = lastPos.timestamp - prevPos.timestamp;
                const speed = distance / (timeDiff || 1); // Sıfıra bölünmeyi önle
                
                // Eğer hız yeterince yüksekse, ekstra dalga efekti oluştur
                if (distance > 5 && timeDiff < 100) {
                    // Hareket yönünde ark efekti oluştur
                    const angle = Math.atan2(dy, dx);
                    const trailCount = Math.min(Math.floor(speed * 2), 5); // Hıza göre iz sayısı
                    
                    for (let i = 0; i < trailCount; i++) {
                        const trailWave = document.createElement('div');
                        trailWave.className = 'mouse-trail-wave';
                        
                        // Pozisyon (hareket yönünün tersine)
                        const trailDistance = 10 + i * 15;
                        const trailX = x - Math.cos(angle) * trailDistance;
                        const trailY = y - Math.sin(angle) * trailDistance;
                        
                        // Hıza göre boyut
                        const trailSize = 8 + i * 3 + speed * 2;
                        
                        // Stil
                        trailWave.style.left = `${trailX}px`;
                        trailWave.style.top = `${trailY}px`;
                        trailWave.style.width = `${trailSize}px`;
                        trailWave.style.height = `${trailSize}px`;
                        
                        // Parıltı efekti
                        const trailHue = 210 + speed * 10; // Hıza göre renk tonu
                        const trailAlpha = Math.min(0.3 - i * 0.05, 0.3);
                        trailWave.style.backgroundColor = `hsla(${trailHue}, 100%, 80%, ${trailAlpha})`;
                        trailWave.style.boxShadow = `0 0 ${8 + speed * 3}px ${2 + speed}px hsla(${trailHue}, 100%, 70%, ${trailAlpha - 0.1})`;
                        
                        // Animasyon
                        const trailDuration = 0.6 + i * 0.1;
                        trailWave.style.animation = `waveExpand ${trailDuration}s ease-out forwards`;
                        
                        container.appendChild(trailWave);
                        
                        // Animasyon tamamlandığında elementi kaldır
                        setTimeout(() => {
                            trailWave.remove();
                        }, trailDuration * 1000 + 100);
                    }
                    
                    // Hızlı hareketlerde ek efektler
                    if (speed > 1) {
                        const burstEffect = document.createElement('div');
                        burstEffect.className = 'mouse-burst';
                        burstEffect.style.left = `${x}px`;
                        burstEffect.style.top = `${y}px`;
                        burstEffect.style.backgroundColor = `hsla(210, 100%, 80%, 0.15)`;
                        container.appendChild(burstEffect);
                        
                        setTimeout(() => {
                            burstEffect.remove();
                        }, 500);
                    }
                }
            }
        }
    }
    
    // CSS stillerini ekle (geliştirilmiş versiyon)
    function addStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .shooting-star {
                position: fixed;
                background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
                border-radius: 100px;
                z-index: 0;
                pointer-events: none;
                box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
                opacity: 1;
            }
            
            .mouse-wave-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1000;
                overflow: hidden;
            }
            
            .mouse-wave {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
            }
            
            .mouse-glow {
                position: absolute;
                width: 8px;
                height: 8px;
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 15px 5px rgba(116, 203, 255, 0.8),
                            0 0 30px 10px rgba(100, 200, 255, 0.4);
                pointer-events: none;
                animation: pulseGlow 1s ease-in-out infinite alternate;
            }
            
            .mouse-trail-wave {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
            }
            
            .mouse-burst {
                position: absolute;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                pointer-events: none;
                animation: burstExpand 0.5s ease-out forwards;
            }
            
            @keyframes waveExpand {
                0% {
                    transform: scale(0) translate(0, 0);
                    opacity: 0.9;
                }
                100% {
                    transform: scale(2.5) translate(-10px, -5px);
                    opacity: 0;
                }
            }
            
            @keyframes pulseGlow {
                0% {
                    transform: translate(-50%, -50%) scale(0.8);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -50%) scale(1.2);
                    opacity: 1;
                }
            }
            
            @keyframes burstExpand {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0.5;
                }
                100% {
                    transform: translate(-50%, -50%) scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Stilleri ekle
    addStyles();
    
    // Kayan yıldızları başlat
    createShootingStar();
    
    // Mouse dalga efektini başlat
    setupMouseWaveEffect();
    
    // Animate skill bars when they come into view
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // Create an intersection observer to detect when elements are visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the width from the inline style
                const widthValue = entry.target.style.width;
                
                // Temporarily set width to 0
                entry.target.style.width = '0';
                
                // Trigger reflow
                entry.target.offsetWidth;
                
                // Apply a transition
                entry.target.style.transition = 'width 1.5s ease-out';
                
                // Set the final width
                setTimeout(() => {
                    entry.target.style.width = widthValue;
                }, 100);
                
                // Stop observing once animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe all skill level elements
    skillLevels.forEach(skillLevel => {
        observer.observe(skillLevel);
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Create a glow effect
            this.style.boxShadow = '0 15px 40px rgba(126, 63, 242, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Restore original shadow
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
    });

    // Contact form validation and submit animation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderBottom = '2px solid red';
                } else {
                    input.style.borderBottom = '1px solid rgba(255, 255, 255, 0.3)';
                }
            });
            
            if (isValid) {
                // Add submit animation
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.innerHTML = '<i class="fas fa-check"></i> Gönderildi!';
                submitButton.style.backgroundColor = '#4CAF50';
                
                // Reset form after animation
                setTimeout(() => {
                    this.reset();
                    submitButton.innerHTML = 'Gönder';
                    submitButton.style.backgroundColor = '';
                }, 3000);
            }
        });
    }
    
    // Add animation to spacecraft and astronaut on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const spacecraft = document.querySelector('.spacecraft');
        const astronaut = document.querySelector('.floating-astronaut');
        
        if (spacecraft) {
            spacecraft.style.transform = `translateY(${scrolled * 0.1}px) translateX(${scrolled * 0.05}px) rotate(${scrolled * 0.02}deg)`;
        }
        
        if (astronaut) {
            astronaut.style.transform = `translateY(${scrolled * -0.08}px) rotate(${scrolled * 0.01}deg)`;
        }
    });

    // Update orbiting planets with actual planet images
    const orbitingPlanets = document.querySelectorAll('.planet img');
    if (orbitingPlanets.length > 0) {
        const planetImages = ['planet1.png', 'planet2.png', 'planet3.png', 'planet4.png', 'planet5.png'];
        
        orbitingPlanets.forEach((planetImg, index) => {
            // İndeksi aşmaması için mod alıyoruz
            const imageIndex = index % planetImages.length;
            planetImg.src = `images/${planetImages[imageIndex]}`;
        });
    }

    // Ekran boyutuna göre gezegenleri yeniden düzenle
    window.addEventListener('resize', function() {
        createFloatingPlanets();
    });
});