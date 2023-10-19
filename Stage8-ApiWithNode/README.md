Para criar o projeto:

1 - cd caminho do diretorio
2 - "npm init -y" => inicializar um projeto
3 - "npm install express --save" => instalar dependência/biblioteca express ao projeto (lib para cuidar das requisições e respostas)
4 - "npm install nodemon --save-dev" => instalar biblioteca servidor (-dev comando para instalar apenas no modo desenvolvimento)
5 - "npm install express-async-errors --save"
6 - "npm install sqlite3 sqlite --save" => instalar pacote do banco de dados
7 - instalar SGBD beekeeper
8 = "npm install bcryptjs --save" --biblioteca para criptografar senha
9 - "npm install date-and-time --save" => biblioteca DateTime

10 - "npm install knex --save" => biblioteca QueryBuilder
11 - "npx knex init" => para criar o arquivo de configuração do Knex

12 - "npm install jsonwebtoken" instalar biblioteca JWT
13 - "npm install multer" biblioteca para tratar arquivos
14 - "npm install cors"

15 - "npm install dotenv --save"
16 - "npx pm2 init" para instalar o gerenciador de lifetime API
17 - "npm install pm2"

Após clonar, deve se executar:

1 - "npm install"
2 - "npx knex migrate:make creteTags"
3 - "npx knex migrate:latest" para o Knex aplicar a ultima migration

NPM => ferramenta utilizada para instalar pacotes.
NPX => ferramenta utilizada para executar pacotes.
