import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])


    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(()=>{
        console.log(products);
        const storedCart = getShoppingCart();
        // console.log(storedCart);
        // Step 1: get id
        for(const id in storedCart){
            // step 2: get the product by using id
            // console.log(id);
            const addedProduct = products.find(product => product.id === id);
            // step 3: get quantity of the product
            const quantity = storedCart[id];
            addedProduct.quantity = quantity
            console.log(addedProduct);
        }
    }, [products])

    const handleAddToCart = (product) => {
        // cart.push(product);
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
                {/* <h2>Products Coming Here: {products.length}</h2> */}
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;