export type Product = {
    title: string | undefined;
    image: string | undefined;
    id: number;
    description: string;
    brand: string;
    price: number;
    category: string;
    quantity: number;
};

export async function getProducts() {
    const product: Product[] = await fetch("https://fakestoreapi.com/products").then(
        (res) => res.json() 
    );
    
    return product;
}
