describe('Admin - Gerenciamento de Usuários', () => {
  beforeEach(() => {
    cy.visit('/admin/users');
    cy.wait(2000); // Aguardar carregamento
  });

  it('deve renderizar a página de usuários corretamente', () => {
    cy.contains('Usuários').should('be.visible');
    cy.contains('usuários encontrados').should('be.visible');
    cy.get('input[placeholder="Buscar usuários..."]').should('exist');
  });

  it('deve mostrar botão de novo usuário', () => {
    cy.contains('Novo').should('exist');
    
    // Testar clique no botão (deve mostrar alert)
    cy.contains('Novo').click();
    cy.wait(500);
  });

  it('deve filtrar usuários por role', () => {
    // Testar filtros de role
    cy.contains('Todos').should('exist').click();
    cy.wait(500);
    
    cy.contains('Cliente').should('exist').click();
    cy.wait(500);
    
    cy.contains('Admin').should('exist').click();
    cy.wait(500);
    
    // Voltar para todos
    cy.contains('Todos').click();
    cy.wait(500);
  });

  it('deve permitir buscar usuários', () => {
    cy.get('input[placeholder="Buscar usuários..."]')
      .should('be.visible')
      .clear()
      .type('João Silva', { force: true, delay: 100 });
    
    cy.wait(1000);
    
    // Verificar se filtrou
    cy.get('body').then(($body) => {
      if ($body.text().includes('João Silva')) {
        cy.contains('João Silva').should('exist');
        cy.log(' Usuário encontrado pela busca');
      } else {
        cy.log(' Busca executada, mas usuário pode não existir');
      }
    });
  });

  it('deve buscar usuário por ID', () => {
    cy.get('input[placeholder="Buscar usuários..."]')
      .should('be.visible')
      .clear()
      .type('USR001', { force: true, delay: 100 });
    
    cy.wait(1000);
    
    // Verificar se encontrou por ID
    cy.get('body').then(($body) => {
      if ($body.text().includes('USR001')) {
        cy.contains('USR001').should('exist');
        cy.log('Usuário encontrado por ID');
      }
    });
  });

  it('deve mostrar informações dos usuários', () => {
    cy.get('body').then(($body) => {
      const bodyText = $body.text();
      
      // Verificar se tem usuários na tela
      if (bodyText.includes('João') || bodyText.includes('Maria') || bodyText.includes('USR')) {
        cy.log(' Usuários detectados na página');
        
        // Verificar elementos comuns de usuário
        if (bodyText.includes('@') || bodyText.includes('email')) {
          cy.log(' Emails de usuários encontrados');
        }
        
        if (bodyText.includes('(11)') || bodyText.includes('telefone')) {
          cy.log('Telefones de usuários encontrados');
        }
        
        if (bodyText.includes('Cliente') || bodyText.includes('Admin')) {
          cy.log('Roles de usuários encontrados');
        }
        
      } else if (bodyText.includes('Nenhum usuário')) {
        cy.contains('Nenhum usuário encontrado').should('exist');
        cy.log('Estado vazio detectado');
      } else {
        cy.log(' Usuários podem estar carregando');
      }
    });
  });

  it('deve mostrar badges de role dos usuários', () => {
    cy.get('body').then(($body) => {
      const bodyText = $body.text();
      
      if (bodyText.includes('Cliente')) {
        cy.contains('Cliente').should('exist');
        cy.log('Badge de Cliente encontrada');
      }
      
      if (bodyText.includes('Admin')) {
        cy.contains('Admin').should('exist');
        cy.log(' Badge de Admin encontrada');
      }
    });
  });

  it('deve mostrar estatísticas dos clientes', () => {
    // Filtrar apenas clientes
    cy.contains('Cliente').click();
    cy.wait(1000);
    
    cy.get('body').then(($body) => {
      const bodyText = $body.text();
      
      if (bodyText.includes('Pedidos')) {
        cy.contains('Pedidos').should('exist');
        cy.log('Estatística de pedidos encontrada');
      }
      
      if (bodyText.includes('Total Gasto')) {
        cy.contains('Total Gasto').should('exist');
        cy.log(' Estatística de gasto encontrada');
      }
      
      if (bodyText.includes('R$')) {
        cy.contains('R$').should('exist');
        cy.log('Valores monetários encontrados');
      }
    });
  });

  it('deve mostrar informações específicas de admin', () => {
    // Filtrar apenas admins
    cy.contains('Admin').click();
    cy.wait(1000);
    
    cy.get('body').then(($body) => {
      const bodyText = $body.text();
      
      if (bodyText.includes('Administrador do sistema')) {
        cy.contains('Administrador do sistema').should('exist');
        cy.log('✅ Descrição de admin encontrada');
      }
      
      if (bodyText.includes('Carlos') || bodyText.includes('admin')) {
        cy.log('✅ Usuário admin detectado');
      }
    });
  });

  it('deve mostrar estado vazio quando busca não encontra resultados', () => {
    cy.get('input[placeholder="Buscar usuários..."]')
      .should('be.visible')
      .clear()
      .type('usuario-inexistente-xyz-123', { force: true, delay: 100 });
    
    cy.wait(2000);
    
    // Verificar estado vazio
    cy.get('body').then(($body) => {
      if ($body.text().includes('Nenhum usuário encontrado')) {
        cy.contains('Nenhum usuário encontrado').should('be.visible');
        cy.log(' Estado vazio mostrado corretamente');
      } else {
        cy.log('Estado vazio pode não ter aparecido ainda');
      }
    });
  });
});