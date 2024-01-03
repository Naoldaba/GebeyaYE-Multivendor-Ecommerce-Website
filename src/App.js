import Nav from "./components/Nav"
import Footer from './components/Footer'
import ProductCatalog from "./pages/ProductCataloge";
import shoe from './utils/shoe.avif';
import bag from './utils/bag.avif';
import toy from './utils/toy.jpg';
import Login from "./pages/Login";
import Logout from "./components/Logout";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Cart from "./pages/Cart";
import AboutUs from "./pages/About";
import ContactForm from "./pages/ContactForm";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthContext, AuthProvider } from "./components/AuthContext";
import ApplicationStatus from "./components/ApplicationStatus";


const productData=[
  {
    id:1,
    name:"product-1",
    imageUrl: shoe,
    description: "bla bla",
    price: 1200
  },
  {
    id:2,
    name:"product-2",
    imageUrl: bag,
    description: "bla bla",
    price: 3000
  },
  {
    id:3,
    name:"product-3",
    imageUrl: toy,
    description: "bla bla",
    price: 2500
  },
  {
    id:4,
    name:"product-1",
    imageUrl: shoe,
    description: "bla bla",
    price: 1000
  },
  {
    id:5,
    name:"product-2",
    imageUrl: bag,
    description: "bla bla",
    price: 5000
  },
  {
    id:6,
    name:"product-3",
    imageUrl: toy,
    description: "bla bla",
    price: 1000
  }
]


function App() {
  const [cartCount, setCartCount]=useState(0);
  const [cart, setCart] = useState([]);
  const {authToken} = useContext(AuthContext);

  // const [productData, setProductData]=useState([])

  // useEffect(()=>{
  //   const fetchProductData=async ()=>{
  //     try{
  //       const response=await fetch('http://localhost:3000/api/product')
  //       if (!response.ok){
  //         throw new Error('Network Error')
  //       }
  //       const data=await response.json()
  //       setProductData(data)
  //     } catch(error){
  //         console.log("error fetching requested data: ", error)
  //     }
  //   }

  //   fetchProductData();
  // },[])

  const addToCart = async (product) => {
    const isFound = cart.find((element) => element._id === product._id);
  
    if (!isFound) {
      try {
        const response = await fetch('http://localhost/api/cart', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
  
        if (response.ok) {
          setCart((prevCart) => [...prevCart, product]);
          setCartCount(cartCount + 1);
          console.log('Item added to cart');
        } else {
          console.log('Item could not be added');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    } else {
      console.log('Item is already in the cart');
    }
  };
  
  
  

  return (
    <BrowserRouter>
        <div className="flex flex-col justify-between min-h-screen">
          <Nav cartCount={cartCount}/>
          {/* <Nav cartCount={cartCount} setProducts={setProductData}/> */}
          <Switch>
            <Route exact path="/">
              <ProductCatalog products={productData} addToCart={addToCart} cart={cart}/>
            </Route>
            <Route path="/cart">
              <Cart cart={cart} setCart={setCart} cartCount={cartCount} setCartCount={setCartCount}/>
            </Route>
            <Route path="/vendordashboard">
              <VendorDashboard/>
            </Route>
            <Route path="/admindashboard">
              <AdminDashboard />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout}/>
            <Route path="/signup" component={SignUp} />
            <Route exact path="/about" component={AboutUs} />
            <Route path="/about/contact" component={ContactForm}/>
            <Route path="/application status" component={ApplicationStatus}/>
          </Switch>

          <Footer/>
        </div>
    </BrowserRouter>
  );
}

export default App;
