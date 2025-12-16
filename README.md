# FoodCode

## Visão Geral

O **FoodCode** é um aplicativo mobile desenvolvido com **React Native** e **Expo**, utilizando **Expo Router** para navegação baseada em arquivos. O projeto simula um ecossistema de pedidos de comida, contemplando fluxo de usuário final (catálogo, carrinho, checkout, favoritos) e um **painel administrativo** para gestão de produtos, pedidos e usuários.

Este projeto está sendo desenvolvido no contexto acadêmico (Projeto de Extensão), com foco em boas práticas de arquitetura, organização de código e experiência do usuário.

---

## Tecnologias Utilizadas

* **React Native**
* **Expo (SDK 54)**
* **Expo Router** (File-based routing)
* **TypeScript**
* **Context API** (gerenciamento de estado)
* **React Navigation**
* **Async Storage**
* **Expo Image / Image Picker**
* **ESLint**

---

## Funcionalidades

### Usuário Final

* Listagem de produtos por categoria
* Busca de produtos
* Visualização de detalhes do produto
* Adição e remoção de itens no carrinho
* Checkout e confirmação de pedido
* Sistema de favoritos
* Autenticação de usuário

### Área Administrativa

* Login administrativo
* Dashboard administrativo
* Cadastro e listagem de produtos
* Visualização de pedidos
* Gerenciamento de usuários

---

## Estrutura do Projeto

```bash
src/
├── app/                 # Rotas (Expo Router)
│   ├── (tabs)/          # Navegação principal por abas
│   ├── admin/           # Área administrativa
│   ├── login.tsx        # Login do usuário
│   ├── checkout.tsx     # Checkout
│   └── order-confirmation.tsx
│
├── components/          # Componentes reutilizáveis
├── context/             # Contextos globais (Auth, Cart, Products, etc.)
├── constants/           # Constantes e tema
├── data/                # Dados mockados (produtos e categorias)
├── services/            # Serviços e integrações (API)
├── hooks/               # Hooks customizados
├── utils/               # Funções utilitárias
└── types/               # Tipagens globais
```

---

## Pré-requisitos

* **Node.js** (versão LTS recomendada)
* **npm** ou **yarn**
* **Expo CLI**
* Android Studio (para emulador Android) ou Expo Go

---

## Instalação e Execução

1. Instale as dependências:

```bash
npm install
```

2. Inicie o projeto:

```bash
npx expo start
```

3. Execute no ambiente desejado:

* Emulador Android
* Expo Go (QR Code)
* Web

---

## Scripts Disponíveis

```bash
npm start           # Inicia o Expo
npm run android     # Executa no Android
npm run ios         # Executa no iOS
npm run web         # Executa no navegador
npm run lint        # Executa o lint
npm run reset-project # Reseta o projeto para o estado inicial do Expo
```

---

## Estado e Arquitetura

O gerenciamento de estado é feito via **Context API**, com contextos dedicados para:

* Autenticação (`AuthContext`)
* Carrinho (`CartContext`)
* Produtos (`ProductsContext`)
* Favoritos (`FavoritesContext`)
* Administração (`AdminContext`)

Essa abordagem mantém o projeto organizado, escalável e de fácil manutenção.

---

## API / Dados

Atualmente, o projeto utiliza **dados mockados**, localizados em:

```bash
src/data/
```

Há também uma camada de serviço preparada para integração com APIs externas:

```bash
src/services/mealApi.ts
```

---

## Status do Projeto

🚧 **Em desenvolvimento**

Funcionalidades podem sofrer alterações conforme evolução do projeto acadêmico.

---

## Autor

**João Fabris**
Projeto desenvolvido para fins acadêmicos no curso de Análise e Desenvolvimento de Sistemas.

---

## Licença

Este projeto é de uso acadêmico e educacional.
