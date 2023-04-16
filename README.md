# TCC - Sistema de gerenciamento de grupos de estudo

- README temporário, vou atualizar conforme o projeto for avançando.

## Descrição

Este projeto consiste em um sistema de gerenciamento de grupos de estudo que permite aos usuários criar grupos, adicionar membros, organizar eventos, compartilhar arquivos, conversar em tempo real, obter feedback sobre sua participação e muito mais. Além disso, possibilita que professores e moderadores gerenciem os grupos de estudo e os membros vinculados à sua instituição.

## Tecnologias

### Back-end
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Sequelize](https://sequelize.org/)
### Front-end
- [React](https://reactjs.org/) (Em desenvolvimento)

### Banco de dados
- [MariaDB](https://mariadb.org/)

## Instalação

### Instalando dependências

1. Dentro da pasta "Backend", execute o seguinte comando para instalar as dependências do projeto:

```bash
yarn install
```

### Configurando o banco de dados **(temporário)**

1. Crie um banco de dados no MariaDB com o nome "tcc".
2. Adicione um usuário com o nome "void" e senha "123".
3. Dê permissões para o usuário "void" no banco de dados "tcc".

### Adicionando as tabelas ao banco de dados

1. Entre na pasta "src" e execute o seguinte comando:

```bash
npx sequelize db:migrate
```

### Executando o projeto

1. Dentro da pasta "Backend", execute o seguinte comando para executar o projeto:

```bash
yarn run
```

## Autor

### **Iago Guernieri de Araújo**