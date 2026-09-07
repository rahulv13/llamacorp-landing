import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
      <p className="text-foreground/80 mb-8 max-w-md">
        Could not find the requested resource. The page might have been moved or doesn't exist.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
      >
        Return Home
      </Link>
    </div>
  );
}
