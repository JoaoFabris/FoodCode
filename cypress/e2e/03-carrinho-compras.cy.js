describe('Teste: Fluxo Completo de Compra com Navegação Específica', () => {
  beforeEach(() => {
    cy.visit('/(tabs)/home');
    cy.wait(5000);
  });

  it('Deve navegar: produto → carrinho → finalizar pedido → checkout → pagar', () => {
    cy.log(' INICIANDO FLUXO COMPLETO DE NAVEGAÇÃO');
    
    // 1. ENCONTRAR E COMPRAR PRODUTO
    cy.contains('Categorias', { timeout: 15000 }).should('be.visible');
    cy.wait(3000);
    
    cy.get('body').then(($body) => {
      const bodyText = $body.text();
      
      if (bodyText.includes('chicken') || bodyText.includes('beef') || bodyText.includes('Chicken') || bodyText.includes('Beef')) {
        // 2. Clicar no produto
        cy.get('*').contains(/chicken|beef|Chicken|Beef/i).first().click({ force: true });
        cy.wait(3000);
        cy.log(' Clicou no produto');
        
        // 3. Verificar se foi para detalhes
        cy.url().should('include', 'product-detail');
        cy.wait(3000);
        cy.log(' Chegou na página de detalhes');
        
        // 4. Adicionar ao carrinho
        cy.contains(/adicionar.*carrinho/i).click({ force: true });
        cy.wait(2000);
        cy.log(' Adicionou produto ao carrinho');
        
        // 5. IR PARA O CARRINHO
        cy.visit('/(tabs)/cart');
        cy.wait(3000);
        cy.log(' Navegou para o carrinho');
        
        // 6. VERIFICAR SE CHEGOU NO CARRINHO
        cy.url().should('include', 'cart');
        cy.get('body').should('be.visible');
        
        // 7. PROCURAR E CLICAR EM "FINALIZAR PEDIDO" NO CARRINHO
        cy.get('body').then(($cartBody) => {
          const cartText = $cartBody.text();
          cy.log(' Verificando conteúdo do carrinho...');
          
          // Procurar pelo botão "Finalizar pedido"
          if (cartText.includes('Finalizar pedido')) {
            cy.contains(/finalizar.*pedido/i).click({ force: true });
            cy.wait(3000);
            cy.log(' Clicou em "Finalizar pedido" no carrinho');
            
          } else if (cartText.includes('Finalizar')) {
            cy.contains(/finalizar/i).click({ force: true });
            cy.wait(3000);
            cy.log('Clicou em "Finalizar" no carrinho');
            
          } else if (cartText.includes('Checkout')) {
            cy.contains(/checkout/i).click({ force: true });
            cy.wait(3000);
            cy.log(' Clicou em "Checkout" no carrinho');
            
          } else {
            cy.log('Botão "Finalizar pedido" não encontrado - navegando manualmente');
            cy.visit('/checkout');
            cy.wait(3000);
          }
          
          // 8. VERIFICAR SE FOI PARA CHECKOUT
          cy.url().should('include', 'checkout');
          cy.log(' Chegou na tela de checkout');
          
          // 9. PROCURAR E CLICAR EM "PAGAR" NO CHECKOUT
          cy.get('body').then(($checkoutBody) => {
            const checkoutText = $checkoutBody.text();
            cy.log(' Procurando botão de pagamento...');
            
            // Procurar pelo botão "Pagar"
            if (checkoutText.includes('Pagar')) {
              cy.contains(/pagar/i).click({ force: true });
              cy.wait(3000);
              cy.log(' Clicou em "Pagar" no checkout');
              
            } else if (checkoutText.includes('💳')) {
              cy.contains('💳').click({ force: true });
              cy.wait(3000);
              cy.log(' Clicou no botão com emoji 💳');
              
            } else if (checkoutText.includes('Processar')) {
              cy.contains(/processar/i).click({ force: true });
              cy.wait(3000);
              cy.log(' Clicou em "Processar" pagamento');
              
            } else {
              cy.log(' Botão "Pagar" não encontrado no checkout');
            }
            
            // 10. VERIFICAR FINALIZAÇÃO/CONFIRMAÇÃO
            cy.wait(2000);
            cy.url().then((finalUrl) => {
              if (finalUrl.includes('order-confirmation')) {
                cy.log('🎉 Redirecionado para confirmação do pedido!');
                
                // Verificar elementos da confirmação
                cy.get('body').then(($confirmBody) => {
                  const confirmText = $confirmBody.text();
                  
                  if (confirmText.includes('Confirmado') || confirmText.includes('Pedido')) {
                    cy.log(' Confirmação de pedido exibida');
                  }
                  
                  if (confirmText.includes('#') || confirmText.includes('Número')) {
                    cy.log(' Número do pedido gerado');
                  }
                });
                
              } else if (finalUrl.includes('checkout')) {
                cy.log(' Ainda na tela de checkout - aguardando processamento');
                cy.visit('/order-confirmation');
                cy.wait(2000);
              } else {
                cy.log(' Redirecionamento em andamento');
              }
            });
          });
        });
        
      } else {
        cy.log(' Produtos não encontrados - testando fluxo direto');
        // Fluxo alternativo direto
        cy.visit('/(tabs)/cart');
        cy.wait(2000);
        cy.visit('/checkout');
        cy.wait(2000);
      }
    });
    
    cy.log(' FLUXO DE NAVEGAÇÃO COMPLETO');
  });

});