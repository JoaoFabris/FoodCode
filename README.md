# FoodCode - Sistema de Delivery de Comida 🍔

Sistema completo de delivery de comida desenvolvido com React Native/Expo, incluindo área do cliente e painel administrativo.

## 📱 **Funcionalidades**

### **Cliente:**
-  Navegação e catálogo de produtos
-  Busca e filtros por categoria
-  Carrinho de compras
-  Sistema de login e cadastro
-  Lista de favoritos
-  Checkout e confirmação de pedidos

### **Admin:**
-  Gerenciamento de produtos
-  Gerenciamento de usuários
-  Gerenciamento de pedidos
-  Dashboard administrativo

##  **Como Rodar o Sistema**

### **Pré-requisitos:**
- Node.js (versão 16+)
- npm ou yarn
- Expo CLI
- Emulador Android/iOS ou dispositivo físico

### **Instalação:**

1. **Clone o repositório:**
   ```bash
   git clone [seu-repositorio]
   cd foodCode


   Instale as dependências:

bash
Copiar

npm install
Inicie o servidor de desenvolvimento:

bash
Copiar

npm start
# ou
npx expo start
Abra o app:

Android: Pressione a ou npx expo start --android
iOS: Pressione i ou npx expo start --ios
Web: Pressione w ou npx expo start --web


   Testes Automatizados com Cypress
Configuração dos Testes:
Certifique-se que o Cypress está instalado:

bash
Copiar

npm install cypress --save-dev
Inicie o servidor da aplicação:

bash
Copiar

npm start
Mantenha rodando em uma aba separada do terminal

Executar Testes:
Modo Interativo (Recomendado):
bash
Copiar

npm run cypress:open
Abre a interface visual do Cypress
Permite executar testes individualmente
Melhor para debug e desenvolvimento
Modo Headless (CI/CD):
bash
Copiar

npm run cypress:run
Executa todos os testes em modo headless
Gera relatórios e screenshots
Ideal para integração contínua
Testes Específicos:
bash
Copiar

# Executar um teste específico
npx cypress run --spec "cypress/e2e/01-home-navigation.cy.js"

# Executar grupo de testes
npx cypress run --spec "cypress/e2e/*-admin-*.cy.js"
 Cenários de Teste Implementados
#	Cenário	Arquivo	Status
1	Navegação na Home	01-home-navigation.cy.js	
2	Funcionalidade de Busca	02-search-functionality.cy.js	
3	Carrinho de Compras	03-carrinho-compras.cy.js	
4	Sistema de Login	04-sistema-login.cy.js	
5	Admin - Produtos	05-admin-produtos.cy.js	
6	Admin - Usuários	06-admin-usuarios.cy.js	
7	Admin - Pedidos	07-admin-pedidos.cy.js	



Cobertura dos Testes:
 Fluxos de usuário final (navegação, busca, carrinho, login)
 Fluxos administrativos (gestão de produtos, usuários, pedidos)
 Validações de formulários e estados de erro
 Responsividade em diferentes tamanhos de tela
 Estados de loading e feedback visual
 Configuração do Cypress
Configuração Principal (cypress.config.ts):
typescript
Copiar

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8081',
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
  },
});