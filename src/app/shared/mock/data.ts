export const projectsData = [
  {
    name: 'PandaKeep',
    description: 'PROJECTS.PANDAKEEP',
    link: 'https://github.com/talipcr/pandakeep-releases/releases',
  },
  {
    name: 'CineCircle',
    description: 'PROJECTS.CINECIRCLE',
    link: 'https://github.com/talipcr/CineCircle-Release/releases/latest',
  },
  {
    name: 'Copilot Account Switcher',
    description: 'PROJECTS.COPILOT_SWITCHER',
    link: 'https://github.com/talipcr/copilot-account-switcher',
  },
];

export const postData = [{
  name: 'Utiliser Cypress et Cucumber pour des tests automatisés efficaces',
  description: 'Des tests automatisés sont cruciaux pour assurer la qualité de votre site. Mais rédiger des scénarios clairs et faciles à entretenir peut être difficile. Heureusement, Cypress et Cucumber sont là pour simplifier le processus.',
  link: 'https://www.sfeir.dev/front/utiliser-cypress-et-cucumber-pour-des-tests-automatises-efficaces/',
}];

// Months are 1-based here (October = 10); positions may be roles or client missions
interface Position {
  client?: string;
  link?: string;
  description: string;
  details: string;
  startDate: Date;
  endDate?: Date;
}

export const experienceData: {
  name: string;
  link: string;
  startDate: Date;
  endDate?: Date;
  positions: Position[];
}[] = [
  {
    name: 'SQLI',
    link: 'https://www.sqli.com/',
    startDate: new Date(2024, 10),
    positions: [
      {
        description: 'EXPERIENCE.SQLI',
        details: 'EXPERIENCE_DETAILS.SQLI',
        startDate: new Date(2024, 10),
      },
      {
        client: 'SGS',
        link: 'https://www.sgs.com/',
        description: 'EXPERIENCE.SGS',
        details: 'EXPERIENCE_DETAILS.SGS',
        startDate: new Date(2024, 10),
      },
    ],
  },
  {
    name: 'SFEIR',
    link: 'https://www.sfeir.com/',
    startDate: new Date(2018, 10),
    endDate: new Date(2024, 10),
    positions: [
      {
        client: 'Sidel',
        link: 'https://www.sidel.com/',
        description: 'EXPERIENCE.SIDEL',
        details: 'EXPERIENCE_DETAILS.SIDEL',
        startDate: new Date(2023, 3),
        endDate: new Date(2024, 10),
      },
      {
        description: 'EXPERIENCE.SFEIR_EM',
        details: 'EXPERIENCE_DETAILS.SFEIR_EM',
        startDate: new Date(2022, 10),
        endDate: new Date(2024, 10),
      },
      {
        client: 'Proximis',
        link: 'https://www.proximis.com/',
        description: 'EXPERIENCE.PROXIMIS',
        details: 'EXPERIENCE_DETAILS.PROXIMIS',
        startDate: new Date(2022, 3),
        endDate: new Date(2023, 3),
      },
      {
        description: 'EXPERIENCE.SFEIR_ENGINEER',
        details: 'EXPERIENCE_DETAILS.SFEIR_ENGINEER',
        startDate: new Date(2018, 10),
        endDate: new Date(2022, 10),
      },
      {
        client: 'Stellantis',
        link: 'https://www.stellantis.com/fr',
        description: 'EXPERIENCE.STELLANTIS',
        details: 'EXPERIENCE_DETAILS.STELLANTIS',
        startDate: new Date(2021, 11),
        endDate: new Date(2022, 3),
      },
      {
        client: 'Crésus',
        link: 'https://www.bgvapp.com/',
        description: 'EXPERIENCE.CRESUS',
        details: 'EXPERIENCE_DETAILS.CRESUS',
        startDate: new Date(2019, 7),
        endDate: new Date(2021, 5),
      },
      {
        client: 'QAD DynaSys',
        link: 'https://www.dys.com/',
        description: 'EXPERIENCE.DYNASYS',
        details: 'EXPERIENCE_DETAILS.DYNASYS',
        startDate: new Date(2018, 10),
        endDate: new Date(2019, 6),
      },
    ],
  },
  {
    name: 'John Steel',
    link: 'https://www.john-steel.com/',
    startDate: new Date(2017, 9),
    endDate: new Date(2018, 10),
    positions: [
      {
        description: 'EXPERIENCE.JOHN_STEEL',
        details: 'EXPERIENCE_DETAILS.JOHN_STEEL',
        startDate: new Date(2017, 9),
        endDate: new Date(2018, 10),
      },
    ],
  },
  {
    name: 'Matière Grise',
    link: 'https://matiere-grise.fr/',
    startDate: new Date(2016, 4),
    endDate: new Date(2017, 8),
    positions: [
      {
        description: 'EXPERIENCE.MATIERE_GRISE',
        details: 'EXPERIENCE_DETAILS.MATIERE_GRISE',
        startDate: new Date(2016, 4),
        endDate: new Date(2017, 8),
      },
    ],
  },
  {
    name: 'Conseil régional de Bretagne',
    link: 'https://www.bretagne.bzh/',
    startDate: new Date(2014, 10),
    endDate: new Date(2015, 8),
    positions: [
      {
        description: 'EXPERIENCE.BRETAGNE',
        details: 'EXPERIENCE_DETAILS.BRETAGNE',
        startDate: new Date(2014, 10),
        endDate: new Date(2015, 8),
      },
    ],
  },
];

