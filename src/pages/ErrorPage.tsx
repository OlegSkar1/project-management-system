import { AxiosError } from 'axios';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div id="error-page">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText}</i>
          </p>
        </div>
      );
    }
  } else if (error instanceof AxiosError) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    );
  }
  return <div>error</div>;
};
