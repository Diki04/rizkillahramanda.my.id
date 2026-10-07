import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('hero');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {t('greeting')} <span className="text-accent-blue">Rizkillah Ramanda</span>
        </h1>
        <p className="mt-4 text-lg text-slate-300">
          {t('summary')}
        </p>
      </div>
    </main>
  );
}
