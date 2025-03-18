// Inicialização de todas as funcionalidades
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o tema
    initTheme();
    
    // Inicializa o smooth scroll
    initSmoothScroll();
    
    // Inicializa o formulário de contato
    initContatoForm();
    
    // Inicializa os efeitos de fade
    initFadeEffects();
});

// Smooth scroll para links de navegação
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Manipulação do formulário de contato
function initContatoForm() {
    const form = document.getElementById('contato-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Coleta os dados do formulário
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Em um sistema real, aqui seria feita uma chamada para uma API
            console.log('Dados do formulário:', data);
            
            // Limpa o formulário
            form.reset();
        });
    }
}

// Efeitos de fade in
function initFadeEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Aplica o efeito de fade in aos cards de serviços
    document.querySelectorAll('.servico-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-in-out';
        observer.observe(card);
    });
}

// Controle do tema
function initTheme() {
    const themeSwitch = document.getElementById('themeSwitch');
    if (!themeSwitch) return;

    const themeIcon = themeSwitch.querySelector('.theme-icon');
    const themeText = themeSwitch.querySelector('.theme-text');
    
    // Verifica se há um tema salvo
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    updateThemeButton(savedTheme === 'dark', themeIcon, themeText);

    themeSwitch.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        applyTheme(newTheme);
        updateThemeButton(newTheme === 'dark', themeIcon, themeText);
        localStorage.setItem('theme', newTheme);
    });
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

function updateThemeButton(isDark, icon, text) {
    if (!icon || !text) return;
    icon.textContent = isDark ? '🌜' : '🌞';
    text.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
} 