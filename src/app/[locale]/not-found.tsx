import Link from 'next/link';
import { Container } from '../../common/components/Container';
import { Button } from '../../common/components/Button';
import { TerminalEasterEgg } from '../../common/components/TerminalEasterEgg';

export default function NotFound() {
  return (
    <Container className="py-24 text-center flex flex-col items-center justify-center min-h-[70vh]">
      <span className="font-mono text-sm text-sky-400 bg-sky-950/40 px-3 py-1 rounded-full border border-sky-800/50 mb-4">
        HTTP 404 / NOT FOUND
      </span>
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
        Page Lost in Cyberspace
      </h1>
      <p className="text-slate-400 max-w-md mb-6 text-sm">
        The destination coordinate you navigated to does not exist or has migrated to another endpoint.
      </p>
      <div className="flex gap-4 mb-4">
        <Link href="/">
          <Button variant="primary">Return Home</Button>
        </Link>
        <Link href="/projects">
          <Button variant="outline">Browse Projects</Button>
        </Link>
      </div>
      <TerminalEasterEgg />
    </Container>
  );
}
