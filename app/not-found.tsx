import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#282C33] text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#C778DD] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-[#ABB2BF] mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#C778DD] text-white px-6 py-3 rounded-md hover:bg-[#E0B7FF] transition-colors duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}