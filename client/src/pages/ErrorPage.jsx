import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
    <h1>Oops! You seem to be lost.</h1>
    
    <Link to='/'>Go back to main page</Link>
   <img src="./images/404.jpg/"/>
</div>
  );
}