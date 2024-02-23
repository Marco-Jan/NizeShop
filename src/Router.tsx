import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './Componenten/RootElement';
import Homepage from './Componenten/Homepage';
import ProductList from './Componenten/Shop';
import ErrorPage from './Componenten/ErrorComponent';
import ShoppingCart from './Componenten/ShoppingCart';
import Product from './Componenten/Product';



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
                {
                    path: "/product/:productId",
                    element: <Product />,
                    errorElement: <ErrorPage />
                }
                

            ]
        }]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}