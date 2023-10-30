import { useRouteError } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";

import { Link } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <Jumbotron>
        <h1>404 Page Not Found</h1>

        <h1>Oops! You seem to be lost.</h1>

        <Link to="/">Go back to main page</Link>
        <img src="../images/404.jpg/" />
      </Jumbotron>
    </div>
  );
}
