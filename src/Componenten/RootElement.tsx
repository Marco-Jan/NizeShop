import { Link } from "react-router-dom";

export default function RootElement() {
    return (
        <>
            <div id="navbar">
                <nav id="navBar">
                    <Link to="/">NizeShop</Link>
                    <div id="navBarBtn">
                        <Link to="/">Home</Link>
                        <Link to="/shop">Shop</Link>
                    </div>
                </nav>
            </div>
            
        
        </>
    );
}
