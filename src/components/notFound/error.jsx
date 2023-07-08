import { useRouteError } from "react-router-dom";

import "./error.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div class='error-section'>
      <h1 class='error'>❗️</h1>
      <h1 class='error'>404</h1>
      <h1 class='error'>Security Breach</h1>
      <div class='page'>Ooops!!! The page you are looking for is not found</div>
      <a class='back-home' href='/'>
        Back to home
      </a>
    </div>
  );
}
