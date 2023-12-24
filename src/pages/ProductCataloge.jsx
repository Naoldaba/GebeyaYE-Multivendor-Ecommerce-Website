import {useState} from 'react';

const ProductCatalog = ({products, addToCart}) => {
    const [selectedProduct, setSelectedProduct]= useState(null);
    
    const toggleAccordion=(productId)=>{
        if (selectedProduct===productId){
            setSelectedProduct(null);
        }else{
            setSelectedProduct(productId);
        }
    };

    return ( 
        <div className="product-catalog max-w-4xl rounded-lg text-center mx-auto my-20">
            <div className="products w-full grid mx-auto gap-x-4 gap-y-5 cols- grid-cols-2 md:grid-cols-3">
                {products.map((product)=>(
                    <div key={product.id} className="product bg-white justify-self-center rounded-lg p-6 w-64 shadow-2xl ">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4"/>
                        <div className="flex flex-wrap gap-3">
                            <h3 className="text-lg font-semibold mb-2">{product.name} </h3>
                            <p className="text-green-600 font-bold">Price: {product.price}Br.</p>
                            <button onClick={() => toggleAccordion(product.id)} className="text-blue-500 font-semibold mb-2 focus:outline-none">
                                {selectedProduct === product.id ? 'Hide Description' : 'Show Description'}
                            </button>
                            {selectedProduct === product.id && (
                                <p className="text-gray-600 mb-2 w-full">{product.description}</p>
                            )}
                            <button className="bg-sky-500 text-white p-1 w-full active:bg-black" onClick={()=>addToCart(product)} >Add to Cart</button>  
                        </div> 
                    </div>
                ))}
            </div>
        </div>
    );
}

{/* <p className="text-gray-600 mb-2">hi</p> */}
export default ProductCatalog;