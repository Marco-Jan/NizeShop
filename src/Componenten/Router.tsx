import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Shop from './Shop';
import Navbar from './Navbar';
import Homepage from './Homepage';
import ProductList from './ProductList';

export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navbar />
            ,
            children: [
                {
                    path: "/",
                    element: <Homepage />
                },
                {
                    path: "/shop",
                    element: <ProductList />
                }
            ]
        }]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}