// Função para scroll suave para especialização
        function scrollToSpecialization() {
            const element = document.getElementById('especializacao');
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        // Função para scroll suave para atuação
        document.querySelector('a[href="#atuacao"]').addEventListener('click', function(e) {
            e.preventDefault();
            const element = document.getElementById('atuacao');
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Adiciona efeitos visuais aos links
        document.querySelectorAll('.footer-section a').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });



//FAQ
 document.addEventListener('DOMContentLoaded', function() {
            const faqQuestions = document.querySelectorAll('.faq-question');
            
            faqQuestions.forEach(question => {
                question.addEventListener('click', function() {
                    const faqItem = this.parentElement;
                    const answer = faqItem.querySelector('.faq-answer');
                    const isActive = answer.classList.contains('active');
                    
                    // Fecha todas as respostas abertas
                    document.querySelectorAll('.faq-answer.active').forEach(activeAnswer => {
                        activeAnswer.classList.remove('active');
                    });
                    
                    // Remove a classe active de todas as perguntas
                    document.querySelectorAll('.faq-question.active').forEach(activeQuestion => {
                        activeQuestion.classList.remove('active');
                    });
                    
                    // Se a resposta não estava ativa, abre ela
                    if (!isActive) {
                        answer.classList.add('active');
                        this.classList.add('active');
                    }
                });
            });
        });

//mapa
 // Função para gerar link de rota personalizada
        function gerarLinkRota() {
            const destino = "Rua Major Marques Braga, 7, Centro, Nova Friburgo, RJ";
            const rotaBtn = document.getElementById('rotaBtn');
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    rotaBtn.href = `https://www.google.com/maps/dir/${lat},${lng}/${encodeURIComponent(destino)}`;
                }, function() {
                    // Se não conseguir localização, usa rota genérica
                    rotaBtn.href = `https://www.google.com/maps/dir//${encodeURIComponent(destino)}`;
                });
            } else {
                // Fallback se geolocalização não estiver disponível
                rotaBtn.href = `https://www.google.com/maps/dir//${encodeURIComponent(destino)}`;
            }
        }

        // Inicializa quando a página carrega
        document.addEventListener('DOMContentLoaded', function() {
            gerarLinkRota();
        });

        // Adiciona efeito de hover suave nos botões
        document.querySelectorAll('.map-btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        //carrossel
        class TestimonialCarousel {
            constructor() {
                this.track = document.getElementById('carouselTrack');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.dotsContainer = document.getElementById('dotsContainer');
                this.cards = document.querySelectorAll('.testimonial-card');
                
                this.currentIndex = 0;
                this.totalCards = this.cards.length;
                this.autoPlayInterval = null;
                
                this.init();
            }

            init() {
                this.createDots();
                this.updateCarousel();
                this.attachEventListeners();
                this.startAutoPlay();
            }

            createDots() {
                for (let i = 0; i < this.totalCards; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => this.goToSlide(i));
                    this.dotsContainer.appendChild(dot);
                }
            }

            updateCarousel() {
                const translateX = -this.currentIndex * 100;
                this.track.style.transform = `translateX(${translateX}%)`;
                
                // Update navigation buttons
                this.prevBtn.disabled = this.currentIndex === 0;
                this.nextBtn.disabled = this.currentIndex === this.totalCards - 1;
                
                // Update dots
                document.querySelectorAll('.dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentIndex);
                });
            }

            nextSlide() {
                if (this.currentIndex < this.totalCards - 1) {
                    this.currentIndex++;
                    this.updateCarousel();
                }
            }

            prevSlide() {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                    this.updateCarousel();
                }
            }

            goToSlide(index) {
                this.currentIndex = index;
                this.updateCarousel();
            }

            attachEventListeners() {
                this.nextBtn.addEventListener('click', () => {
                    this.nextSlide();
                    this.resetAutoPlay();
                });

                this.prevBtn.addEventListener('click', () => {
                    this.prevSlide();
                    this.resetAutoPlay();
                });

                // Pause autoplay on hover
                this.track.addEventListener('mouseenter', () => {
                    this.stopAutoPlay();
                });

                this.track.addEventListener('mouseleave', () => {
                    this.startAutoPlay();
                });

                // Touch/swipe support for mobile
                let startX = 0;
                let isDragging = false;

                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    isDragging = true;
                });

                this.track.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                });

                this.track.addEventListener('touchend', (e) => {
                    if (!isDragging) return;
                    isDragging = false;
                    
                    const endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            this.nextSlide();
                        } else {
                            this.prevSlide();
                        }
                        this.resetAutoPlay();
                    }
                });
            }

            startAutoPlay() {
                this.autoPlayInterval = setInterval(() => {
                    if (this.currentIndex < this.totalCards - 1) {
                        this.nextSlide();
                    } else {
                        this.currentIndex = 0;
                        this.updateCarousel();
                    }
                }, 5000);
            }

            stopAutoPlay() {
                if (this.autoPlayInterval) {
                    clearInterval(this.autoPlayInterval);
                    this.autoPlayInterval = null;
                }
            }

            resetAutoPlay() {
                this.stopAutoPlay();
                this.startAutoPlay();
            }
        }

        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new TestimonialCarousel();
        });


        
    const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav a");

  function activateLinkOnScroll() {
    let scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", activateLinkOnScroll);