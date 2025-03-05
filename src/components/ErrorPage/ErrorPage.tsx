import { FunctionComponent } from 'react';
import Link from 'next/link';

const ErrorPage: FunctionComponent = () => {
  return (
    <div className="error-page">
      <h1>404</h1>
      <Link href={'/'}>Go back to the main page</Link>
    </div>
  );
};

export default ErrorPage;
