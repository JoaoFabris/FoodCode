// cypress/e2e/02-search-functionality.cy.js
describe('Busca de Produtos', () => {
 beforeEach(() => {
    // Acessar diretamente a rota que funciona
    cy.visit('/(tabs)/home')
    // Aguardar carregamento
    cy.wait(3000)
  })

  it('Deve realizar busca de produtos', () => {
    // Aguardar barra de busca estar visível
    cy.get('input[placeholder*="Buscar"]', { timeout: 5000 }).should('be.visible')
    
    // Digitar termo de busca
    cy.get('input[placeholder*="Buscar"]').type('chicken')
    
    // Aguardar resultados ou mensagem de busca
    cy.wait(2000)
    
    // Verificar se aparece indicação de busca
    cy.contains('resultado', { timeout: 5000 }).should('exist')
  })

  it('Deve limpar busca', () => {
    // Realizar uma busca
    cy.get('input[placeholder*="Buscar"]').type('test')
    cy.wait(1000)
    
    // Limpar busca (assumindo que há um botão de limpar)
    cy.get('input[placeholder*="Buscar"]').clear()
    
    // Verificar se voltou ao estado inicial
    cy.contains('Prato do dia').should('be.visible')
  })
})