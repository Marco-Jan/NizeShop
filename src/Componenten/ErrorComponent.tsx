import  {isRouteErrorResponse, useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();


    return (
        <div>
            <h1>Oops! Something went wrong</h1>
            <p>
                {isRouteErrorResponse(error) ? `${error.status}: ${error.statusText}` : (error as Error).message}
            </p>
        </div>
    );
}