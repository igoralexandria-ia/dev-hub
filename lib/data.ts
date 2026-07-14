export type Level = 'iniciante' | 'intermediario' | 'avancado'

export type CommandOption = {
  flag: string
  description: string
}

export type OsCommand = {
  windows?: string
  mac?: string
  linux?: string
  default: string
}

export type Command = {
  id: string
  label: string
  command: string | OsCommand
  description: string
  whenToUse: string
  options?: CommandOption[]
  example?: string
  tags: string[]
}

export type TutorialStep = {
  title: string
  description: string
  command?: string | OsCommand
  link?: { url: string; label: string }
}

export type TutorialContent = {
  windows: TutorialStep[]
  mac: TutorialStep[]
  linux: TutorialStep[]
}

export type Tutorial = {
  id: string
  title: string
  description: string
  content: TutorialContent
}

export type Technology = {
  slug: string
  name: string
  category: string
  tagline: string
  description: string
  level: Level
  color: string
  iconUrl: string
  tags: string[]
  docsUrl: string
  commands: Command[]
  tutorials?: Tutorial[]
}

export type StackStep = {
  title: string
  command?: string
  description: string
}

export type Stack = {
  slug: string
  name: string
  description: string
  technologies: string[]
  level: Level
  tags: string[]
  popularity: number
  steps: StackStep[]
}

export const levelLabels: Record<Level, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

