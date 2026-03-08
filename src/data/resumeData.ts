export type Locale = 'en' | 'es';

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationEntry {
  title: string;
  institution: string;
  period: string;
  description: string;
}

export interface ProjectEntry {
  name: string;
  description: string;
  tech: string;
}

export interface ResumeData {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  linkedin: string;
  github: string;
  bio: string[];
  skills: string[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
}

export const resumeData: Record<Locale, ResumeData> = {
  en: {
    name: 'Julian Soto',
    title: 'Senior Software Engineer | Full-Stack Developer',
    subtitle: 'TypeScript · React · Next.js · PHP · WordPress · Python · AI & ML',
    email: 'contact@juliansoto.dev',
    linkedin: 'linkedin.com/in/full-stack-julian-soto',
    github: 'github.com/juliandeveloper05',
    bio: [
      'Senior Full-Stack Software Engineer specialized in modern web architectures and AI-powered applications. I build digital experiences with Next.js, React, TypeScript, custom WordPress solutions using PHP 8 & MySQL, and full-stack AI tools with Python, FastAPI, PyTorch & TensorFlow.',
      'I engineer scalable, type-safe solutions that solve complex business problems — from CMS platforms to neural-network-powered audio tools.',
    ],
    skills: [
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'PHP 8',
      'WordPress',
      'Python',
      'FastAPI',
      'PyTorch',
      'TensorFlow',
      'PostgreSQL',
      'MySQL',
      'Tailwind CSS',
      'Docker',
    ],
    experience: [
      {
        role: 'Senior Software Engineer',
        company: 'Soul Solutions',
        period: '2023 – Present',
        description:
          'Mainframe modernization: bridging legacy COBOL/Db2 systems with modern cloud architectures. Working with Next.js, Node.js, TypeScript, and implementing RESTful APIs for enterprise clients.',
      },
      {
        role: 'E-commerce Platform Architect',
        company: 'NexusShop (freelance)',
        period: '2022 – 2023',
        description:
          'Designed and built a full-stack e-commerce platform with custom CMS, payment integration, and cloud deployment.',
      },
    ],
    education: [
      {
        title: 'Advanced Full Stack Software Engineering Specialization',
        institution: 'APX School',
        period: '2022',
        description:
          'MERN Stack and System Architecture. Advanced training in scalable application design and best practices.',
      },
      {
        title: 'Computer Science Degree (in progress)',
        institution: 'Universidad Nacional de Quilmes',
        period: '2023 – Present',
        description:
          'Focusing on theoretical and practical aspects of computing.',
      },
    ],
    projects: [
      {
        name: 'Dumu',
        description: 'AI Bass Extraction using Meta AI Demucs & Spotify Basic Pitch',
        tech: 'Python · FastAPI · PyTorch · React',
      },
      {
        name: 'Bitrova',
        description: 'Task app with Supabase Cloud Sync and real-time collaboration',
        tech: 'Next.js · TypeScript · Supabase',
      },
      {
        name: 'Bass Academy',
        description: 'Online music learning platform with video courses and progress tracking',
        tech: 'Next.js · PostgreSQL · Stripe',
      },
    ],
  },
  es: {
    name: 'Julian Soto',
    title: 'Ingeniero de Software Senior | Desarrollador Full-Stack',
    subtitle: 'TypeScript · React · Next.js · PHP · WordPress · Python · IA & ML',
    email: 'contact@juliansoto.dev',
    linkedin: 'linkedin.com/in/full-stack-julian-soto',
    github: 'github.com/juliandeveloper05',
    bio: [
      'Ingeniero de Software Full-Stack Senior especializado en arquitecturas web modernas y aplicaciones potenciadas por IA. Construyo experiencias digitales con Next.js, React, TypeScript, soluciones WordPress personalizadas con PHP 8 & MySQL, y herramientas de IA con Python, FastAPI, PyTorch & TensorFlow.',
      'Diseño soluciones escalables y type-safe que resuelven problemas complejos de negocio — desde plataformas CMS hasta herramientas de audio con redes neuronales.',
    ],
    skills: [
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'PHP 8',
      'WordPress',
      'Python',
      'FastAPI',
      'PyTorch',
      'TensorFlow',
      'PostgreSQL',
      'MySQL',
      'Tailwind CSS',
      'Docker',
    ],
    experience: [
      {
        role: 'Ingeniero de Software Senior',
        company: 'Soul Solutions',
        period: '2023 – Presente',
        description:
          'Modernización de mainframes: integración de sistemas COBOL/Db2 con arquitecturas cloud modernas. Trabajo con Next.js, Node.js, TypeScript e implementación de APIs RESTful para clientes enterprise.',
      },
      {
        role: 'Arquitecto de Plataforma E-commerce',
        company: 'NexusShop (freelance)',
        period: '2022 – 2023',
        description:
          'Diseño y desarrollo de plataforma e-commerce full-stack con CMS personalizado, integración de pagos y despliegue en la nube.',
      },
    ],
    education: [
      {
        title: 'Especialización Avanzada en Ingeniería de Software Full Stack',
        institution: 'APX School',
        period: '2022',
        description:
          'MERN Stack y Arquitectura de Sistemas. Entrenamiento avanzado en diseño de aplicaciones escalables y buenas prácticas.',
      },
      {
        title: 'Licenciatura en Ciencias de la Computación (en curso)',
        institution: 'Universidad Nacional de Quilmes',
        period: '2023 – Presente',
        description:
          'Enfocado en aspectos teóricos y prácticos de la computación.',
      },
    ],
    projects: [
      {
        name: 'Dumu',
        description: 'Extracción de bajos con IA usando Meta AI Demucs y Spotify Basic Pitch',
        tech: 'Python · FastAPI · PyTorch · React',
      },
      {
        name: 'Bitrova',
        description: 'App de tareas con sincronización en la nube via Supabase y colaboración en tiempo real',
        tech: 'Next.js · TypeScript · Supabase',
      },
      {
        name: 'Bass Academy',
        description: 'Plataforma de aprendizaje musical online con cursos en video y seguimiento de progreso',
        tech: 'Next.js · PostgreSQL · Stripe',
      },
    ],
  },
};
