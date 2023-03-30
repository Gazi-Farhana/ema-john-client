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
        // console.log(products);
        const storedCart = getShoppingCart();
        const savedCart = [];
        // console.log(storedCart);
        // Step 1: get id
        for(const id in storedCart){
            // step 2: get the product by using id
            // console.log(id);
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
            // step: 3 add quantity
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            // step 4: add the added product tp the saved cart
            savedCart.push(addedProduct);
        }
            console.log('added product', addedProduct);
        }
        // step 5: set the cart
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        // cart.push(product);
        let newCart = [];
        // const newCart = [...cart, product];
        // if product does not exist in the cart, then set quantity =1
        // if exist update the quantity by 1
        const exists = cart.find(pd=> pd.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart= [...cart, product]
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }

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