export const technologies: Technology[] = [
  {
    slug: 'nextjs',
    name: 'Next.js',
    category: 'Framework Web',
    tagline: 'O framework React para produção',
    description:
      'Framework full-stack baseado em React com App Router, Server Components, rotas de API e renderização híbrida.',
    level: 'intermediario',
    color: '#ffffff',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    tags: ['react', 'ssr', 'fullstack', 'frontend'],
    docsUrl: 'https://nextjs.org/docs',
    commands: [
      {
        id: 'nextjs-create',
        label: 'Criar projeto',
        command: 'npx create-next-app@latest meu-app',
        description: 'Cria um novo projeto Next.js com estrutura inicial e dependências configuradas.',
        whenToUse: 'No início de um novo projeto, quando você quer o scaffold oficial com TypeScript, ESLint e Tailwind opcionais.',
        options: [
          { flag: '--typescript', description: 'Inicializa o projeto com TypeScript.' },
          { flag: '--tailwind', description: 'Adiciona e configura o Tailwind CSS.' },
          { flag: '--app', description: 'Usa o App Router (padrão nas versões recentes).' },
        ],
        example: 'npx create-next-app@latest meu-app --typescript --tailwind --app',
        tags: ['instalar', 'criar', 'scaffold'],
      },
      {
        id: 'nextjs-dev',
        label: 'Rodar em desenvolvimento',
        command: 'npm run dev',
        description: 'Inicia o servidor de desenvolvimento com Hot Module Replacement.',
        whenToUse: 'Durante o desenvolvimento local para ver mudanças em tempo real.',
        example: 'npm run dev',
        tags: ['rodar', 'dev', 'servidor'],
      }
    ],
    tutorials: [
      {
        id: 'tut-nextjs-setup',
        title: 'Instalação e Setup do Zero',
        description: 'Prepare seu ambiente instalando o Node.js e crie seu primeiro projeto Next.js.',
        content: {
          windows: [
            {
              title: 'Instalar o Node.js',
              description: 'O ecossistema JavaScript precisa do Node.js instalado. Baixe o instalador oficial para Windows (.msi).',
              link: { url: 'https://nodejs.org/', label: 'Baixar Node.js' }
            },
            {
              title: 'Verificar Instalação',
              description: 'Abra o PowerShell ou Prompt de Comando e verifique as versões.',
              command: 'node -v && npm -v'
            },
            {
              title: 'Criar Projeto',
              description: 'Use o NPX para inicializar o setup do Next.js.',
              command: 'npx create-next-app@latest meu-projeto'
            }
          ],
          mac: [
            {
              title: 'Instalar o Node.js via Homebrew',
              description: 'Use o gerenciador de pacotes nativo do macOS para instalar o Node.',
              command: 'brew install node'
            },
            {
              title: 'Verificar Instalação',
              description: 'Verifique se o Node foi instalado com sucesso no terminal.',
              command: 'node -v && npm -v'
            },
            {
              title: 'Criar Projeto',
              description: 'Use o NPX para inicializar o setup do Next.js.',
              command: 'npx create-next-app@latest meu-projeto'
            }
          ],
          linux: [
            {
              title: 'Instalar o Node.js via NVM',
              description: 'Recomendamos o NVM (Node Version Manager) no Linux.',
              command: 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash'
            },
            {
              title: 'Instalar Versão LTS',
              description: 'Reinicie o terminal e instale a última versão do Node.',
              command: 'nvm install --lts'
            },
            {
              title: 'Criar Projeto',
              description: 'Use o NPX para inicializar o setup do Next.js.',
              command: 'npx create-next-app@latest meu-projeto'
            }
          ]
        }
      }
    ]
  },
  {
    slug: 'git',
    name: 'Git',
    category: 'Versionamento',
    tagline: 'O sistema de controle de versão distribuído',
    description: 'A ferramenta essencial para rastrear mudanças no código, criar branches e trabalhar em equipe no GitHub/GitLab.',
    level: 'iniciante',
    color: '#F05032',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    tags: ['versionamento', 'repositorio', 'github', 'devops'],
    docsUrl: 'https://git-scm.com/doc',
    commands: [
      {
        id: 'git-clone',
        label: 'Clonar Repositório',
        command: 'git clone https://github.com/usuario/repo.git',
        description: 'Baixa um repositório remoto para a sua máquina local.',
        whenToUse: 'Quando você quer trabalhar em um projeto que já existe online.',
        example: 'git clone https://github.com/facebook/react.git',
        tags: ['baixar', 'iniciar']
      },
      {
        id: 'git-add',
        label: 'Adicionar ao Staging',
        command: 'git add .',
        description: 'Prepara as mudanças dos arquivos para o próximo commit.',
        whenToUse: 'Sempre que você altera ou cria arquivos e quer salvá-los no próximo commit.',
        options: [
          { flag: '.', description: 'Adiciona todas as modificações no diretório atual e subdiretórios.' },
          { flag: '<arquivo>', description: 'Adiciona apenas o arquivo específico.' }
        ],
        example: 'git add index.js',
        tags: ['preparar', 'add']
      },
      {
        id: 'git-commit',
        label: 'Criar um Commit',
        command: 'git commit -m "feat: adiciona nova funcionalidade"',
        description: 'Salva as mudanças em staging no histórico do repositório local.',
        whenToUse: 'Sempre que terminar uma unidade lógica de trabalho.',
        options: [
          { flag: '-m', description: 'Permite passar a mensagem do commit diretamente na linha de comando.' },
          { flag: '-am', description: 'Adiciona todos os arquivos modificados (já rastreados) e commita.' }
        ],
        example: 'git commit -m "fix: corrige bug no header"',
        tags: ['salvar', 'historico']
      },
      {
        id: 'git-push',
        label: 'Enviar (Push)',
        command: 'git push -u origin main',
        description: 'Envia os commits locais para o repositório remoto.',
        whenToUse: 'Quando você quer que sua equipe (ou o GitHub) receba as suas atualizações.',
        options: [
          { flag: '-u', description: '(Upstream) Vincula a branch local à branch remota, permitindo usar apenas "git push" no futuro.' },
          { flag: 'origin', description: 'O nome padrão do repositório remoto configurado.' }
        ],
        example: 'git push -u origin feature-nova',
        tags: ['enviar', 'upload']
      },
      {
        id: 'git-pull',
        label: 'Receber e Mesclar (Pull)',
        command: 'git pull origin main',
        description: 'Busca as atualizações do servidor remoto e tenta mesclá-las automaticamente com sua branch atual.',
        whenToUse: 'Sempre que for começar o trabalho, para garantir que você tem a versão mais recente.',
        example: 'git pull origin develop',
        tags: ['atualizar', 'baixar']
      },
      {
        id: 'git-fetch',
        label: 'Buscar Alterações (Fetch)',
        command: 'git fetch origin',
        description: 'Baixa as alterações do servidor remoto para sua máquina, mas NÃO as aplica na sua branch.',
        whenToUse: 'Quando você quer ver o que mudou no servidor antes de decidir fazer um merge.',
        example: 'git fetch --all',
        tags: ['atualizar', 'inspecionar']
      },
      {
        id: 'git-branch',
        label: 'Listar Branches',
        command: 'git branch',
        description: 'Lista todas as branches locais do projeto. A branch atual terá um asterisco (*).',
        whenToUse: 'Para saber em qual ramificação de código você está no momento.',
        options: [
          { flag: '-a', description: 'Lista todas as branches (locais e remotas).' }
        ],
        example: 'git branch -a',
        tags: ['lista', 'ramificacao']
      },
      {
        id: 'git-branch-rename',
        label: 'Renomear Branch',
        command: 'git branch -m novo-nome',
        description: 'Renomeia a branch em que você está no momento.',
        whenToUse: 'Quando você digitou o nome da branch atual incorretamente.',
        example: 'git branch -m feature-login',
        tags: ['renomear', 'ramificacao']
      },
      {
        id: 'git-checkout',
        label: 'Trocar de Branch (Checkout)',
        command: 'git checkout nome-da-branch',
        description: 'Muda sua área de trabalho para outra branch existente.',
        whenToUse: 'Quando você precisa trabalhar em outra funcionalidade ou versão do código.',
        options: [
          { flag: '-b', description: 'Cria uma nova branch e já troca para ela.' }
        ],
        example: 'git checkout -b feature-nova',
        tags: ['trocar', 'ramificacao', 'checkout']
      },
      {
        id: 'git-switch',
        label: 'Mudar de Branch (Switch)',
        command: 'git switch nome-da-branch',
        description: 'Comando mais moderno (introduzido no Git 2.23) específico para trocar de branch, substituindo o uso do checkout para este fim.',
        whenToUse: 'Quando quiser apenas mudar de branch de forma mais semântica e segura que o checkout.',
        options: [
          { flag: '-c', description: 'Cria uma nova branch e muda para ela (semelhante ao checkout -b).' }
        ],
        example: 'git switch -c feature-nova',
        tags: ['trocar', 'ramificacao', 'switch']
      },
      {
        id: 'git-tag',
        label: 'Criar Tag (Release)',
        command: 'git tag v1.0.0',
        description: 'Cria uma etiqueta no commit atual, útil para marcar releases e versões importantes.',
        whenToUse: 'Quando finalizar uma versão do seu software que será lançada para produção.',
        example: 'git tag v1.0.0 && git push origin v1.0.0',
        tags: ['versao', 'release', 'etiqueta']
      }
    ],
    tutorials: [
      {
        id: 'tut-git-setup',
        title: 'Instalação e Configuração Inicial',
        description: 'Instale o Git e configure seu perfil para poder interagir com repositórios no GitHub ou GitLab.',
        content: {
          windows: [
            {
              title: 'Baixar e Instalar o Git',
              description: 'Baixe o instalador do Git para Windows (Git Bash). Instale mantendo a maior parte das opções padrão (Next, Next...).',
              link: { url: 'https://git-scm.com/download/win', label: 'Baixar Git BASH' }
            },
            {
              title: 'Configurar Nome',
              description: 'Abra o Git Bash e configure o nome que aparecerá nos seus commits.',
              command: 'git config --global user.name "Seu Nome Aqui"'
            },
            {
              title: 'Configurar Email',
              description: 'Configure o email. Importante: use o mesmo email da sua conta do GitHub/GitLab.',
              command: 'git config --global user.email "seuemail@exemplo.com"'
            }
          ],
          mac: [
            {
              title: 'Instalar o Git',
              description: 'A maneira mais fácil no Mac é instalar o Xcode Command Line Tools. Ao digitar git, o sistema pedirá para instalar, se não tiver.',
              command: 'git --version'
            },
            {
              title: 'Configurar Nome',
              description: 'Configure seu nome no Terminal.',
              command: 'git config --global user.name "Seu Nome Aqui"'
            },
            {
              title: 'Configurar Email',
              description: 'Configure seu email (use o do GitHub).',
              command: 'git config --global user.email "seuemail@exemplo.com"'
            }
          ],
          linux: [
            {
              title: 'Instalar o Git',
              description: 'Use o gerenciador de pacotes da sua distribuição.',
              command: 'sudo apt update && sudo apt install git -y'
            },
            {
              title: 'Configurar Nome',
              description: 'Configure seu nome no Terminal.',
              command: 'git config --global user.name "Seu Nome Aqui"'
            },
            {
              title: 'Configurar Email',
              description: 'Configure seu email (use o do GitHub).',
              command: 'git config --global user.email "seuemail@exemplo.com"'
            }
          ]
        }
      }
    ]
  },
  {
    slug: 'python',
    name: 'Python',
    category: 'Linguagem',
    tagline: 'Linguagem versátil e legível',
    description:
      'Linguagem de programação de alto nível usada em web, data science, automação e scripting.',
    level: 'iniciante',
    color: '#3776ab',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    tags: ['backend', 'data', 'scripting'],
    docsUrl: 'https://docs.python.org/3/',
    commands: [
      {
        id: 'python-venv',
        label: 'Criar ambiente virtual',
        command: {
          default: 'python -m venv .venv && source .venv/bin/activate',
          windows: 'python -m venv .venv && .venv\\Scripts\\activate',
          mac: 'python3 -m venv .venv && source .venv/bin/activate',
          linux: 'python3 -m venv .venv && source .venv/bin/activate',
        },
        description: 'Cria um ambiente virtual isolado para as dependências do projeto.',
        whenToUse: 'No início de todo projeto Python para isolar dependências do sistema.',
        example: 'python -m venv .venv && source .venv/bin/activate',
        tags: ['configurar', 'ambiente', 'venv'],
      },
      {
        id: 'python-pip',
        label: 'Instalar pacotes',
        command: 'pip install -r requirements.txt',
        description: 'Instala todas as dependências listadas no arquivo requirements.txt.',
        whenToUse: 'Após clonar um projeto ou ao configurar o ambiente.',
        example: 'pip install fastapi uvicorn',
        tags: ['instalar', 'pip', 'dependencias'],
      },
    ],
    tutorials: [
      {
        id: 'tut-python-setup',
        title: 'Instalação do Zero',
        description: 'Baixe o Python, configure as variáveis de ambiente e instale pacotes com PIP.',
        content: {
          windows: [
            {
              title: 'Baixar e Instalar',
              description: 'Baixe o Python e na tela inicial de instalação marque CRITICAMENTE a opção "Add python.exe to PATH" antes de prosseguir.',
              link: { url: 'https://www.python.org/downloads/windows/', label: 'Baixar Python' }
            },
            {
              title: 'Verificar PIP e Python',
              description: 'O PIP (gerenciador de pacotes) vem incluso nas novas versões.',
              command: 'python --version && pip --version'
            },
            {
              title: 'Seu primeiro script',
              description: 'Crie um arquivo main.py, e o execute pelo terminal.',
              command: 'echo print("Hello Python!") > main.py && python main.py'
            }
          ],
          mac: [
            {
              title: 'Instalar via Homebrew',
              description: 'Evite alterar o Python nativo do Mac. Instale a versão mais recente via Brew.',
              command: 'brew install python'
            },
            {
              title: 'Verificar PIP',
              description: 'No Mac, geralmente usamos python3 e pip3 explicitamente.',
              command: 'python3 --version && pip3 --version'
            },
            {
              title: 'Seu primeiro script',
              description: 'Rode um print simples.',
              command: 'echo \'print("Hello Mac")\' > main.py && python3 main.py'
            }
          ],
          linux: [
            {
              title: 'Instalar via APT',
              description: 'O Ubuntu geralmente vem com Python, mas precisamos do venv e do pip manual.',
              command: 'sudo apt update && sudo apt install python3 python3-pip python3-venv -y'
            },
            {
              title: 'Verificar instalação',
              description: 'Cheque a versão instalada.',
              command: 'python3 --version'
            },
            {
              title: 'Seu primeiro ambiente virtual',
              description: 'No Linux é fortemente recomendado usar ambientes virtuais para tudo.',
              command: 'python3 -m venv .venv && source .venv/bin/activate'
            }
          ]
        }
      }
    ]
  },
  {
    slug: 'java',
    name: 'Java & Spring',
    category: 'Backend',
    tagline: 'Write Once, Run Anywhere',
    description: 'Linguagem orientada a objetos de altíssima performance amplamente utilizada em ecossistemas corporativos pesados, especialmente em conjunto com o framework Spring Boot.',
    level: 'intermediario',
    color: '#007396',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    tags: ['backend', 'poo', 'spring', 'enterprise'],
    docsUrl: 'https://docs.oracle.com/en/java/',
    commands: [
      {
        id: 'java-run',
        label: 'Compilar e Executar',
        command: 'javac Main.java && java Main',
        description: 'Compila o código fonte em bytecode e em seguida roda a JVM.',
        whenToUse: 'Para testar scripts soltos de Java puro sem um gerenciador.',
        tags: ['compilar', 'rodar']
      },
      {
        id: 'mvn-spring',
        label: 'Rodar Spring Boot (Maven)',
        command: {
          default: './mvnw spring-boot:run',
          windows: 'mvnw.cmd spring-boot:run',
          mac: './mvnw spring-boot:run',
          linux: './mvnw spring-boot:run'
        },
        description: 'Usa o Maven Wrapper gerado pelo Spring Initializr para subir a aplicação web.',
        whenToUse: 'Durante o desenvolvimento de uma API Spring.',
        tags: ['spring', 'web', 'maven']
      }
    ],
    tutorials: [
      {
        id: 'tut-java-setup',
        title: 'Ambiente Java + Spring Boot',
        description: 'Instale o Java Development Kit (JDK), ajuste as variáveis de ambiente e crie uma API inicial.',
        content: {
          windows: [
            {
              title: 'Baixar o JDK (Adoptium)',
              description: 'Evite licenças pagas usando a build open-source Eclipse Temurin (Adoptium). Baixe o instalador .msi e avance em tudo.',
              link: { url: 'https://adoptium.net/', label: 'Baixar Temurin JDK' }
            },
            {
              title: 'Variável JAVA_HOME',
              description: 'Pesquise por "Variáveis de Ambiente" no Windows. Crie uma variável JAVA_HOME apontando para a pasta de instalação (ex: C:\\Program Files\\Eclipse Adoptium\\jdk-17...). Adicione %JAVA_HOME%\\bin ao Path.'
            },
            {
              title: 'Validar JVM',
              description: 'Reinicie o terminal para refletir as variáveis.',
              command: 'java -version && javac -version'
            },
            {
              title: 'Criar Projeto Spring',
              description: 'Use o Spring Initializr Web para gerar um projeto Base. Extraia o ZIP e rode o servidor na pasta extraída.',
              link: { url: 'https://start.spring.io/', label: 'Acessar Spring Initializr' }
            }
          ],
          mac: [
            {
              title: 'Instalar o JDK',
              description: 'Use o SDKMAN! para gerenciar múltiplas versões do Java no Mac.',
              command: 'curl -s "https://get.sdkman.io" | bash'
            },
            {
              title: 'Ativar e Instalar Java',
              description: 'Abra um novo terminal e instale o Java 17 Temurin.',
              command: 'sdk install java 17.0.10-tem'
            },
            {
              title: 'Criar App Spring (cURL)',
              description: 'O Spring provê uma forma de gerar templates direto pelo terminal.',
              command: 'curl https://start.spring.io/starter.zip -d dependencies=web -d name=demo -d javaVersion=17 -o demo.zip && unzip demo.zip'
            }
          ],
          linux: [
            {
              title: 'Instalar JDK Padrão',
              description: 'Instale via gerenciador de pacotes.',
              command: 'sudo apt update && sudo apt install default-jdk -y'
            },
            {
              title: 'Variáveis de Ambiente',
              description: 'Muitas vezes o Linux já configura o Path, mas você pode definir o JAVA_HOME no ~/.bashrc se necessitar para frameworks.',
              command: 'java -version'
            },
            {
              title: 'Criar App Spring (cURL)',
              description: 'O Spring provê uma forma de gerar templates direto pelo terminal.',
              command: 'curl https://start.spring.io/starter.zip -d dependencies=web -d name=demo -o demo.zip && unzip demo.zip'
            }
          ]
        }
      }
    ]
  },
  {
    slug: 'wordpress',
    name: 'WordPress',
    category: 'CMS',
    tagline: 'O maior CMS do planeta',
    description: 'Sistema de gerenciamento de conteúdo baseado em PHP e MySQL. Ideal para blogs, portais e e-commerces que exigem rápida entrega e plugins prontos.',
    level: 'iniciante',
    color: '#21759b',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg',
    tags: ['cms', 'php', 'blog', 'mysql'],
    docsUrl: 'https://wordpress.org/support/',
    commands: [
      {
        id: 'wp-cli-install',
        label: 'Instalar WP-CLI',
        command: {
          default: 'curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && chmod +x wp-cli.phar && sudo mv wp-cli.phar /usr/local/bin/wp',
          windows: 'php -r "copy(\'https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar\', \'wp-cli.phar\');"'
        },
        description: 'Baixa a interface de linha de comando do WordPress (Opcional, usuários comuns usam apenas a interface web).',
        whenToUse: 'Para devs que gerenciam múltiplos sites.',
        tags: ['cli', 'gerenciamento']
      }
    ],
    tutorials: [
      {
        id: 'tut-wordpress-setup',
        title: 'Servidor Local (XAMPP)',
        description: 'Para rodar o WordPress no seu PC, você não usa npm. É necessário simular um servidor Apache com PHP e MySQL instalado.',
        content: {
          windows: [
            {
              title: 'Baixar XAMPP',
              description: 'O XAMPP fornece Apache, MariaDB e PHP empacotados num instalador fácil.',
              link: { url: 'https://www.apachefriends.org/pt_br/index.html', label: 'Baixar XAMPP' }
            },
            {
              title: 'Iniciar os Serviços',
              description: 'Abra o Painel de Controle do XAMPP. Clique em "Start" na frente do Apache e na frente do MySQL. Ambos devem ficar verdes.'
            },
            {
              title: 'Criar Banco de Dados',
              description: 'Acesse o phpMyAdmin (botão Admin do MySQL) e crie um novo banco chamado "meu_site".',
              link: { url: 'http://localhost/phpmyadmin', label: 'Abrir phpMyAdmin' }
            },
            {
              title: 'Baixar WordPress',
              description: 'Baixe o zip do WordPress. Extraia o conteúdo e coloque a pasta inteira dentro de C:\\xampp\\htdocs\\meu_site.',
              link: { url: 'https://br.wordpress.org/download/', label: 'Baixar WordPress' }
            },
            {
              title: 'Instalar no Navegador',
              description: 'Acesse http://localhost/meu_site no navegador. Preencha as credenciais do banco: Banco=meu_site, Usuário=root, Senha=(deixe em branco).'
            }
          ],
          mac: [
            {
              title: 'MAMP (Mac)',
              description: 'No Mac, a ferramenta mais comum é o MAMP em vez do XAMPP.',
              link: { url: 'https://www.mamp.info/en/downloads/', label: 'Baixar MAMP' }
            },
            {
              title: 'Iniciar e Banco de Dados',
              description: 'Abra o MAMP, clique em Start Servers. Use o painel para abrir o phpMyAdmin e criar o banco de dados.'
            },
            {
              title: 'Extrair o Core',
              description: 'Baixe o WP e extraia os arquivos dentro da pasta /Applications/MAMP/htdocs/meu_site.'
            }
          ],
          linux: [
            {
              title: 'Instalar a stack LAMP',
              description: 'No Linux é melhor instalar as partes cruas. Apache, MySQL e PHP.',
              command: 'sudo apt install apache2 mysql-server php php-mysql libapache2-mod-php -y'
            },
            {
              title: 'Criar Banco',
              description: 'Entre no console do mysql.',
              command: 'sudo mysql -e "CREATE DATABASE meu_site;"'
            },
            {
              title: 'Configurar WordPress',
              description: 'Baixe o tar.gz, extraia em /var/www/html/meu_site e ajuste as permissões (chown www-data).'
            }
          ]
        }
      }
    ]
  },
  {
    slug: 'react',
    name: 'React',
    category: 'Biblioteca UI',
    tagline: 'A biblioteca para interfaces de usuário',
    description:
      'Biblioteca declarativa para construir interfaces baseadas em componentes reutilizáveis e gerenciamento de estado.',
    level: 'iniciante',
    color: '#61dafb',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    tags: ['frontend', 'componentes', 'ui'],
    docsUrl: 'https://react.dev',
    commands: [
      {
        id: 'react-create-vite',
        label: 'Criar app com Vite',
        command: 'npm create vite@latest minha-app -- --template react-ts',
        description: 'Cria um projeto React moderno usando Vite como bundler.',
        whenToUse: 'Para SPAs rápidas sem necessidade de SSR, com build extremamente veloz.',
        options: [
          { flag: '--template react', description: 'Template React com JavaScript.' },
          { flag: '--template react-ts', description: 'Template React com TypeScript.' },
        ],
        example: 'npm create vite@latest minha-app -- --template react-ts',
        tags: ['instalar', 'criar', 'vite'],
      }
    ],
  },
  {
    slug: 'nodejs',
    name: 'Node.js',
    category: 'Runtime',
    tagline: 'JavaScript no servidor',
    description:
      'Runtime JavaScript baseado no V8 para construir aplicações de servidor, ferramentas de CLI e APIs.',
    level: 'iniciante',
    color: '#68a063',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    tags: ['backend', 'runtime', 'javascript'],
    docsUrl: 'https://nodejs.org/docs',
    commands: [
      {
        id: 'node-init',
        label: 'Inicializar projeto',
        command: 'npm init -y',
        description: 'Cria um package.json com valores padrão para começar um projeto Node.',
        whenToUse: 'No início de qualquer projeto Node.js ou pacote npm.',
        example: 'npm init -y',
        tags: ['iniciar', 'configurar', 'npm'],
      }
    ],
  },
  {
    slug: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'Estilização',
    tagline: 'CSS utilitário first',
    description:
      'Framework CSS baseado em classes utilitárias para construir designs personalizados rapidamente.',
    level: 'iniciante',
    color: '#38bdf8',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    tags: ['css', 'frontend', 'estilo'],
    docsUrl: 'https://tailwindcss.com/docs',
    commands: [
      {
        id: 'tw-install',
        label: 'Instalar Tailwind',
        command: 'npm install tailwindcss @tailwindcss/postcss',
        description: 'Instala o Tailwind CSS v4 e o plugin PostCSS.',
        whenToUse: 'Ao adicionar estilização utilitária a qualquer projeto.',
        example: 'npm install tailwindcss @tailwindcss/postcss postcss',
        tags: ['instalar', 'css'],
      },
      {
        id: 'tw-import',
        label: 'Importar no CSS',
        command: '@import "tailwindcss";',
        description: 'Importa as camadas do Tailwind no seu arquivo CSS principal.',
        whenToUse: 'Depois de instalar, no arquivo globals.css ou equivalente.',
        example: '@import "tailwindcss";',
        tags: ['configurar', 'css'],
      },
    ],
  }
]

