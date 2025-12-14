import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 space-y-4 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300">
          Go Home
        </Link>
      </div>
    </div>
  );
}
