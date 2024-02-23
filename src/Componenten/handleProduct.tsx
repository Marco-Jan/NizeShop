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

export async function getProducts(searchTerm = '') {
    const response = await fetch(`https://fakestoreapi.com/products`);
    const products = await response.json();
    if (!searchTerm) {
        return products;
    }
    
    return products.filter((product: { title: string; }) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
}

  