export const stacks: Stack[] = [
  {
    slug: 'nextjs-tailwind-prisma',
    name: 'Next.js + Tailwind + Prisma',
    description: 'Stack full-stack moderna para produtos web com banco relacional e UI utilitária.',
    technologies: ['nextjs', 'tailwindcss', 'prisma', 'postgresql'],
    level: 'intermediario',
    tags: ['fullstack', 'web', 'saas'],
    popularity: 98,
    steps: [
      {
        title: 'Criar o projeto Next.js',
        command: 'npx create-next-app@latest meu-app --typescript --tailwind --app',
        description: 'Scaffold inicial com TypeScript, Tailwind e App Router.',
      }
    ],
  }
]

export function getTechnology(slug: string) {
  return technologies.find((t) => t.slug === slug)
}

export function getStack(slug: string) {
  return stacks.find((s) => s.slug === slug)
}

export type CommandWithTech = Command & { tech: Technology }

export const allCommands: CommandWithTech[] = technologies.flatMap((tech) =>
  tech.commands.map((command) => ({ ...command, tech })),
)

export const popularCommands: CommandWithTech[] = [
  'nextjs-create',
  'git-clone',
  'git-push',
  'python-venv',
  'mvn-spring',
  'tw-install',
]
  .map((id) => allCommands.find((c) => c.id === id))
  .filter((c): c is CommandWithTech => Boolean(c))
