export type Lang = 'pt' | 'en';

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  desc: string;
}

export interface ProjectText {
  kind: string;
  title: string;
  desc: string;
}

export interface Dict {
  nav: string[];
  menu: string;
  language: string;
  open: string;
  close: string;
  greet: string;
  roles: string[];
  heroSub: string;
  ctaProjects: string;
  location: string;
  aboutKicker: string;
  aboutTitle: string;
  about1: string;
  about2: string;
  skillsKicker: string;
  skillsTitle: string;
  skillsSub: string;
  whatIKnow: string;
  prev: string;
  next: string;
  expKicker: string;
  expTitle: string;
  experience: ExperienceItem[];
  projKicker: string;
  projTitle: string;
  projects: ProjectText[];
  projPlaceholder: string;
  goTo: string;
  code: string;
  demo: string;
  backTop: string;
}

export interface SkillCatPoints {
  cat: string;
  points: string[];
}

export interface SkillData {
  name: string;

  nameEn?: string;

  icon: string;
  pt: SkillCatPoints;
  en: SkillCatPoints;
}

export interface Social {
  label: string;
  icon: string;
  href: string;
}

export interface ProjectLink {

  codeUrl?: string;
  demoUrl: string;

  image?: string;
}

export const I18N: Record<Lang, Dict> = {
  pt: {
    nav: ['Início', 'Sobre', 'Skills', 'Experiência', 'Projetos'],
    menu: 'Menu',
    language: 'Idioma',
    open: 'Abrir menu',
    close: 'Fechar menu',
    greet: 'Olá, eu sou',
    roles: ['Engenheiro de Software', 'Desenvolvedor Back-end', 'Arquitetura Cloud'],
    heroSub:
      'Arqueto sistemas em cloud para entregar soluções de ponta a ponta, da concepção da aplicação ao deploy, unindo desenvolvimento, entrega em nuvem e arquitetura.',
    ctaProjects: 'Ver projetos',

    location: 'João Pessoa, Brasil',
    aboutKicker: 'Sobre mim',
    aboutTitle: 'Soluções de ponta a ponta',
    about1:
      'Tenho experiência arquitetando sistemas em cloud para entregar soluções de ponta a ponta, atuando com desenvolvimento, entrega em nuvem e concepção de aplicações, do desenho da arquitetura ao deploy em produção.',
    about2:
      'Trabalho com Node.js, Go, NestJS, Next.js, AWS/Azure e Terraform, e gosto de fechar o ciclo: conceber, construir, subir na nuvem e acompanhar o comportamento real da solução em produção.',
    skillsKicker: 'Skills',
    skillsTitle: 'Tecnologias que uso',
    skillsSub: 'Arraste para o lado e veja como aplico cada uma.',
    whatIKnow: 'O que sei',
    prev: 'Anterior',
    next: 'Próximo',

    expKicker: 'Experiência',
    expTitle: 'Onde trabalhei',
    experience: [
      {
        period: 'Nov 2025 - Atual',
        role: 'Desenvolvedor Node',
        company: 'ioasys · Belo Horizonte, MG',
        desc: 'Back-end com Node.js em uma empresa de eficiência digital: construção de sistemas distribuídos de alta performance, atuando do desenvolvimento à entrega em cloud.',
      },
      {
        period: 'Abr 2025 - Atual',
        role: 'Desenvolvedor Back-End',
        company: 'hooney+ · São Paulo, SP',
        desc: 'APIs e serviços de back-end em uma software house, com TypeScript, integrações robustas e foco na qualidade do que chega em produção.',
      },
      {
        period: 'Ago 2024 - Jan 2025',
        role: 'Desenvolvedor Back-End .NET',
        company: 'Btor Soluções Computacionais · João Pessoa, PB',
        desc: 'Desenvolvimento e manutenção de serviços e APIs corporativos em C#/.NET, com foco em estabilidade e evolução contínua.',
      },
      {
        period: 'Jun 2023 - Jul 2024',
        role: 'Desenvolvedor Back-End',
        company: 'Fábrica de Software UBTech Office · Unipê',
        desc: 'Construção de APIs e sistemas para clientes reais na fábrica de software da Unipê, do desenvolvimento à entrega.',
      },
    ],
    projKicker: 'Projetos',
    projTitle: 'Projetos em que trabalhei',
    projects: [
      {
        kind: 'Plataforma web',
        title: 'AI Summit Brasil',
        desc: 'Concepção, arquitetura e desenvolvimento do novo portal do AI Summit Brasil, o maior evento de IA do país: uma plataforma de conteúdo e inscrições pensada para performar nos picos de audiência e entregue de ponta a ponta, do design da solução ao deploy em cloud com Terraform.',
      },
      {
        kind: 'Back-end',
        title: 'Araguaia',
        desc: 'Soluções de backend que facilitam o dia a dia dos consultores Araguaia: um pipeline em Node.js que processa mais de 1 GB de arquivos por dia, com integrações robustas e dados sempre disponíveis para o app.',
      },
      {
        kind: 'Microsserviços',
        title: 'Inhotim',
        desc: 'Desenvolvimento e manutenção de diversos microsserviços que sustentam o app do Inhotim, o maior museu a céu aberto do mundo, com NestJS e uma arquitetura pensada para a experiência do visitante e para escalar em produção.',
      },
    ],
    projPlaceholder: 'Imagem do projeto',
    goTo: 'Ir para o projeto',
    code: 'Código',
    demo: 'Ver projeto',
    backTop: 'Voltar ao topo',
  },
  en: {
    nav: ['Home', 'About', 'Skills', 'Experience', 'Projects'],
    menu: 'Menu',
    language: 'Language',
    open: 'Open menu',
    close: 'Close menu',
    greet: "Hi, I'm",
    roles: ['Software Engineer', 'Backend Developer', 'Cloud Architecture'],
    heroSub:
      'I architect cloud systems to deliver end-to-end solutions, from application design to deployment, combining development, cloud delivery and architecture.',
    ctaProjects: 'See projects',

    location: 'João Pessoa, Brazil',
    aboutKicker: 'About me',
    aboutTitle: 'End-to-end solutions',
    about1:
      'I have experience architecting cloud systems to deliver end-to-end solutions, working across development, cloud delivery and application design, from architecture drawing to production deploy.',
    about2:
      'I work with Node.js, Go, NestJS, Next.js, AWS/Azure and Terraform, and I like closing the loop: conceive it, build it, ship it to the cloud and watch how the solution really behaves in production.',
    skillsKicker: 'Skills',
    skillsTitle: 'Technologies I use',
    skillsSub: 'Swipe sideways to see how I apply each one.',
    whatIKnow: 'What I know',
    prev: 'Previous',
    next: 'Next',

    expKicker: 'Experience',
    expTitle: "Where I've worked",
    experience: [
      {
        period: 'Nov 2025 - Present',
        role: 'Node Developer',
        company: 'ioasys · Belo Horizonte, MG',
        desc: 'Back-end with Node.js at a digital efficiency company: building high-performance distributed systems, working from development to cloud delivery.',
      },
      {
        period: 'Apr 2025 - Present',
        role: 'Backend Developer',
        company: 'hooney+ · São Paulo, SP',
        desc: 'APIs and backend services at a software house, with TypeScript, robust integrations and a focus on production quality.',
      },
      {
        period: 'Aug 2024 - Jan 2025',
        role: '.NET Backend Developer',
        company: 'Btor Soluções Computacionais · João Pessoa, PB',
        desc: 'Developed and maintained corporate services and APIs in C#/.NET, focused on stability and continuous evolution.',
      },
      {
        period: 'Jun 2023 - Jul 2024',
        role: 'Backend Developer',
        company: 'UBTech Office Software Factory · Unipê',
        desc: 'Built APIs and systems for real clients at Unipê\'s software factory, from development to delivery.',
      },
    ],
    projKicker: 'Projects',
    projTitle: "Projects I've worked on",
    projects: [
      {
        kind: 'Web platform',
        title: 'AI Summit Brasil',
        desc: 'Conception, architecture and development of the new AI Summit Brasil portal, the country\'s biggest AI event: a content and ticketing platform built to perform during traffic peaks and delivered end to end, from solution design to cloud deployment with Terraform.',
      },
      {
        kind: 'Back-end',
        title: 'Araguaia',
        desc: 'Backend solutions that make Araguaia consultants\' day-to-day easier: a Node.js pipeline processing over 1 GB of files per day, with robust integrations and data always available to the app.',
      },
      {
        kind: 'Microservices',
        title: 'Inhotim',
        desc: 'Developed and maintained several microservices powering the app of Inhotim, the world\'s largest open-air museum, using NestJS and an architecture designed for the visitor experience and to scale in production.',
      },
    ],
    projPlaceholder: 'Project image',
    goTo: 'Go to project',
    code: 'Code',
    demo: 'Live project',
    backTop: 'Back to top',
  },
};

