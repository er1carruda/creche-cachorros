document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('agendamento-form');
    const resumoDiv = document.getElementById('resumo-agendamento');
    
    // Define a data mínima como hoje
    const dataInput = document.getElementById('data');
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.min = hoje;

    // Atualiza o resumo quando qualquer campo é alterado
    form.addEventListener('input', atualizarResumo);

    // Manipula o envio do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Atualiza o estado do botão
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        // Simula o envio e mostra mensagem de sucesso
        setTimeout(() => {
            // Cria e mostra a mensagem de sucesso
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-content">
                    <h3>✨ Agendamento Confirmado! ✨</h3>
                    <p>Sua visita foi agendada com sucesso.</p>
                    <p>Entraremos em contato em breve para confirmar os detalhes.</p>
                </div>
            `;
            
            // Adiciona a mensagem após o formulário
            form.parentNode.insertBefore(successMessage, form.nextSibling);
            
            // Esconde o formulário com uma transição suave
            form.style.opacity = '0';
            form.style.transform = 'translateY(-20px)';
            
            // Remove o formulário e a mensagem após 3 segundos
            setTimeout(() => {
                form.reset();
                form.style.opacity = '1';
                form.style.transform = 'translateY(0)';
                successMessage.remove();
                resumoDiv.innerHTML = '<h3>Resumo do Agendamento</h3><p>Preencha o formulário para ver o resumo</p>';
                submitButton.disabled = false;
                submitButton.textContent = 'Confirmar Agendamento';
            }, 3000);
        }, 1500);
    });
});

function atualizarResumo() {
    const nomePet = document.getElementById('nome_pet').value;
    const raca = document.getElementById('raca').value;
    const idade = document.getElementById('idade').value;
    const servico = document.getElementById('servico');
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;
    const observacoes = document.getElementById('observacoes').value;

    // Só atualiza se os campos principais estiverem preenchidos
    if (nomePet && servico.value && data && horario) {
        const servicoTexto = servico.options[servico.selectedIndex].text;
        const dataFormatada = new Date(data).toLocaleDateString('pt-BR');

        const resumoHTML = `
            <h3>Resumo do Agendamento</h3>
            <div class="resumo-info">
                <p><strong>Pet:</strong> ${nomePet}</p>
                ${raca ? `<p><strong>Raça:</strong> ${raca}</p>` : ''}
                ${idade ? `<p><strong>Idade:</strong> ${idade} anos</p>` : ''}
                <p><strong>Serviço:</strong> ${servicoTexto}</p>
                <p><strong>Data:</strong> ${dataFormatada}</p>
                <p><strong>Horário:</strong> ${horario}</p>
                ${observacoes ? `<p><strong>Observações:</strong> ${observacoes}</p>` : ''}
            </div>
        `;

        document.getElementById('resumo-agendamento').innerHTML = resumoHTML;
    }
}

// Formata valores monetários
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
} 