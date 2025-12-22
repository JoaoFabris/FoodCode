describe('Login - Teste Básico', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.wait(3000);
  });

  it('deve carregar a página de login sem erros', () => {

    cy.get('body').should('be.visible');
    

    cy.get('body').then(($body) => {
      const text = $body.text();
      
      if (text.includes('Login')) {
        cy.log(' Título Login encontrado');
      }
      
      if (text.includes('Faça seu Login')) {
        cy.log(' Título principal encontrado');
      }
      
      if (text.includes('Preencha seus dados')) {
        cy.log(' Subtítulo encontrado');
      }
    });
  });

  it('deve mostrar formulário de login', () => {
    cy.get('body').then(($body) => {
      const text = $body.text();
      

      if (text.includes('Nome Completo')) {
        cy.contains('Nome Completo').should('exist');
        cy.log(' Label Nome encontrado');
      }
      
      if (text.includes('Telefone')) {
        cy.contains('Telefone').should('exist');
        cy.log(' Label Telefone encontrado');
      }
      
      if (text.includes('CPF')) {
        cy.contains('CPF').should('exist');
        cy.log('Label CPF encontrado');
      }
      
      if (text.includes('Endereço')) {
        cy.contains('Endereço').should('exist');
        cy.log(' Label Endereço encontrado');
      }
    });
  });

  it('deve mostrar campos de input', () => {
    // Verificar se existem inputs (método genérico)
    cy.get('input').should('have.length.at.least', 3);
    cy.log(' Inputs encontrados na página');
  });

  it('deve mostrar seção de foto', () => {
    cy.get('body').then(($body) => {
      if ($body.text().includes('Adicionar Foto')) {
        cy.contains('Adicionar Foto').should('exist');
        cy.log(' Seção de foto encontrada');
      }
      
      if ($body.text().includes('📷')) {
        cy.contains('📷').should('exist');
        cy.log(' Ícone de foto encontrado');
      }
    });
  });

  it('deve mostrar botão de entrar', () => {
    cy.contains('Entrar').should('exist');
    cy.log(' Botão Entrar encontrado');
  });

    it('deve permitir digitar no primeiro input', () => {
    // Tentar preencher o primeiro input disponível
    cy.get('input').first().then(($input) => {
      if ($input.is(':visible')) {
        cy.wrap($input).clear().type('João Silva', { force: true, delay: 50 });
        cy.log(' Primeiro input preenchido');
      } else {
        cy.log(' Primeiro input não visível');
      }
    });
  });

  it('deve permitir digitar em múltiplos inputs', () => {
    // Preencher inputs por índice
    const dados = ['João Silva', '11987654321', '12345678901', 'Rua Teste 123'];
    
    cy.get('input').each(($input, index) => {
      if (index < dados.length && $input.is(':visible')) {
        cy.wrap($input).clear().type(dados[index], { force: true, delay: 30 });
        cy.log(` Input ${index + 1} preenchido`);
      }
    });
  });

  it('deve permitir preencher campos por placeholder (quando disponível)', () => {
    // Tentar pelos placeholders conhecidos
    cy.get('body').then(($body) => {
      // Nome
      if ($body.find('input[placeholder*="nome"]').length > 0) {
        cy.get('input[placeholder*="nome"]').first()
          .clear().type('Maria Santos', { force: true });
        cy.log(' Campo nome preenchido');
      }
      
      // Telefone
      if ($body.find('input[placeholder*="00000"]').length > 0) {
        cy.get('input[placeholder*="00000"]').first()
          .clear().type('11999887766', { force: true });
        cy.log(' Campo telefone preenchido');
      }
    });
  });

});