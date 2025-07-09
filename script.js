document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const progressBar = document.getElementById('progressBar');
    const loadingPercent = document.getElementById('loadingPercent');
    let progress = 0;
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 25 + 5;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        loadingPercent.textContent = `${Math.floor(progress)}%`;
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    initMainContent();
                }, 500);
            }, 800);
        }
    }, 200);

    function initMainContent() {
        initCarousel();
        initHobbyCards();
        initNavigation();
        initNeonEffects();
        initPhotoGallery();
        initContactForm();
        initMatrixRain();
    }

    function initPhotoGallery() {
        const photos = document.querySelectorAll('.photo-item');
        let currentPhoto = 0;
        
        function showPhoto(index) {
            photos.forEach(photo => photo.classList.remove('active'));
            photos[index].classList.add('active');
        }
        
        setInterval(() => {
            currentPhoto = (currentPhoto + 1) % photos.length;
            showPhoto(currentPhoto);
        }, 7000);
    }

    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        const formResponse = document.getElementById('formResponse');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            fetch('php/send.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    formResponse.innerHTML = `<p class="success">${data.message}</p>`;
                    contactForm.reset();
                } else {
                    formResponse.innerHTML = `<p class="error">${data.message}</p>`;
                }
            })
            .catch(error => {
                formResponse.innerHTML = `<p class="error">Произошла ошибка: ${error.message}</p>`;
            });
        });
    }

    function initCarousel() {
        const carousel = document.querySelector('.carousel-container');
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentIndex = 0;
        let autoSlideInterval;
        
        function showSlide(index) {
            slides.forEach(slide => {
                slide.style.display = 'none';
            });
            
            slides[index].style.display = 'flex';
            currentIndex = index;
            updateIndicators();
        }

        function updateIndicators() {
            const indicators = document.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
        }

        function createIndicators() {
            const container = document.createElement('div');
            container.className = 'carousel-indicators';
            
            slides.forEach((_, i) => {
                const indicator = document.createElement('button');
                indicator.className = 'carousel-indicator';
                if (i === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => {
                    showSlide(i);
                });
                container.appendChild(indicator);
            });
            
            carousel.parentNode.insertBefore(container, carousel.nextSibling);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % slides.length;
                showSlide(nextIndex);
            }, 8000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        createIndicators();
        showSlide(0);
        startAutoSlide();
        
        nextBtn.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
            stopAutoSlide();
            startAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
            stopAutoSlide();
            startAutoSlide();
        });

        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    function initHobbyCards() {
        const hobbyCards = document.querySelectorAll('.hobby-card');
        const hobbyDetails = document.getElementById('hobbyDetails');
        const hobbyContent = document.getElementById('hobbyDetailsContent');
        const closeBtn = document.getElementById('closeDetails');
        const hobbiesData = {
            TARKOV: {
                title: "TARKOV - КАК СБЕЖАТЬ С ХАОСА",
                content: `
                    <h3>Тактический Шутер и Симулятор Поиска Ценностей </h3>
                    <p>Я не просто играю в Тарков, я контроллирую выживание в нем</p>
                    <div class="hobby-section">
                        <h4>Навыки и Сборки:</h4>
                        <ul>
                            <li>Основные сборки: 0.15TopHK(для лучшей отдачи), AS-VAL(хорошая эрганомика и отдача).</li>
                            <li>Любимые локации: Таможня, Завод, Лес.</li>
                            <li>Достижения: Путь Каппа, Хозяин Ультры, Марафон</li>
                        </ul>
                    </div>
                    <div class="hobby-section">
                        <h4>Чем занимаюсь</h4>
                        <ul>
                            <li>Тарков это жизнь, Тарков это мир</li>
                            <li>Помощь новиньким в Таркове</li>
                            <li>Просто по душе</li>
                        </ul>
                    </div>
                `
            },
            basketball: {
                title: "СТРИТБОЛ - УЛИЧНЫЙ ДУХ СОПЕРНИЧЕСТВА",
                content: `
                    <h3>Баскетбол – страсть, а не просто спорт</h3>
                    <div class="hobby-section">
                        <h4>Стиль Игры:</h4>
                        <ul>
                            <li>Атакующий защитник: Быстрые проходы, резкие броски с дистанции.</li>
                            <li>Любимый прием: "Step-back three-pointer" или обманный кроссовер.</li>
                        </ul>
                    </div>
                    <div class="hobby-section">
                        <h4>Тренировки:</h4>
                        <ul>
                            <li>3 раза в неделю – работа над дриблингом и броском.</li>
                            <li>Игра в пас: учю командное взаимодействие, а не только финты.</li>
                        </ul>
                    </div>
                    <div class="hobby-section">
                        <h4>Мечты:</h4>
                        <ul>
                            <li>Собрать постоянную команду для турниров 3×3.</li>
                            <li>Попасть на городские соревнования и заявить о себе.</li>
                        </ul>
                    </div>
                `
            },
            dnd: {
                title: "DUNGEONS & DRAGONS - МИР ФЭНТЕЗИ",
                content: `
                    <h3>Для меня D&D – не просто настолка, а история, которую я создаю</h3>
                    <div class="hobby-section">
                        <h4>Роли:</h4>
                        <ul>
                            <li>Игрок: Люблю придумывать персонажей с жестоким и темным лором.</li>
                            <li>DM: Если введу игру, то делаю упор на сюжетные повороты и моральные дилеммы.</li>
                        </ul>
                    </div>
                    <div class="hobby-section">
                        <h4>Любимые Кампании:</h4>
                        <ul>
                            <li>"Curse of Strahd" – мрачная готика и выживание.</li>
                            <li>Домашние сеты в стиле киберпанка или стимпанка.</li>
                        </ul>
                    </div>
                    <div class="hobby-section">
                        <h4>Подход к Игре:</h4>
                        <ul>
                            <li>Глубокий отыгрыш: Меняю голос за NPC, использую музыку и декорации.</li>
                            <li>Важен баланс: 60% ролеплея, 30% тактики, 10% чистой импровизации.</li>
                        </ul>
                    </div>
                `
            },
            coding: {
                title: "ВЕБ-РАЗРАБОТКА - ОТ ХОББИ К ПРОФЕССИИ",
                content: `
                    <h3>Программирование эта та же жизнь</h3>
                    <div class="hobby-section">
                        <h4>Текущие Навыки:</h4>
                        <ul>
                            <li>Frontend: HTML, CSS, JavaScript (основы React).</li>
                            <li>Backend: БД, немного PHP.</li>
                        </ul>
                    </div>
                    <div class="hobby-section">
                        <h4>Проекты:</h4>
                        <ul>
                            <li>Персональный сайт-портфолио (вы сейчас на нем).</li>
                            <li>Веб-сайт для творческого центра Античность</li>
                            <li>Сайт с игрой Тетрис</li>
                        </ul>
                    </div>
                    <div class="hobby-section">
                        <h4>Планы:</h4>
                        <ul>
                            <li>Изучить React/Node.js глубже.</li>
                            <li>Попробовать фриланс</li>
                        </ul>
                    </div>
                `
            }
        };

        hobbyCards.forEach(card => {
            card.addEventListener('click', function() {
                const hobbyType = this.getAttribute('data-hobby');
                const hobby = hobbiesData[hobbyType];
                
                hobbyContent.innerHTML = `
                    <h2>${hobby.title}</h2>
                    <p>${hobby.content}</p>
                `;
                
                hobbyDetails.style.display = 'block';
                setTimeout(() => {
                    hobbyDetails.style.opacity = '1';
                }, 10);
            });
        });
        
        closeBtn.addEventListener('click', function() {
            hobbyDetails.style.opacity = '0';
            setTimeout(() => {
                hobbyDetails.style.display = 'none';
            }, 300);
        });
    }

    function initNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        });
    }

    function initNeonEffects() {
        setInterval(() => {
            document.querySelectorAll('.neon-effect').forEach(el => {
                el.style.textShadow = `0 0 ${5 + Math.random() * 12123123}px var(--neon-red)`;
                el.style.opacity = 0.8 + Math.random() * 0.3;
            });
        }, 300);
        
        const cyberPortrait = document.querySelector('.cyberportrait');
        if (cyberPortrait) {
            setInterval(() => {
                cyberPortrait.style.boxShadow = `0 0 ${10 + Math.random() * 20}px var(--neon-red)`;
            }, 2000);
        }
    }

    function initMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.15';
        document.body.prepend(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const katakana = 'ДЖОННИСИЛЬВЕРХЕНД-ARASAKATOWER-2023!(#(!@(ADAMSMAHER';
        const latin = 'ARASKA';
        const nums = 'DIECYBERPUNk';
        const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
        const alphabet = katakana + latin + nums + symbols;
        
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const rainDrops = [];
        
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(10, 0, 5, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#ff073a';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
                
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };
        
        const interval = setInterval(draw, 30);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(interval);
            } else {
                interval = setInterval(draw, 30);
            }
        });
    }
});
