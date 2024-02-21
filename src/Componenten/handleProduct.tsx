export type Product = {
    id: number;
    name: string;
    description: string;
    brand: string;
    price: string;
    category: string;
};

export async function getMovies() {
    let product: Product[] = await fetch("http://localhost:5001/products").then(
        (res) => res.json() 
    );
    
    return product;
}
