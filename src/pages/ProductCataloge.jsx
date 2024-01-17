import React, { useState, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useHistory } from 'react-router-dom';
import Advertisements from '../components/Advertisements';

const ProductCatalog = ({ products, addToCart, cart }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null); // Add selectedCategory state
    const { isAuthenticated } = useContext(AuthContext);
    const history = useHistory();

    const toggleAccordion = (productId) => {
        if (selectedProduct === productId) {
            setSelectedProduct(null);
        } else {
            setSelectedProduct(productId);
        }
    };

    const type = localStorage.getItem('userType');

    const handleAddToCart = (item) => {
        if (isAuthenticated && type === 'Buyer') {
            addToCart(item);
        } else if (type === 'Buyer') {
            alert('Please login first');
            history.push('/login');
            console.log('Please log in first');
        }
    };

    const handleSocialShare = (productName, platform) => {
        const productUrl = window.location.href;
        const message = `Check out this amazing product: ${productName}`;

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${productUrl}`);
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${productUrl}&text=${message}`);
                break;
            case 'instagram':
                window.open(`https://www.instagram.com/`);
                break;
            default:
                break;
        }
    };

    const filterProductsByCategory = (category) => {
        setSelectedCategory(category);
        setSelectedProduct(null); 
    };

    return (
        <div className="flex flex-wrap justify-around product-catalog max-w-full rounded-lg text-center mx-auto my-20">
            <Advertisements />
            <div className=''>
                <div className="categories flex flex-wrap gap-3 ml-16">
                    <button onClick={() => filterProductsByCategory(null)}>All</button>
                    <button onClick={() => filterProductsByCategory('Electronics')}>Electonics</button>
                    <button onClick={() => filterProductsByCategory('Clothes')}>Clothes</button>
                    <button onClick={() => filterProductsByCategory('Furniture')}>Furniture</button>
                </div>
                <div className="products grid gap-x-4 gap-y-5  grid-cols-2 md:grid-cols-3">   
                {products
                    .filter((product) => !selectedCategory || product.category === selectedCategory)
                    .map((product) => (
                        <div key={product._id} className="product bg-white justify-self-center rounded-lg p-5 w-64 shadow-2xl ">
                            <img src={product.imageurl} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4"/>
                            <div className="flex flex-wrap gap-3">
                                <h3 className="text-lg font-semibold mb-2">{product.name} </h3>
                                <p className="text-green-600 font-bold">Price: {product.price}Br.</p>
                                <button onClick={() => toggleAccordion(product._id)} className="text-blue-500 font-semibold mb-2 focus:outline-none">
                                    {selectedProduct === product._id ? 'Hide Description' : 'Show Description'}
                                </button>
                                {selectedProduct === product._id && (
                                    <p className="text-gray-600 mb-2 w-full">{product.description}</p>
                                )}
                                
                                <button className="bg-sky-500 text-white p-1 w-full active:bg-black" onClick={()=>handleAddToCart(product)} >Add to Cart</button> 
                                <h1 className='font-bold'>Share</h1>
                                <div className='flex gap-1'>
                                    <button onClick={() => handleSocialShare(product.name, 'facebook')} className="bg-blue-500 text-white p-1 w-full">Facebook</button>
                                    <button onClick={() => handleSocialShare(product.name, 'twitter')} className="bg-blue-400 text-white p-1 w-full">Twitter</button>
                                    <button onClick={() => handleSocialShare(product.name, 'instagram')} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-1 w-1/3">Instagram</button>
                                </div> 
                        </div> 
                    </div> 
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductCatalog;




 