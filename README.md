# ShopCar UI

Interface web para gerenciamento de uma locadora de veículos, desenvolvida como projeto da disciplina **Programação com Frameworks Web**. A aplicação permite que usuários se cadastrem, façam login, consultem os veículos disponíveis, realizem locações e acompanhem o histórico das suas locações.

---

## Descrição do projeto

O **ShopCar UI** é o front-end de um sistema de locação de veículos. Ele consome uma API REST (esperada em `http://localhost:3000`) e oferece uma interface completa para o fluxo de locação:

- Autenticação de usuários com JWT;
- Listagem paginada de veículos disponíveis;
- Cadastro de novos veículos;
- Locação de veículos com definição do período;
- Listagem, filtragem e finalização de locações.

A aplicação foi construída com **React + TypeScript + Vite**, utilizando componentes próprios estilizados com `styled-components`, componentes do **Material UI** para diálogos e paginação, e **React Hook Form + Zod** para validação dos formulários.

---

## Tecnologias utilizadas

### Principais

| Tecnologia | Uso no projeto |
| --- | --- |
| [React 19](https://react.dev/) | Biblioteca para construção da interface |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática do código |
| [Vite](https://vite.dev/) | Build e servidor de desenvolvimento |
| [React Router](https://reactrouter.com/) | Rotas, navegação e proteção de páginas |
| [Axios](https://axios-http.com/) | Cliente HTTP para consumo da API |
| [styled-components](https://styled-components.com/) | Estilização dos componentes |
| [Material UI](https://mui.com/) | Componentes de UI (Dialog, Pagination) |

### Formulários e validação

| Tecnologia | Uso no projeto |
| --- | --- |
| [React Hook Form](https://react-hook-form.com/) | Gerenciamento dos formulários |
| [Zod](https://zod.dev/) | Validação dos dados |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | Integração entre React Hook Form e Zod |

### Outras bibliotecas

| Tecnologia | Uso no projeto |
| --- | --- |
| [jwt-decode](https://github.com/henrikjoreteg/jwt-decode) | Leitura do token JWT e verificação de expiração |
| [react-icons](https://react-icons.github.io/react-icons/) | Ícones da interface |
| [react-toastify](https://fkhadra.github.io/react-toastify/) | Notificações de sucesso e erro |
| [@szhsin/react-menu](https://szhsin.github.io/react-menu/) | Menu de usuário no cabeçalho |
| [Emotion](https://emotion.sh/) | Engine de estilos exigida pelo Material UI |

### Ferramentas de desenvolvimento

- **ESLint** — padronização e análise estática do código;
- **typescript-eslint** — regras de lint para TypeScript;
- **@vitejs/plugin-react** — suporte ao React no Vite.

---

## Instalação e execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) **20.19+** ou **22.12+** (versões compatíveis com o Vite)
- `npm` (instalado junto com o Node.js)
- API do ShopCar em execução em `http://localhost:3000`

### Passo a passo

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>

# 2. Acesse a pasta do projeto
cd shopcar_ui

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Após iniciar, a aplicação estará disponível em:

```
http://localhost:5173
```

> **Importante:** o endereço da API está definido em `src/api/api.ts` (`baseURL: 'http://localhost:3000'`). Caso o back-end esteja em outra porta ou host, altere esse valor.

### Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR |
| `npm run build` | Executa a checagem de tipos (`tsc -b`) e gera o build de produção em `dist/` |
| `npm run preview` | Pré-visualiza localmente o build de produção |
| `npm run lint` | Executa o ESLint em todo o projeto |

### Build de produção

```bash
npm run build
npm run preview
```

O resultado do build é gerado na pasta `dist/`.

---

## Estrutura do projeto

```text
shopcar_ui/
├── public/                    # Arquivos estáticos (favicon, ícones)
├── src/
│   ├── api/
│   │   └── api.ts             # Instância do Axios + interceptador de token
│   ├── assets/                # Imagens e ícones internos
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Avatar.tsx         # Avatar com iniciais do usuário
│   │   ├── Badge.tsx          # Etiquetas de status (sucesso/erro/padrão)
│   │   ├── Button.tsx         # Botão customizado (contained/outlined)
│   │   ├── Header.tsx         # Cabeçalho com navegação e menu do usuário
│   │   ├── Input.tsx          # Campo de formulário com label e erro
│   │   ├── Loading.tsx        # Indicador de carregamento
│   │   ├── LoginRoute.tsx     # Redireciona usuários já autenticados
│   │   ├── Logo.tsx           # Logotipo da aplicação
│   │   ├── Logout.tsx         # Remove o token e redireciona para o login
│   │   ├── Pagination.tsx     # Paginação estilizada (Material UI)
│   │   ├── PrivateRoute.tsx   # Protege rotas que exigem autenticação
│   │   ├── RentalFormModal.tsx# Modal de locação de veículo
│   │   ├── Table.tsx          # Tabela genérica e responsiva
│   │   └── Template.tsx       # Layout base com Header + Outlet
│   ├── contexts/
│   │   └── UserContext.tsx    # Contexto do usuário autenticado
│   ├── pages/
│   │   ├── HomePage.tsx       # Listagem de veículos disponíveis
│   │   ├── LoginPage.tsx      # Página de login
│   │   ├── RentalPage.tsx     # Listagem e gestão das locações
│   │   ├── SignupPage.tsx     # Página de cadastro de usuário
│   │   └── VehicleFormPage.tsx# Cadastro de veículo
│   ├── services/              # Comunicação com a API
│   │   ├── AuthService.ts     # Login
│   │   ├── RentalService.ts   # Listagem, criação e finalização de locações
│   │   ├── UserService.ts     # Cadastro de usuários
│   │   └── VehicleService.ts  # Listagem e cadastro de veículos
│   ├── types/                 # Interfaces e tipos TypeScript
│   │   ├── IAuth.ts
│   │   ├── IPagination.ts
│   │   ├── IRental.ts
│   │   ├── IUser.ts
│   │   └── IVehicle.ts
│   ├── utils/
│   │   ├── constants.ts       # Opções de filtros
│   │   └── functions.ts       # Autenticação, formatação de moeda e data
│   ├── App.tsx                # Definição das rotas
│   ├── App.css
│   ├── index.css              # Estilos globais
│   └── main.tsx               # Ponto de entrada da aplicação
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

### Rotas da aplicação

| Rota | Página | Acesso |
| --- | --- | --- |
| `/login` | Login | Público (redireciona se autenticado) |
| `/cadastrar` | Cadastro de usuário | Público |
| `/logout` | Logout | Público (limpa a sessão) |
| `/` | Listagem de veículos | Privado |
| `/veiculos/cadastrar` | Cadastro de veículo | Privado |
| `/locacoes` | Listagem de locações | Privado |

### Integração com a API

| Serviço | Método | Endpoint | Descrição |
| --- | --- | --- | --- |
| `AuthService` | `POST` | `/login` | Autentica o usuário e retorna o token JWT |
| `UserService` | `POST` | `/usuarios` | Cadastra um novo usuário |
| `VehicleService` | `GET` | `/veiculos` | Lista veículos com paginação e filtro de disponibilidade |
| `VehicleService` | `POST` | `/veiculos` | Cadastra um veículo |
| `RentalService` | `GET` | `/locacoes` | Lista locações com paginação e filtro de status |
| `RentalService` | `POST` | `/locacoes` | Cria uma nova locação |
| `RentalService` | `PATCH` | `/locacoes/:id/finalizar` | Finaliza uma locação ativa |

O token JWT é armazenado no `localStorage` (chave `token`) e enviado automaticamente nas requisições pelo cabeçalho `Authorization: Bearer <token>`, por meio de um interceptador do Axios.

---

## Features do projeto

### Autenticação e usuários

- **Cadastro de usuários** com nome, e-mail e senha, com validação de e-mail e senha mínima de 6 caracteres.
- **Login** com validação de credenciais e armazenamento do token JWT.
- **Rotas privadas**: páginas internas só podem ser acessadas por usuários autenticados; caso contrário, o usuário é redirecionado para o login.
- **Verificação de expiração do JWT**: tokens inválidos ou expirados são removidos automaticamente.
- **Logout** com limpeza da sessão e redirecionamento para o login.
- **Contexto global de usuário** (`UserContext`) para exibir o nome do usuário e manter o estado da sessão.
- **Cabeçalho** com avatar gerado a partir das iniciais do nome e menu de usuário.

### Veículos

- **Listagem paginada** dos veículos disponíveis para locação.
- **Tabela responsiva** com ID, marca, modelo, placa, ano, valor da diária e disponibilidade.
- **Formatação de valores em Real (BRL)** e placas em destaque.
- **Contador total de veículos** e indicador de intervalo exibido (`Exibindo X–Y de Z`).
- **Estado vazio** amigável quando não há veículos cadastrados.
- **Cadastro de veículos** com validação de campos obrigatórios, ano e diária maiores que zero, e placa convertida automaticamente para maiúsculas.
- **Feedback visual** de carregamento, sucesso e erro por meio de toasts.

### Locações

- **Modal de locação** a partir da listagem de veículos, exibindo marca, modelo, placa e valor da diária.
- **Seleção do período** com data de início e data prevista de devolução.
- **Validação de datas**: a data prevista deve ser igual ou posterior à data de início; a data mínima é o dia atual.
- **Bloqueio de locação** de veículos indisponíveis.
- **Página "Suas locações"** com histórico completo, dados do veículo, datas, valores e status.
- **Filtros por status**: todas, ativas e finalizadas.
- **Paginação** da listagem de locações.
- **Finalização de locação ativa** com diálogo de confirmação, devolvendo o veículo à disponibilidade.
- **Badges de status** com cores distintas para locações ativas, finalizadas e canceladas.
- **Atualização automática** da listagem e dos contadores após criar ou finalizar uma locação.
- **Estados de carregamento, vazio e erro** com mensagens claras e opção de limpar filtros.

### Experiência de uso

- Interface **responsiva**, com adaptação de tabelas, filtros e formulários para telas menores.
- **Formulários com validação em tempo real** usando Zod e React Hook Form.
- **Notificações (toasts)** para sucesso e erro em todas as operações assíncronas.
- **Componentes reutilizáveis** (Button, Input, Table, Badge, Pagination, Loading) que mantêm a consistência visual.
- **Proteção contra ações duplicadas**: botões e formulários são desabilitados durante o envio.
- **Design system simples** com paleta azul (`#319DFF`, `#005098`), fundos neutros e tipografia Roboto.
