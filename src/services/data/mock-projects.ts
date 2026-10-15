import { Project } from '@/types';

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'rizkillahramanda.my.id',
    slug: 'rizkillahramanda-my-id',
    description: {
      en: 'Personal portfolio and interactive engineering showcase built from scratch with Next.js App Router, TypeScript, Tailwind CSS, 3D WebGL physics, and Supabase.',
      id: 'Website portofolio pribadi dan etalase rekayasa perangkat lunak interaktif yang dibangun dari nol dengan Next.js App Router, TypeScript, Tailwind CSS, simulasi 3D WebGL, dan Supabase.',
    },
    category: 'fullstack',
    projectType: 'web',
    projectCategory: 'personal',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js / React Three Fiber', 'WebGL Lanyard', 'Supabase PostgreSQL', 'next-intl'],
    githubUrl: 'https://github.com/Diki04/rizkillahramanda.my.id',
    demoUrl: 'https://rizkillahramanda.my.id',
    featured: true,
    createdAt: '2026-10-01',
    introduction: {
      en: 'A high-performance personal developer portfolio and telemetry platform built with Next.js App Router and TypeScript. It features interactive 3D WebGL lanyard physics, monochrome aesthetics, and real-time GitHub activity aggregation persisted with Supabase PostgreSQL and bilingual next-intl localization.',
      id: 'Platform portofolio pengembang dan telemetri performa tinggi yang dibangun dengan Next.js App Router dan TypeScript. Menghadirkan simulasi fisika 3D WebGL lanyard interaktif, estetika monochrome OLED murni, serta agregasi aktivitas GitHub real-time dengan Supabase PostgreSQL dan lokalisasi bilingual next-intl.',
    },
    features: [
      {
        title: '🕒 Telemetry & GitHub Realtime Activity',
        description: 'Displays live coding telemetry and recent commits directly from GitHub API via serverless routes using:',
        codeSnippet: 'api/github/commits',
        bullets: [
          'Automatic ISR revalidation cache',
          'Graceful fallback with zero layout shift during API rate-limits',
        ],
      },
      {
        title: '🐳 Modular Architecture & Database Persistence',
        description: 'Project telemetry and guestbook comments are persisted in Supabase PostgreSQL, and displayed using:',
        bullets: [
          'ISR (Incremental Static Regeneration) for high-speed edge delivery',
          'SSR for dynamic locale matching and zero-flash layout hydration',
        ],
      },
      {
        title: '🌐 Internationalization (i18n)',
        description: 'Multi-language support powered by:',
        codeSnippet: 'next-intl',
        bullets: [
          'Supports Bahasa Indonesia and English',
          'Cookie and URL path-based persistent locale switching',
        ],
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/Diki04/rizkillahramanda.my.id',
      templateCmd: 'npx create-next-app -e https://github.com/Diki04/rizkillahramanda.my.id your-app-name',
      installCmd: 'pnpm install',
      devCmd: 'pnpm dev',
    },
  },
  {
    id: 'proj-2',
    title: 'Desa Sangkir Indah Web Portal',
    slug: 'sangkir-indah',
    description: {
      en: 'Official municipal web portal and digital public administration system for Sangkir Indah Village (Rokan Hulu, Riau), featuring GIS territorial mapping, APBDes budget transparency, and citizen services.',
      id: 'Portal web resmi dan sistem administrasi publik digital Desa Sangkir Indah (Rokan Hulu, Riau) yang memuat pemetaan wilayah GIS spasial, transparansi APBDes, direktori UMKM, dan layanan persuratan warga.',
    },
    category: 'fullstack',
    projectType: 'web',
    projectCategory: 'freelance',
    image: '/projects/sangkir-indah.jpeg',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Prisma ORM', 'PostgreSQL', 'GIS Map', 'React Quill'],
    githubUrl: 'https://github.com/Diki04/Sangkir-Indah',
    featured: true,
    createdAt: '2026-07-29',
    introduction: {
      en: 'An integrated civic technology platform engineered for the community and village government of Sangkir Indah, Pagaran Tapah Darussalam, Rokan Hulu. The platform modernizes village operations with transparent financial reporting, automated certificate issuance, geospatial boundary mapping, and local MSME promotions.',
      id: 'Platform teknologi publik terpadu yang dirancang untuk masyarakat dan aparatur pemerintah Desa Sangkir Indah, Kecamatan Pagaran Tapah Darussalam, Kabupaten Rokan Hulu. Memodernisasi operasional desa dengan transparansi APBDes, penerbitan surat pengantar daring, pemetaan wilayah interaktif, dan promosi UMKM lokal.',
    },
    features: [
      {
        title: '🗺️ Interactive GIS Spatial Boundary Mapping',
        description: 'Enables villagers and researchers to explore administrative territorial boundaries and agricultural zones with Leaflet/GIS overlays:',
        codeSnippet: 'public/map-wilayah.html',
        bullets: [
          'Boundary polygon rendering with coordinate precision',
          'Facility markers for schools, public health centers, and community halls',
        ],
      },
      {
        title: '📊 APBDes Financial Transparency Dashboard',
        description: 'Publishes village budgetary allocations, income sources, and development expenditures in real-time charts.',
        bullets: [
          'Real-time spending variance indicators',
          'Downloadable transparency audits for citizens',
        ],
      },
      {
        title: '🛡️ Role-Based Government Administration',
        description: 'Built-in CMS with Prisma ORM and Jose JWT authentication for village editors and village chiefs.',
        bullets: [
          'Rich text news & announcement editor powered by React Quill',
          'Citizen grievance and document request verification queue',
        ],
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/Diki04/Sangkir-Indah.git',
      installCmd: 'npm install',
      devCmd: 'npm run dev',
    },
  },
  {
    id: 'proj-3',
    title: 'Zakrenz Premium Birthday Experience',
    slug: 'birthday-website',
    description: {
      en: 'Cinematic multi-phase birthday celebration web experience powered by React 19, GSAP timeline choreography, dynamic 3D greeting envelopes, custom audio soundscapes, and confetti particle physics.',
      id: 'Aplikasi web perayaan ulang tahun sinematik multi-fase berbasis React 19 dengan koreografi animasi GSAP yang halus, amplop ucapan 3D dinamis, integrasi pemutar musik latar, dan efek partikel konfeti.',
    },
    category: 'frontend',
    projectType: 'web',
    projectCategory: 'personal',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop',
    tags: ['React 19', 'Vite', 'TypeScript', 'GSAP', 'Tailwind CSS v4', 'Canvas Confetti', 'Web Audio API'],
    githubUrl: 'https://github.com/Zakrenzdev/Zakrenz-Web-Ultah',
    featured: false,
    createdAt: '2026-06-15',
    introduction: {
      en: 'A high-aesthetic front-end web project crafted to deliver an emotional, cinematic milestone greeting. Built in collaboration with Zakrenzdev, the application orchestrates multi-stage interactions—from teaser envelopes and memory photo stacks to synchronized fireworks and ambient acoustic playback.',
      id: 'Proyek frontend web dengan estetika tinggi yang dirancang untuk menyampaikan ucapan selamat ulang tahun yang berkesan dan sinematik. Dibangun berkolaborasi dengan Zakrenzdev, aplikasi ini mengatur interaksi bertahap—mulai dari pembukaan amplop misteri, album foto kenangan interaktif, hingga kembang api dan alunan musik latar.',
    },
    features: [
      {
        title: '🎬 Multi-Phase GSAP Animation Sequencing',
        description: 'Smooth timeline state transitions orchestrated using GreenSock (GSAP):',
        codeSnippet: 'gsap.timeline({ defaults: { ease: "power3.out" } })',
        bullets: [
          'Envelope unsealing with 3D CSS perspective transforms',
          'Dynamic typography staging with typewriter kinetic reveal',
        ],
      },
      {
        title: '🎵 Web Audio Synced Atmosphere',
        description: 'Harmonious background soundtrack playback with customizable audio controls and fade-in/fade-out dynamics.',
      },
      {
        title: '✨ Canvas Confetti & Burst Physics',
        description: 'High-performance particle engine producing realistic gravity, wind drag, and celebratory color palettes.',
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/Zakrenzdev/Zakrenz-Web-Ultah.git',
      installCmd: 'npm install',
      devCmd: 'npm run dev',
    },
  },
  {
    id: 'proj-4',
    title: 'Corseo - AI Career & Course Recommendation',
    slug: 'corseo',
    description: {
      en: 'AI-driven career pathing and course recommendation platform operating a microservices architecture with Hybrid Neural Content-Based Filtering (NCF + CBF) via TensorFlow and FastAPI sidecar.',
      id: 'Platform rekomendasi karier dan kursus berbasis AI dengan arsitektur microservices yang memanfaatkan pendekatan Hybrid Neural Content-Based Filtering (NCF + CBF) melalui sidecar TensorFlow dan FastAPI.',
    },
    category: 'fullstack',
    projectType: 'web',
    projectCategory: 'personal',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    tags: ['React 19', 'Vite', 'Node.js', 'Express 5', 'Python 3.11', 'FastAPI', 'TensorFlow 2.18 / Keras 3', 'Prisma', 'PostgreSQL'],
    githubUrl: 'https://github.com/Diki04/Corseo',
    featured: true,
    createdAt: '2026-06-07',
    introduction: {
      en: 'Corseo is an intelligent career acceleration platform bridging university students and young professionals with optimal upskilling pathways. It features a modern 3-tier distributed architecture combining a React 19 frontend, an Express 5 API gateway, and a high-throughput Python FastAPI machine learning sidecar executing neural collaborative filtering.',
      id: 'Corseo adalah platform akselerasi karier cerdas yang menghubungkan mahasiswa dan profesional muda dengan jalur peningkatan keterampilan (upskilling) terbaik. Mengusung arsitektur terdistribusi 3-tier yang menggabungkan frontend React 19, API gateway Express 5, dan sidecar machine learning Python FastAPI berbasis Neural Collaborative Filtering.',
    },
    features: [
      {
        title: '🧠 Hybrid Neural Content-Based Filtering (NCF + CBF)',
        description: 'Predicts student course affinity and career fit based on learner profile vector embeddings:',
        codeSnippet: 'model.predict([user_vector, item_features])',
        bullets: [
          'Trained on diverse IT career syllabi and curriculum requirements',
          'Sub-150ms inference latency served via FastAPI sidecar',
        ],
      },
      {
        title: '⚡ Tri-Service Microarchitecture',
        description: 'Decoupled responsibilities for frontend UI, relational business transactions, and computation-heavy ML scoring.',
        bullets: [
          'PostgreSQL schema modeled with Prisma ORM for relational consistency',
          'JWT authentication with role-based learner vs instructor permissions',
        ],
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/Diki04/Corseo.git',
      installCmd: 'cd Backend && npm install && cd ../Frontend && bun install',
      devCmd: 'npm run dev (Backend) & bun dev (Frontend)',
    },
  },
  {
    id: 'proj-5',
    title: 'SEBANGKU - Study Buddy & Student Collaboration',
    slug: 'sebangku',
    description: {
      en: 'Native Android mobile companion connecting university students to compatible study buddies and study groups, featuring 1-on-1 direct messaging, group chat, automated video call timers, and FCM V1 push alerts.',
      id: 'Aplikasi mobile Android native untuk mahasiswa mencari rekan belajar (Study Buddy) dan kelompok belajar berdasarkan minat mata kuliah, dilengkapi chat real-time 1-on-1, grup, dan notifikasi push FCM V1.',
    },
    category: 'other',
    projectType: 'mobile',
    projectCategory: 'personal',
    image: '/projects/sebangku.png',
    tags: ['Kotlin', 'Jetpack Compose', 'Material Design 3', 'Firebase Auth', 'Firebase Cloud Messaging (FCM V1)', 'Supabase PostgreSQL', 'Coroutines & Flow'],
    githubUrl: 'https://github.com/Diki04/studybuddy',
    featured: true,
    createdAt: '2026-05-25',
    introduction: {
      en: 'SEBANGKU is a modern mobile platform tailored for Indonesian higher education students to find compatible peers for collaborative learning. Utilizing Kotlin and Jetpack Compose alongside Supabase PostgreSQL and Firebase services, it eliminates academic isolation by fostering study buddy discovery, peer accountability, and scheduled study sessions.',
      id: 'SEBANGKU adalah aplikasi mobile modern yang dirancang khusus bagi mahasiswa untuk menemukan rekan belajar yang sefrekuensi. Dibangun dengan Kotlin dan Jetpack Compose bersama basis data Supabase PostgreSQL dan layanan Firebase, aplikasi ini memfasilitasi pencarian teman belajar, pembentukan grup studi, dan sesi belajar bersama yang terstruktur.',
    },
    features: [
      {
        title: '🤝 Smart Buddy Discovery & Matching',
        description: 'Matches students by university, major, course interests, and learning style preferences:',
        codeSnippet: 'connections.filter { it.status == "accepted" }',
        bullets: [
          '5-Digit unique User ID for quick group invites and friend addition',
          'Dynamic buddy profile preview cards with academic portfolio insights',
        ],
      },
      {
        title: '💬 Real-Time Messaging & Group Study Rooms',
        description: 'Instant 1-on-1 chats and community study groups with unread badge counters and reactive updates.',
      },
      {
        title: '🔔 Push Notifications via FCM V1 API',
        description: 'Supabase Edge Functions integrated with Firebase Cloud Messaging V1 deliver real-time notifications even when the app is in the background.',
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/Diki04/studybuddy.git',
      installCmd: './gradlew build',
      devCmd: './gradlew installDebug',
    },
  },
  {
    id: 'proj-6',
    title: 'MiSTech - Disaster Mitigation & Education Platform',
    slug: 'mistech',
    description: {
      en: 'Integrated natural disaster education and emergency response management platform covering pre-disaster, during-disaster, and post-disaster phases with interactive quizzes, video guides, and emergency news publishing.',
      id: 'Platform terpadu edukasi mitigasi dan penanggulangan bencana alam yang mencakup fase pra-bencana, saat bencana, dan pasca-bencana dengan kuis edukatif, panduan video, dan manajemen berita darurat.',
    },
    category: 'fullstack',
    projectType: 'web',
    projectCategory: 'competition',
    image: '/projects/mistech-logo.png',
    tags: ['Next.js 16', 'React 19', 'Tailwind CSS v4', 'Prisma ORM', 'PostgreSQL', 'NextAuth', 'Firebase Admin', 'Tiptap'],
    githubUrl: 'https://github.com/Sohibbal/mistech-app',
    featured: true,
    createdAt: '2026-04-30',
    introduction: {
      en: 'MiSTech (Mitigation Science & Technology) is a comprehensive digital disaster preparedness ecosystem developed for disaster-prone communities. It consolidates crisis information into three structured phases (Pre, During, and Post-Disaster), empowering citizens with life-saving knowledge through interactive quizzes, video modules, and emergency reporting.',
      id: 'MiSTech (Mitigation Science & Technology) adalah ekosistem digital kesiapsiagaan bencana komprehensif yang dirancang untuk wilayah rawan bencana. Membagi informasi ke dalam tiga fase penting (Pra-Bencana, Saat Bencana, Pasca-Bencana) guna membekali masyarakat dengan pengetahuan penyelamatan hidup melalui kuis interaktif, modul video, dan pelaporan darurat.',
    },
    features: [
      {
        title: '🌪️ 3-Phase Emergency Preparedness Framework',
        description: 'Structured disaster taxonomies with specialized protocols for earthquakes, tsunamis, floods, and landslides:',
        codeSnippet: 'enum Phase { PRA, SAAT, PASCA }',
        bullets: [
          'Actionable survival checklists and evacuation route guidance',
          'Rich multimedia articles with image galleries and step-by-step illustrations',
        ],
      },
      {
        title: '📝 Gamified Mitigation Knowledge Quizzes',
        description: 'Interactive quizzes with passing scores and explanatory feedback to validate public safety readiness.',
      },
      {
        title: '📰 Centralized Administrative CMS',
        description: 'Next.js admin dashboard utilizing Tiptap editor and Prisma ORM for swift disaster alert publishing.',
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/Sohibbal/mistech-app.git',
      installCmd: 'npm install',
      devCmd: 'npm run dev',
    },
  },
  {
    id: 'proj-7',
    title: 'Pantau Pangan PKU',
    slug: 'pantau-pangan-pku',
    description: {
      en: 'Regional food commodity price monitoring web dashboard for Pekanbaru citizens and local markets, aggregating live market prices to track daily inflation deltas and food supply stability.',
      id: 'Dashboard pemantauan harga komoditas pangan pokok untuk masyarakat dan pedagang Pekanbaru, mengagregasi data harga pasar secara real-time untuk memantau laju inflasi dan stabilitas pasokan pangan.',
    },
    category: 'fullstack',
    projectType: 'web',
    projectCategory: 'competition',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Python Data Scraper', 'Supabase', 'REST API'],
    githubUrl: 'https://github.com/Diki04/Pantau-Pangan-PKU',
    demoUrl: 'https://pantau-pangan-pku.vercel.app',
    featured: true,
    createdAt: '2026-04-30',
    introduction: {
      en: 'A public commodity price monitoring platform enabling citizens and local government agencies to inspect real-time market inflation, commodity deltas, and food supply price fluctuations across Pekanbaru traditional markets.',
      id: 'Platform pemantauan harga komoditas pangan publik yang memungkinkan masyarakat dan instansi pemerintah daerah memantau inflasi pasar, perubahan harga, dan fluktuasi pasokan pangan pokok di pasar-pasar tradisional Pekanbaru.',
    },
    features: [
      {
        title: '📊 Real-Time Commodity Price Feed',
        description: 'Aggregates market prices from verified local market databases via API routes:',
        codeSnippet: 'api/commodities/pekanbaru',
        bullets: [
          'Live price delta indicators (+/- percentage variance)',
          'Interactive search and traditional market filtering (Pasar Kodim, Pasar Arengka, dll.)',
        ],
      },
      {
        title: '📈 Inflation Trend Analytics',
        description: 'Time-series visualization highlighting price spikes on staple goods like chilies, rice, and cooking oil.',
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/Diki04/Pantau-Pangan-PKU.git',
      installCmd: 'pnpm install',
      devCmd: 'pnpm dev',
    },
  },
  {
    id: 'proj-8',
    title: 'Human Action Recognition - Deep Learning System',
    slug: 'human-action-recognition',
    description: {
      en: 'Computer vision classification pipeline leveraging Deep Convolutional Neural Networks (CNNs) to accurately classify human activities and gestures from continuous video frames and image streams.',
      id: 'Sistem klasifikasi computer vision mutakhir berbasis Deep Convolutional Neural Network (CNN) untuk mendeteksi dan mengklasifikasikan aktivitas fisik serta gestur aksi manusia dari rekaman video.',
    },
    category: 'ml',
    projectType: 'web',
    projectCategory: 'internship',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop',
    tags: ['Python', 'Deep Learning', 'PyTorch/TensorFlow', 'OpenCV', 'Jupyter', 'CNN'],
    githubUrl: 'https://github.com/Diki04/Human-Action-Recognition-Deep-Learning-Based-Image-Classification-System',
    featured: true,
    createdAt: '2026-03-02',
    introduction: {
      en: 'An advanced computer vision engineering system utilizing deep convolutional networks and spatial-temporal feature extractors to identify complex human physical actions (e.g., walking, running, clapping, jumping) with robust accuracy across diverse lighting environments.',
      id: 'Sistem rekayasa computer vision mutakhir yang memanfaatkan deep convolutional neural network dan ekstraktor fitur spasial-temporal untuk mengenali aksi fisik manusia yang kompleks (seperti berjalan, berlari, bertepuk tangan, melompat) dengan akurasi tinggi di berbagai kondisi pencahayaan.',
    },
    features: [
      {
        title: '🧠 Deep CNN Classification Pipeline',
        description: 'Processes video frame sequences into spatial feature tensors for inference:',
        codeSnippet: 'python train_action_recognition.py --epochs 50 --batch 32',
        bullets: [
          'High precision accuracy exceeding 92% on test validation datasets',
          'Frame-by-frame bounding and action probability scoring via OpenCV',
        ],
      },
      {
        title: '⚡ Automated Model Checkpointing',
        description: 'Preserves the highest validation-accuracy model weights with early stopping to prevent overfitting.',
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/Diki04/Human-Action-Recognition-Deep-Learning-Based-Image-Classification-System.git',
      installCmd: 'pip install -r requirements.txt',
      devCmd: 'jupyter notebook action_recognition.ipynb',
    },
  },
  {
    id: 'proj-9',
    title: 'Roblox App Reviews Sentiment Analysis',
    slug: 'roblox-sentiment-analysis',
    description: {
      en: 'Natural Language Processing (NLP) pipeline scraping and classifying thousands of Google Play Store user reviews into sentiment polarities to identify mobile gaming stability issues and player satisfaction trends.',
      id: 'Pipeline Natural Language Processing (NLP) yang mengekstraksi dan mengklasifikasikan ribuan ulasan pengguna game Roblox di Google Play Store ke dalam polaritas sentimen guna menganalisis kepuasan pemain.',
    },
    category: 'ml',
    projectType: 'web',
    projectCategory: 'competition',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    tags: ['Python', 'Natural Language Processing (NLP)', 'Scikit-Learn', 'Pandas', 'NLTK', 'Google Play Scraper'],
    githubUrl: 'https://github.com/Diki04/Sentiment-Analysis-of-Roblox-App-Reviews-on-Google-Play-Store',
    featured: false,
    createdAt: '2026-02-23',
    introduction: {
      en: 'A data science and NLP study extracting actionable product intelligence from massive unstructured mobile game feedback. The system scrapes verified player reviews from Google Play Store, removes linguistic noise, performs stemming and TF-IDF vectorization, and trains supervised classifiers to segment feedback into positive, neutral, and critical categories.',
      id: 'Studi data science dan pemrosesan bahasa alami (NLP) untuk mengekstrak wawasan produk dari ulasan pemain mobile gaming. Sistem ini melakukan scraping ulasan terverifikasi Google Play Store, pembersihan teks, stemming, vektorisasi TF-IDF, serta klasifikasi supervised untuk mengelompokkan ulasan ke dalam kategori positif, netral, dan kritis.',
    },
    features: [
      {
        title: '🧹 Text Preprocessing & Cleaning Engine',
        description: 'Cleans emoji noise, slangs, punctuation, and performs Indonesian/English stopword removal:',
        codeSnippet: 'df["cleaned_text"] = df["content"].apply(clean_text)',
        bullets: [
          'TF-IDF vector representation with n-gram support',
          'Confusion matrix visualization and multi-class F1-score evaluation',
        ],
      },
      {
        title: '📊 Sentiment Polarity Distribution',
        description: 'Interactive Seaborn/Matplotlib charts depicting customer satisfaction over major app version updates.',
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/Diki04/Sentiment-Analysis-of-Roblox-App-Reviews-on-Google-Play-Store.git',
      installCmd: 'pip install -r requirements.txt',
      devCmd: 'python run_analysis.py',
    },
  },
  {
    id: 'proj-10',
    title: 'Realtime Point of Sale (POS) Apps',
    slug: 'realtime-pos',
    description: {
      en: 'High-speed real-time point-of-sale system featuring multi-cashier inventory sync via Supabase Realtime, barcode lookup, order dispatching, sales analytics with Recharts, and Midtrans QRIS payment integration.',
      id: 'Sistem kasir Point of Sale (POS) modern berkecepatan tinggi dengan sinkronisasi inventaris multi-kasir instan melalui Supabase Realtime, pemindai barcode, analitik penjualan Recharts, dan pembayaran QRIS Midtrans.',
    },
    category: 'fullstack',
    projectType: 'web',
    projectCategory: 'personal',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js 16 (Turbopack)', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Supabase Realtime', 'Zustand', 'TanStack Query', 'Midtrans QRIS'],
    githubUrl: 'https://github.com/Diki04/Realtime-Point-Of-Sale-Apps',
    featured: true,
    createdAt: '2026-06-20',
    introduction: {
      en: 'A production-grade retail and F&B Point of Sale (POS) solution crafted with Next.js 16 App Router and React 19. Engineered with real-time websocket subscriptions via Supabase Realtime, it guarantees zero inventory discrepancies across concurrent cashier terminals while offering instant digital payments and sales performance reporting.',
      id: 'Solusi kasir ritel dan F&B Point of Sale (POS) kelas produksi yang dibangun dengan Next.js 16 App Router dan React 19. Dilengkapi sinkronisasi websocket real-time melalui Supabase Realtime untuk mencegah selisih stok antar kasir, pembayaran digital instan, serta laporan performa penjualan yang komprehensif.',
    },
    features: [
      {
        title: '⚡ Instant Multi-Terminal Inventory Sync',
        description: 'Synchronizes product quantities across cashiers without manual page refreshes:',
        codeSnippet: 'supabase.channel("inventory_changes").on("postgres_changes", ...)',
        bullets: [
          'Sub-second optimistic UI cart updates powered by Zustand',
          'Fast barcode search with sound feedback on successful scan',
        ],
      },
      {
        title: '💳 Seamless QRIS & Midtrans Integration',
        description: 'Generates dynamic QRIS codes on the fly and verifies payment webhook callbacks in real time.',
      },
      {
        title: '📊 Interactive Sales Reporting Dashboard',
        description: 'Visualizes daily, weekly, and monthly revenue metrics using Recharts graphical analytics.',
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/Diki04/Realtime-Point-Of-Sale-Apps.git',
      installCmd: 'npm install',
      devCmd: 'npm run dev',
    },
  },
  {
    id: 'proj-11',
    title: 'E-PPM LPDP Universitas Riau',
    slug: 'e-ppm',
    description: {
      en: 'Institutional academic research and community service management portal handling multi-stage grant proposals, peer-review scoring, contractual disbursements, and geospatial monitoring (SIMONI) under LPDP.',
      id: 'Sistem informasi terpadu tata kelola penelitian dan pengabdian masyarakat LPDP Universitas Riau untuk pengusulan proposal riset, penilaian reviewer, pencairan dana, dan pemantauan spasial kegiatan lapangan (SIMONI).',
    },
    category: 'fullstack',
    projectType: 'web',
    projectCategory: 'internship',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
    tags: ['PHP', 'Yii2 Advanced', 'Vue.js 3', 'Tailwind CSS', 'PostgreSQL / MySQL', 'Leaflet GIS', 'mPDF', 'Highcharts'],
    githubUrl: 'https://gitlab.com/unri-2025/eppm-lpdp',
    featured: false,
    createdAt: '2026-02-14',
    introduction: {
      en: 'An enterprise-scale university portal deployed at Universitas Riau for administering LPDP research and community service grants. The system manages the entire project lifecycle—from proposal submissions, blind peer review scoring, and budget plan verifications to contractual legal document generation and geospatial field validation (SIMONI).',
      id: 'Portal universitas skala enterprise yang diimplementasikan di Universitas Riau untuk mengelola hibah penelitian dan pengabdian kepada masyarakat yang didanai oleh LPDP. Sistem ini menangani seluruh siklus proyek—mulai dari pengusulan proposal, penilaian reviewer, verifikasi RAB, pembuatan surat kontrak otomatis, hingga pemantauan lapangan berbasis geospasial (SIMONI).',
    },
    features: [
      {
        title: '📑 Multi-Batch Grant Proposal Workflow',
        description: 'Comprehensive approval stages matching institutional governance regulations:',
        codeSnippet: 'views/proposal-batch/index.php',
        bullets: [
          'Rubric-based scoring matrices for blind peer reviewers',
          'Automated research contract PDF generation with digital signature blocks via mPDF',
        ],
      },
      {
        title: '📍 SIMONI Spatial Field Activity Mapping',
        description: 'Interactive Leaflet GIS map displaying university community service locations and participant demographics.',
      },
      {
        title: '📊 Research Output & Publication Metrics',
        description: 'Analytical dashboards tracking Scopus publications, patents, and budget realization using Highcharts.',
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://gitlab.com/unri-2025/eppm-lpdp.git',
      installCmd: 'composer install',
      devCmd: 'php yii serve --port=8080',
    },
  },
  {
    id: 'proj-12',
    title: 'Proteus Guardian - Predictive Maintenance Copilot',
    slug: 'proteus-guardian',
    description: {
      en: 'Industrial IoT predictive maintenance platform computing Remaining Useful Life (RUL) and anomaly detection from multi-sensor machine telemetry to prevent critical hardware downtime.',
      id: 'Platform predictive maintenance cerdas untuk industri yang menghitung sisa masa pakai mesin (Remaining Useful Life / RUL) dan deteksi anomali telemetri sensor getaran/suhu secara real-time guna mencegah kegagalan alat.',
    },
    category: 'ml',
    projectType: 'web',
    projectCategory: 'competition',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    tags: ['React 19', 'Vite', 'TypeScript', 'Python FastAPI', 'TensorFlow', 'Remaining Useful Life (RUL)', 'Firebase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/TimesCoder/proteusGuardian',
    featured: true,
    createdAt: '2026-03-10',
    introduction: {
      en: 'Proteus Guardian is an intelligent industrial monitoring copilot designed to deliver zero unplanned downtime in manufacturing environments. By ingesting streaming sensor signals (vibration, thermal gradient, RPM, pressure), machine learning models predict Remaining Useful Life (RUL) and trigger predictive alerts before catastrophic equipment failure.',
      id: 'Proteus Guardian adalah copilot pemantauan industri cerdas yang dirancang untuk mencegah downtime mesin yang tidak terencana di sektor manufaktur. Dengan memproses telemetri sensor (getaran, suhu, RPM, tekanan), model machine learning menghitung Remaining Useful Life (RUL) dan mengirimkan peringatan dini sebelum terjadi kerusakan fatal.',
    },
    features: [
      {
        title: '⏱️ Remaining Useful Life (RUL) Estimation',
        description: 'Deep neural regression networks projecting machinery operational lifespan:',
        codeSnippet: 'predict_rul(sensor_readings_window)',
        bullets: [
          'Identifies degradation signatures weeks before visible mechanical failure',
          'Live anomaly threshold alerts with priority escalation levels',
        ],
      },
      {
        title: '📊 Real-Time Telemetry Dashboard',
        description: 'Interactive time-series charts visualizing real-time vibration amplitude and temperature heatmaps.',
      },
      {
        title: '🤖 Maintenance Recommendation Engine',
        description: 'Automated actionable work-order suggestions for engineering technicians on duty.',
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/TimesCoder/proteusGuardian.git',
      installCmd: 'npm install',
      devCmd: 'npm run dev',
    },
  },
  {
    id: 'proj-13',
    title: 'Portfolio v1 - Personal Developer Website',
    slug: 'portfolio-v1',
    description: {
      en: 'First-generation personal developer portfolio featuring an interactive Swiper showcase slider, custom stair-step page transitions, dynamic resume badges, and Supabase integration.',
      id: 'Portofolio web personal generasi pertama yang menampilkan slider karya interaktif dengan Swiper.js, animasi transisi halaman bertingkat (Stair Transition), etalase resume akademik, dan integrasi Supabase.',
    },
    category: 'frontend',
    projectType: 'web',
    projectCategory: 'personal',
    image: '/projects/portfolio.png',
    tags: ['Next.js 14', 'React', 'Tailwind CSS', 'Framer Motion', 'Swiper.js', 'Supabase', 'Lucide Icons'],
    githubUrl: 'https://github.com/Diki04/Portfolio',
    featured: false,
    createdAt: '2025-07-13',
    introduction: {
      en: 'The initial iteration of my personal software engineering portfolio built on Next.js 14. It introduced custom Framer Motion page transitions (StairTransition), responsive work showcases powered by Swiper, and an integrated Supabase backend for dynamic project updates.',
      id: 'Iterasi awal website portofolio rekayasa perangkat lunak saya yang dibangun di atas Next.js 14. Menghadirkan transisi halaman bertingkat unik (StairTransition) berbasis Framer Motion, slider karya responsif dengan Swiper.js, dan backend Supabase terintegrasi.',
    },
    features: [
      {
        title: '🪜 Custom Stair-Step Page Transitions',
        description: 'Artistic multi-column stair animations executed during route changes using Framer Motion:',
        codeSnippet: 'StairTransition.jsx',
        bullets: [
          'Zero cumulative layout shift during transitions',
          'Responsive navigation drawer for mobile screens',
        ],
      },
      {
        title: '🎠 Interactive Project Carousel',
        description: 'Smooth touch-enabled project slider with active slide change listeners and detail tooltips.',
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/Diki04/Portfolio.git',
      installCmd: 'pnpm install',
      devCmd: 'pnpm dev',
    },
  },
  {
    id: 'proj-14',
    title: 'AEnime List - Anime Discovery Platform',
    slug: 'aenime-list',
    description: {
      en: 'Modern anime exploration and tracking web application leveraging Jikan REST API for real-time seasonal anime schedules, top-rated series rankings, detailed synopses, and personal bookmarks.',
      id: 'Aplikasi web penjelajah dan pelacak serial anime modern yang terhubung dengan Jikan REST API untuk melihat jadwal tayang anime musiman, peringkat global, sinopsis lengkap, trailer, dan bookmark favorit.',
    },
    category: 'frontend',
    projectType: 'web',
    projectCategory: 'personal',
    image: '/projects/Aenime.png',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Jikan / MyAnimeList API', 'Framer Motion', 'REST API'],
    githubUrl: 'https://github.com/Diki04/Aenime-List',
    featured: false,
    createdAt: '2025-07-13',
    introduction: {
      en: 'A responsive anime curation platform providing pop culture enthusiasts with comprehensive series information, community ratings, and episode schedules. Built with Next.js and Tailwind CSS, the application consumes the Jikan API (an open-source MyAnimeList interface) to offer search filtering and personalized watchlists.',
      id: 'Platform kurasi anime responsif yang menyediakan informasi lengkap serial animasi, rating komunitas global, dan jadwal episode terbaru. Dibangun dengan Next.js dan Tailwind CSS, aplikasi ini mengonsumsi Jikan API untuk menyediakan fitur pencarian cepat, filter genre, dan daftar tontonan favorit.',
    },
    features: [
      {
        title: '🔍 Real-Time Anime Search & Filtering',
        description: 'Instant search querying MyAnimeList data with debounce optimizations:',
        codeSnippet: 'fetch("https://api.jikan.moe/v4/anime?q=" + query)',
        bullets: [
          'Filters by airing status, demographic, and genre tags',
          'High-resolution promotional key visuals and official YouTube trailer embeds',
        ],
      },
      {
        title: '⭐ Community Ratings & Character Profiles',
        description: 'Inspect global rankings, top characters, and voice actor rosters for every series.',
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/Diki04/Aenime-List.git',
      installCmd: 'npm install',
      devCmd: 'npm run dev',
    },
  },
  {
    id: 'proj-15',
    title: 'Modern Fullstack E-Commerce Store',
    slug: 'e-commerce',
    description: {
      en: 'Fullstack digital commerce store equipped with secure JWT user authentication, dynamic shopping cart state, catalog multi-category filtering, order processing, and payment gateway integration.',
      id: 'Platform toko online modern fullstack dengan autentikasi aman berbasis JWT, manajemen keranjang belanja reaktif, filter katalog multi-kategori dan harga, serta integrasi sistem pembayaran.',
    },
    category: 'fullstack',
    projectType: 'web',
    projectCategory: 'personal',
    image: '/projects/ECommerce.png',
    tags: ['Node.js', 'Express.js', 'React', 'MongoDB / PostgreSQL', 'JWT Auth', 'Tailwind CSS', 'Payment Gateway'],
    githubUrl: 'https://github.com/Diki04/E-Commerce',
    featured: false,
    createdAt: '2025-07-13',
    introduction: {
      en: 'A full-featured digital retail web application covering both client shopping experiences and merchant management. Operating with a Node.js/Express REST API backend and a responsive React frontend, it manages authentication tokens, cart mutations, inventory deductions, and checkout lifecycles.',
      id: 'Aplikasi belanja online fullstack yang dirancang untuk pengalaman belanja pelanggan yang mulus dan manajemen katalog pedagang yang efisien. Menggunakan backend Node.js/Express REST API dan frontend React responsif, aplikasi ini menangani autentikasi JWT, mutasi keranjang belanja, pengurangan stok otomatis, dan proses checkout.',
    },
    features: [
      {
        title: '🛒 Reactive Shopping Cart & Checkout',
        description: 'Optimistic cart state management with real-time subtotal and shipping calculations:',
        codeSnippet: 'dispatch({ type: "ADD_TO_CART", payload: item })',
        bullets: [
          'Instant item quantity modifiers and discount code redemption',
          'Token-based user session handling via HTTP-only security cookies',
        ],
      },
      {
        title: '📦 Product Catalog Management',
        description: 'Admin CRUD capabilities for updating inventory stocks, product galleries, and promotional banners.',
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/Diki04/E-Commerce.git',
      installCmd: 'npm install',
      devCmd: 'npm run dev',
    },
  },
  {
    id: 'proj-16',
    title: 'E-Wedding - Digital Wedding Invitation',
    slug: 'e-wedding',
    description: {
      en: 'Elegant and responsive digital wedding invitation web platform featuring personalized guest URL parameters, interactive Google Maps venue navigation, background audio player, and real-time RSVP guestbook.',
      id: 'Aplikasi undangan pernikahan digital yang elegan dan interaktif dengan personalisasi nama tamu undangan, rute peta Google Maps, pemutar musik romantis latar, buku tamu (RSVP) real-time, dan amplop digital.',
    },
    category: 'fullstack',
    projectType: 'web',
    projectCategory: 'freelance',
    image: '/projects/eWedding.png',
    tags: ['PHP', 'Laravel', 'Tailwind CSS', 'Alpine.js / JavaScript', 'MySQL', 'Google Maps API'],
    githubUrl: 'https://github.com/Diki04/E-Wedding',
    featured: false,
    createdAt: '2025-06-08',
    introduction: {
      en: 'A bespoke digital wedding invitation platform built with Laravel and Tailwind CSS. The web application provides couples with a paperless, interactive invitation experience that dynamically populates the guest name from URL parameters, provides countdown timers, allows guestbook greetings with prayer messages, and provides one-click navigation to event venues.',
      id: 'Platform undangan pernikahan digital elegan yang dibangun dengan Laravel dan Tailwind CSS. Aplikasi web ini memberikan pengalaman undangan tanpa kertas (paperless) yang interaktif dengan personalisasi nama tamu dinamis dari parameter URL, hitung mundur hari bahagia, buku tamu ucapan doa (RSVP) real-time, navigasi Google Maps, dan amplop digital.',
    },
    features: [
      {
        title: '💌 Dynamic Guest Personalization',
        description: 'Injects personalized guest titles and invitation greetings directly from request query parameters:',
        codeSnippet: 'route("invitation", ["to" => $guestName])',
        bullets: [
          'Automatic opening cover animation with music playback authorization',
          'Interactive countdown timer to the wedding ceremony date',
        ],
      },
      {
        title: '📖 Real-Time RSVP & Guestbook Prayers',
        description: 'Allows invited guests to confirm attendance and submit blessings displayed in an interactive prayer feed.',
      },
      {
        title: '📍 Google Maps Venue Direction & Digital Envelope',
        description: 'One-tap directions to ceremony venues and direct bank/e-wallet transfer copying.',
      },
    ],
    gettingStarted: {
      cloneCmd: 'git clone https://github.com/Diki04/E-Wedding.git',
      installCmd: 'composer install && npm install',
      devCmd: 'php artisan serve & npm run dev',
    },
  },
];
