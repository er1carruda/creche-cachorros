// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Manipulação do formulário de contato
const form = document.getElementById('contato-form');
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

// Adiciona efeito de fade in aos elementos quando aparecem na tela
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