export const IDS = ['inicio', 'sobre', 'skills', 'experiencia', 'projetos'] as const;

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
];

export const LANG_GROUP_LABEL = 'Idioma / Language';

export const SKILLS: SkillData[] = [
  {
    name: 'Node.js',
    icon: 'ph-hexagon',
    pt: {
      cat: 'Back-end',
      points: [
        'APIs REST e GraphQL com NestJS e Express',
        'Pipelines e integrações de alto volume de dados',
        'Filas, workers e jobs em produção',
      ],
    },
    en: {
      cat: 'Back-end',
      points: [
        'REST and GraphQL APIs with NestJS and Express',
        'High-volume pipelines and data integrations',
        'Queues, workers and scheduled jobs in production',
      ],
    },
  },
  {
    name: 'Go',
    icon: 'ph-lightning',
    pt: {
      cat: 'Back-end',
      points: [
        'Microsserviços com alta concorrência',
        'CLI e ferramentas internas performáticas',
        'Binário estático e deploys enxutos',
      ],
    },
    en: {
      cat: 'Back-end',
      points: [
        'Microservices with heavy concurrency',
        'Fast internal CLIs and tooling',
        'Static binaries and lean deployments',
      ],
    },
  },
  {
    name: 'NestJS',
    icon: 'ph-cube',
    pt: {
      cat: 'Back-end',
      points: [
        'Arquitetura modular com injeção de dependência',
        'APIs escaláveis e tipadas com TypeScript',
        'Microsserviços e mensageria',
      ],
    },
    en: {
      cat: 'Back-end',
      points: [
        'Modular architecture with dependency injection',
        'Scalable, type-safe APIs with TypeScript',
        'Microservices and messaging',
      ],
    },
  },
  {
    name: 'Next.js',
    icon: 'ph-triangle',
    pt: {
      cat: 'Front-end',
      points: [
        'App Router, SSR/SSG e Server Components',
        'SEO e performance (Core Web Vitals)',
        'Portais e produtos full-stack',
      ],
    },
    en: {
      cat: 'Front-end',
      points: [
        'App Router, SSR/SSG and Server Components',
        'SEO and performance (Core Web Vitals)',
        'Full-stack portals and products',
      ],
    },
  },
  {
    name: 'Cloud (AWS, Azure)',
    icon: 'ph-cloud',
    pt: {
      cat: 'Cloud',
      points: [
        'Arquitetura de soluções ponta a ponta',
        'Deploy, escala e operação de aplicações',
        'Observabilidade e ambientes isolados',
      ],
    },
    en: {
      cat: 'Cloud',
      points: [
        'End-to-end solution architecture',
        'Application deployment, scaling and operations',
        'Observability and isolated environments',
      ],
    },
  },
  {
    name: 'Terraform',
    icon: 'ph-stack',
    pt: {
      cat: 'Infraestrutura',
      points: [
        'Infraestrutura como código reprodutível',
        'Provisionamento de ambientes em AWS e Azure',
        'Módulos, padrões e versionamento de infra',
      ],
    },
    en: {
      cat: 'Infrastructure',
      points: [
        'Reproducible infrastructure as code',
        'Environment provisioning on AWS and Azure',
        'Modules, patterns and versioned infra',
      ],
    },
  },
];

