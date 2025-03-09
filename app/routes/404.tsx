import { Link } from 'react-router';

export default function ErrorPage() {
  return (
    <div className="background-light error-page">
      <h1>404</h1>
      <Link to={'/'}>Go back to the main page</Link>
    </div>
  );
}
