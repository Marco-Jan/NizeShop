import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Homepage';
import ProductList from './Shop';
import ErrorPage from './ErrorComponent';
import ShoppingCart from './ShoppingCart';



export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navbar />
            ,
            children: [
                {
                    path: "/",
                    element: <Homepage />,
                    errorElement: <ErrorPage />
                },
                {
                    path: "/shop",
                    element: <ProductList />,
                    errorElement: <ErrorPage />
                },
                {
                    path: "/cart",
                    element: <ShoppingCart />,
                    errorElement: <ErrorPage />
                },
                

            ]
        }]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}