export const EXP_TAGS: string[][] = [
  ['Node.js', 'NestJS', 'Cloud'],
  ['TypeScript', 'APIs', 'Back-end'],
  ['C#', '.NET', 'APIs'],
  ['Node.js', 'APIs', 'SQL'],
];

export const PROJ_TAGS: string[][] = [
  ['Next.js', 'Node.js', 'Terraform', 'Cloud'],
  ['Node.js', 'APIs', 'Cloud'],
  ['NestJS', 'Microsserviços', 'Cloud'],
];

export const SOCIALS: Social[] = [
  { label: 'GitHub', icon: 'ph-github-logo', href: 'https://github.com/caiiohenryk' },
  { label: 'LinkedIn', icon: 'ph-linkedin-logo', href: 'https://www.linkedin.com/in/caiiohenryk/' },
  { label: 'E-mail', icon: 'ph-envelope-simple', href: 'mailto:caiohc.dev@gmail.com' },
];

export const PROFILE = {
  name: 'Caio Chaves',
  roleTitle: 'Engenheiro de Software',
  photo: '/images/caio-chaves.jpg',
  photoAlt: 'Foto de Caio Chaves',
};

export const PROJECT_LINKS: ProjectLink[] = [
  { demoUrl: 'https://aisummit.ia.br', image: '/images/projects/ai-summit.jpg' },
  {
    demoUrl: 'https://play.google.com/store/apps/details?id=br.com.araguaia.consultor&hl=pt',
    image: '/images/projects/araguaia.jpg',
  },
  {
    demoUrl: 'https://play.google.com/store/apps/details?id=br.org.inhotim&hl=pt',
    image: '/images/projects/inhotim.jpg',
  },
];

export const LANG_STORAGE_KEY = 'cc-portfolio-lang';
