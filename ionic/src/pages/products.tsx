import { FunctionComponent } from 'react';
import './products.css';

interface Product {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}

const Products: FunctionComponent<Product[]> =(products) => {
        return (
            <div>
                <h1>Product List</h1>
                <ul>
                   {/*  {products.map((value, index) =>
                        <li key={index}>{value.brand}</li>
                    )} */}
                </ul>
            </div>);
    }

export default Products;