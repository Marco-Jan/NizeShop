import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Homepage';
import ProductList from './Shop';
import ErrorPage from './ErrorComponent';
import ProductCart from './ShoppingCart';



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
                    element: <ProductCart product={{
                        title: undefined,
                        image: undefined,
                        id: 0,
                        name: '',
                        description: '',
                        brand: '',
                        price: '',
                        category: ''
                    }} />,
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