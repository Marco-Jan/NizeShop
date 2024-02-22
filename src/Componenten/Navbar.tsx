import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <div id="navbar">
                <nav id="navBar">
                    <Link to="/">NizeShop</Link>
                    <div id="navBarBtn">
                        <Link to="/">Home</Link>
                        <Link to="/shop">Shop</Link>
                        <Link to="/cart">Cart</Link>
                    </div>
                </nav>
            </div>
            <Outlet /> 
        </>
    );
}
