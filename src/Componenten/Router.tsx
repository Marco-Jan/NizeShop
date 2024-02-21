import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootElement from './RootElement';
import Shop from './Shop';

export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootElement />
            ,
            children: [
                {
                    path: "/shop",
                    element: <Shop />
                }
            ]
        }]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}