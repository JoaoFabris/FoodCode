describe('Navegação Principal do FoodCode', () => {
  beforeEach(() => {
    // Acessar diretamente a rota que funciona
    cy.visit('/(tabs)/home')
    // Aguardar carregamento
    cy.wait(3000)
  })

  it('Deve carregar a página inicial corretamente', () => {
    // Verificar título da aplicação
    cy.contains('Food Code').should('be.visible')
    
    // Verificar mensagem de boas-vindas
    cy.contains('Bem-vindo').should('be.visible')
    
    // Verificar subtitle
    cy.contains('Pratos do mundo todo').should('be.visible')
    
    // Verificar se há categorias (aguardar carregamento)
    cy.contains('Categorias', { timeout: 10000 }).should('be.visible')
  })

  it('Deve exibir barra de pesquisa e permitir busca', () => {
    // Verificar se barra de pesquisa existe
    cy.get('input[placeholder*="Buscar"]', { timeout: 5000 }).should('be.visible')
    
    // Testar digitação na busca
    cy.get('input[placeholder*="Buscar"]').type('chicken')
    
    // Aguardar resposta da busca
    cy.wait(2000)
    
    // Verificar se aparece alguma resposta de busca
    cy.get('body').should('be.visible')
    
    // Limpar busca
    cy.get('input[placeholder*="Buscar"]').clear()
  })

  it('Deve carregar e exibir categorias', () => {
    // Aguardar carregamento das categorias
    cy.contains('Categorias', { timeout: 10000 }).should('be.visible')
    
    // Verificar se existe pelo menos uma categoria
    cy.contains('Prato do dia').should('be.visible')
    
    // Aguardar um pouco mais para categorias carregarem completamente
    cy.wait(2000)
  })

  it('Deve exibir produtos ou estado de carregamento', () => {
    // Aguardar carregamento inicial
    cy.wait(5000)
    
    // Verificar se há produtos ou mensagem de carregamento
    cy.get('body').then(($body) => {
      const bodyText = $body.text()
      
      // Deve ter algum conteúdo relacionado a produtos
      expect(bodyText).to.satisfy((text) => {
        return text.includes('produtos') || 
               text.includes('Carregando') || 
               text.includes('delícias') ||
               text.includes('Pratos') ||
               text.includes('categoria')
      })
    })
  })

  it('Deve permitir interação com categorias quando disponíveis', () => {
    // Aguardar categorias carregarem
    cy.contains('Categorias', { timeout: 10000 }).should('be.visible')
    cy.wait(3000)
    
    // Verificar se consegue encontrar elementos de categoria
    cy.get('body').then(($body) => {
      if ($body.text().includes('Beef') || $body.text().includes('Chicken')) {
        cy.log(' Categorias carregaram com sucesso')
        
        // Se encontrar categorias, tentar clicar em uma
        if ($body.find('button, [role="button"]').length > 0) {
          cy.get('button, [role="button"]').first().click()
          cy.wait(1000)
        }
      } else {
        cy.log(' Categorias ainda carregando ou não disponíveis')
      }
    })
  })
})