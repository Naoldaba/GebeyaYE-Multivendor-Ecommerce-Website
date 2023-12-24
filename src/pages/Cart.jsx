import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";


const Cart = ({cart, setCart, cartCount, setCartCount}) => {
    
    
    const [selectedProduct, setSelectedProduct]= useState(null);
    
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (itemId, quantity) => {
        const newQuantities = {
        ...quantities,
        [itemId]: isNaN(quantity) ? 1 : quantity,
        };
        setQuantities(newQuantities);
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cart.forEach((item) => {
        const quantity = quantities[item.id] || 1;
        totalPrice += item.price * quantity;
        });
        return totalPrice.toFixed(2);
    };


    const handleDelete = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setQuantities((prevQuantities) => {
          const { [productId]: deletedQuantity, ...updatedQuantities } = prevQuantities;
          return updatedQuantities;
        });

        setCart(updatedCart)
        if (cartCount>0){
            setCartCount(cartCount-1)
        }
      };

    const toggleAccordion=(productId)=>{
        if (selectedProduct===productId){
            setSelectedProduct(null);
        }else{
            setSelectedProduct(productId);
        }
    };

    return (
        <div className="products w-full flex flex-wrap gap-5 justify-center ">
            <h2 className="text-5xl w-full ml-8 mt-3 font-bold">Shopping Cart</h2>
            <hr className="w-full"/>
            {cart.length==0 && 
                <div className="flex flex-col justify-center items-center">
                    <CiShoppingCart className="text-9xl w-full"/>
                    <h1 className="text-xl italic">Opps you didin't add any product!!!</h1>
                    <Link to="/" className="text-center bg-primary text-white p-1 rounded mt-3">Back to Shop</Link>
                </div>
            }
            {cart.length>0 && cart.map((product)=>(
                <div key={product.id} className="product bg-white justify-self-center rounded-lg p-6 w-64 shadow-2xl my-10">
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
                        <div>
                            <label className="mr-3">Amount</label>
                            <input type="number" id="quantity" name="quantity" min="1" max="50" placeholder="1" className="p-0 pl-2"
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}/>
                        </div>
                        
                    </div> 
                    <p>={(product.price * (quantities[product.id] || 1))}Br</p>
                    <button className="bg-blue-700 text-white float-right p-1 rounded" onClick={() => handleDelete(product.id)}>Remove</button>
                </div>
                
            ))}

            {cart.length>0 && 
                <div className="w-96">
                    <p className="w-full mb-10 font-bold">Total Price: {calculateTotalPrice()}</p>
                    <label className="">Choose delivery date<input type="date" className="w-full" placeholder="Choose delivery date"/></label>
                    <select className="w-full my-10">
                        <option value="">Choose delivery location</option>
                        <option value="Addis Ketema">Addis Ketema</option>
                        <option value="Akaky Kaliti">Akaky Kaliti</option>
                        <option value="Arada">Arada</option>
                        <option value="Bole">Bole</option>
                        <option value="Gullele">Gullele</option>
                        <option value="Kirkos">Kirkos</option>
                        <option value="Kolfe Keranio">Kolfe Keranio</option>
                        <option value="Lideta">Lideta</option>
                        <option value="Nifas Silk-Lafto">Nifas Silk-Lafto</option>
                        <option value="Yeka">Yeka</option>
                    </select>
                    <button className="bg-blue-500 text-white w-full mb-10 p-1">Proceed to Checkout</button>
                    
                </div>
            }
        </div>
    );
}
 
export default Cart;