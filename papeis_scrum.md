# PAPÉIS SCRUM - PROJETO FOODCODE
## Migração de Banco de Dados Relacional para NoSQL

---

##  Product Owner
**Responsável:** João Fabris

### Responsabilidades no Projeto:
-  **Priorizar funcionalidades** baseadas nas necessidades do sistema de delivery
-  **Validar entregas técnicas** (modelagem SQL, conversão NoSQL, DER)
-  **Definir critérios de aceitação** para migração de dados
-  **Tomar decisões** sobre estrutura das collections MongoDB
-  **Aprovar** escolhas de desnormalização vs referências
-  **Validar** integridade dos dados migrados

### Decisões Tomadas:
- Estrutura do banco com 6 entidades principais
- Sistema de favoritos como array de referências
- Pedidos com produtos embutidos (performance)
- Categorias desnormalizadas nos produtos

---

##  Scrum Master
**Responsável:** João Fabris

### Responsabilidades no Projeto:
-  **Organizar o backlog**
- **Facilitar o desenvolvimento** removendo impedimentos técnicos
-  **Garantir qualidade** dos scripts SQL e MongoDB
-  **Organizar entregas** seguindo cronograma da atividade
-  **Documentar processo** ágil utilizado
-  **Controlar tempo** de cada etapa do projeto

### Rituais Implementados:
- Planning: Definição das etapas da migração
- Daily: Acompanhamento diário do progresso
- Review: Validação dos códigos SQL/NoSQL
- Retrospective: Lições aprendidas na conversão

---

##  Time de Desenvolvimento  
**Responsável:** João Fabris

### Responsabilidades Técnicas:
-  **Modelar banco relacional** (MySQL) com relacionamentos
-  **Implementar** CREATE TABLE, INSERT INTO, SELECT
- **Converter estrutura** para modelo de documentos (MongoDB)
-  **Criar scripts** insertMany com dados consistentes
-  **Implementar relacionamentos** via referências e embutimento
-  **Validar integridade** dos ObjectIds e referências
- **Documentar** processo de migração

### Tecnologias Utilizadas:
- **Banco Relacional:** MySQL 8.0
- **Banco NoSQL:** MongoDB 7.0
- **Modelagem:** MySQL Workbench
- **Versionamento:** Git
- **Documentação:** Markdown

---

## Distribuição de Tempo por Papel

 Papel  % Tempo  Atividades Principais 

| Product Owner | 25% | Definições, validações, critérios |
| Scrum Master | 25% | Organização, documentação, controle |
| Desenvolvedor | 50% | Implementação, testes, migração |

---

##  Metodologia Aplicada

### Sprint 1 (2 dias): Modelagem SQL
- Criação do DER
- Implementação das tabelas
- Inserção de dados de teste

### Sprint 2 (2 dias): Conversão NoSQL  
- Análise da estrutura para documentos
- Criação dos scripts MongoDB
- Validação dos relacionamentos

### Sprint 3 (1 dia): Documentação
- Criação do quadro Kanban
- Definição dos papéis
- Entrega final

---

## Observações Importantes

Como projeto **individual acadêmico**, assumo múltiplos papéis com divisão temporal:

- **08h-10h:** Product Owner (definições estratégicas)
- **10h-16h:** Desenvolvedor (implementação técnica) 
- **16h-18h:** Scrum Master (organização e documentação)

Esta abordagem garante **visão holística** do projeto e **aplicação prática** dos conceitos ágeis em desenvolvimento individual.

---

**Data:** Janeiro 2025  
**Versão:** 1.0  
**Projeto:** FoodCode - Migração SQL → NoSQL