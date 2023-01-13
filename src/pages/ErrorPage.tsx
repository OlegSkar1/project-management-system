import { ErrorResponse } from '@remix-run/router';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError() as ErrorResponse;
  console.log(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
    }
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.data.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
