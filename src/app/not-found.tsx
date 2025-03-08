import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <Link href={'/'}>Go back to the main page</Link>
    </div>
  );
}