export const certificationsData = [
  {
    name: 'Certified Vue Developer',
    description: 'CERTIFICATIONS.VUE',
    link: 'https://api.badgr.io/public/assertions/ZBTWsBbTS5yVaeJN5LL3mQ?identity__email=cesur.t%40sfeir.com',
  },
  {
    name: 'Angular Level 3 Certification',
    description: 'CERTIFICATIONS.ANGULAR_3',
    link: 'https://www.angulartraining.com/certification/check.html',
  },
  {
    name: 'Angular Level 2 Certification',
    description: 'CERTIFICATIONS.ANGULAR_2',
    link: 'https://www.angulartraining.com/certification/check.html',
  },
];

export const educationData = [
  {
    name: 'IUT de Vannes',
    description: 'EDUCATION.IUT_VANNES',
  },
  {
    name: 'Université de Bretagne-Sud',
    description: 'EDUCATION.UBS',
  },
  {
    name: 'Lycée Camille Sée',
    description: 'EDUCATION.BTS',
  },
  {
    name: 'Lycée Camille Sée',
    description: 'EDUCATION.BAC',
  },
];

export const skillsData = [
  {
    name: 'SKILLS.LANGUAGES',
    description: ['TypeScript', 'JavaScript (ES6+)', 'C#', 'Java'],
  },
  {
    name: 'SKILLS.FRONTEND',
    description: [
      'Angular (Signals, SSR, NgRx/NGXS, RxJS)',
      'Vue.js',
      'Nuxt',
      'Electron',
    ],
  },
  {
    name: 'SKILLS.BACKEND_CLOUD',
    description: [
      '.NET',
      'Java / Spring Boot',
      'Node.js',
      'NestJS',
      'Microsoft Azure',
      'Google Cloud Platform (GCP)',
      'Firebase',
    ],
  },
  {
    name: 'SKILLS.AI_AGENTS',
    description: [
      'LLM',
      'Claude Code',
      'MCP',
      'Ollama',
      'OpenAI',
      'Gemini',
      'Mistral',
    ],
  },
  {
    name: 'SKILLS.QUALITY',
    description: [
      'Cypress',
      'Vitest',
      'CI/CD (GitLab, GitHub Actions)',
      'Docker',
      'Agile Scrum',
    ],
  },
  {
    name: 'SKILLS.SPOKEN',
    description: [
      'SPOKEN.FR',
      'SPOKEN.TR',
      'SPOKEN.EN',
      'SPOKEN.DE',
    ],
  },
];
