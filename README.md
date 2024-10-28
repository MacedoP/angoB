# angoB
## Criacao da aplicacao
* [1] criiamos a nossa aplicacao usando npx create-next-app@latest 
* [2] depois instalamos o prisma [npm install prisma --save-dev] depois rodamos o comando [npx prisma init --datasource-provider postgresql] 
* [3] depois criamos o nosso ban co de dados no ficheiro prisma, apos a criacao rodamos o comando [npx prisma format] 
* [4] criamos o arquivo que contem os dados do nosso banco ou o ficheiro [seed.ts] e rodamos o seguinte comando para adicionar os dados no banco [npx prisma migrate dev --name init]

* npx prisma format => comando usado para formatar o nosso banco de dados
* npx prisma migrate dev --name init_db => comando para migrar o nosso banco de dados em modo de desenvolvimento, Uma migrate nada mais é quando mudamos o estado do nosso banco de dados,  tipo adicionar novas tabelas ou dados

### Comando para comitar no github pela linha de comando
* 1 git add .
* 2 git commit -m "chore: o nome do seu commit"

### Colocando dados no bancos mais primeiro instalamos o ts- node
* npm install -D ts-node
Apos a instalacao do ts-node rodamos o seguinte comando

* npx prisma db seed => este comando vai colocar os dados que estao no nosso arquivo seed.ts no nosso banco de dados

### Explicacoes Breves sobre o react-next
*O reaxt-next trata todas as pastas com o nome de[page.ts como paginas da nossa aplicacao]
Lembrando que todos os components do reactnext por padrao sao [server-component]
Um server component é um component que é executado no lado do servidor, como bancos de dados ou dados sensiveis
Os nao permitem que seja adicionado neles iteratividade como o click em botao ou um outro evento, ou um estado, caso precisamos fazer uma iteracao precisamos transformar o componente em um lient-component unsado a seguinte sintaxe "use client", dentro do component.

### Tailwind
* Tailwind bibliioteca de estilicao, que nem o css , mais os seus estilos sao feito [inline] ou seja dentro da propria tag

### Prettier
* Usando normalmente para formatar ou organizar os nosso codigo
instalacao do mesmo[npm install -D prettier prettier-plugin-tailwindcss] , lembrando que ele possui um plugin no vscode, mais neste caso estamos a usar ele para formatar os codigo so nosso tailwind

apois instalar o mesmo precisaras criar um ficheiro do memso dentro da pasta [app]
Explicacoes dos caminhos das pastas
Home page esta dentro da paste [app] abixo do arquivo layout, esta é a nossa [Home page]
Biblioteca Shadcn ui
Usado por programadores front-end ajudando assim, na consecao de aplicativos de uma forma mais rapida e sem rodeio, lembrando que todos os componentes desta biblioteca ante de serem usados precisam ser instalados

### Comonado para sua instalacao ou podes consultar a documentacao para saber sobre o mesmo [https://ui.shadcn.com/docs/installation/next]

* Todas as pastas que possuiem um "underline antes indica que nao sao pagina ou nao possuem paginas dentro delas"
Componentes e suas funcoes

* search component => tera um input dentro dele e um botao que vai nos permitir pesquisar servicos em nossa barbearia
* barbershop-item => vai exibir todos as barbearia que temos, mostrara a lista delas
#### Explicacao sobre o nosso banco de dados
* db.barbershop.findMany({}): Este método é uma consulta ao banco de dados. Especificamente, ele está usando uma biblioteca ORM (Object-Relational Mapping) como Prisma para buscar múltiplos registros de uma tabela chamada barbershop.
Accao de copoiar um contacto do nosso footer contacto fonte do codigo
[https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard]

### Biblioteca NextAuth.js
* Ela impplementa autenticacao no next.js, usado em nosso projecto para fazer o login ou se cadastrar com a conta do google, ela nos permite criar, login com redes socias se assim desejares sabares mais siga o link da documentacao [https://next-auth.js.org/providers/google]
* Google developer console
Abra o nome em cima ou pesquise, depois de fazer todos os passos descrito nas anotacios dentro da pasta [api/auth/[...nextauth]] la encontraras mais informacao a respeito do processo.

Apois abrir o cite faça o login com sua conta do google

Procura a aba de criar novo projecto, click ai, passo o nome do projecto, e clicar em criar
## Server actions
### Definição: Uma Server Action é uma função definida dentro de um componente de página ou layout e marcada para rodar no servidor.


* Exemplo de uma Server actions usado para pegar as datas no nosso banco de dado

"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"


/********************************* FUNCAO QUE PEGA OS HORARIOS NO NOSSO BANCO DE DADOS ************************/
interface GetBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = async ({ date }: GetBookingsProps) => {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date), [lte => less then]
        gte: startOfDay(date),[gte => great then]
      },
    },
  })
}

* Execução no Servidor: Por serem executadas no servidor, as Server Actions podem acessar diretamente o banco de dados, variáveis de ambiente e realizar qualquer lógica server-side.
* Chamada: Elas podem ser chamadas diretamente no React, como se fossem funções normais. Mas, ao serem invocadas, a execução realmente ocorre no servidor.

## revalidatePath("/bookings")

### Diferenca entre React e React Next.js
* A diferença principal entre React e Next.js é que o React é uma biblioteca JavaScript para construir interfaces de usuário, enquanto o Next.js é um framework que estende o React para aplicações web completas, adicionando funcionalidades e ferramentas prontas que facilitam o desenvolvimento, como renderização no servidor, roteamento e otimização.

* O que é?: React é uma biblioteca focada apenas na construção de componentes de interface (UI). Ele permite criar interfaces dinâmicas, atualizando apenas partes da página conforme necessário.

* O que é?: Next.js é um framework que inclui React e adiciona funcionalidades que facilitam a criação de aplicações completas, incluindo renderização no servidor, roteamento automático e otimizações de performance.
