import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: FunctionComponent = () => {
  return (
    <>
      <h1>404</h1>
      <Link to={'/'}>Go back to the main page</Link>
    </>
  );
};

export default ErrorPage;
