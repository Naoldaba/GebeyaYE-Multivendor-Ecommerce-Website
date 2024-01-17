import Nav from "./components/Nav"
import Footer from './components/Footer'
import ProductCatalog from "./pages/ProductCataloge";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Cart from "./pages/Cart";
import AboutUs from "./pages/About";
import MessagePane from "./pages/MessagePane";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthContext } from "./components/AuthContext";
import ApplicationStatus from "./components/ApplicationStatus";
import OrderSuccess from "./components/OrderSuccess";
import OrderFailed from "./components/OrderFailed";
import ProductManagement from "./components/productManagement";
import pendingVendor from "./components/pendingVendor";
import successBuyer from "./components/successBuyer";
import failedLogin from "./components/failedLogin";
import PaymentForm from "./components/PaymentForm";



function App() {
  const [cartCount, setCartCount]=useState(0);
  const [cart, setCart] = useState([]);
  const {authToken, userType} = useContext(AuthContext);

  const [productData, setProductData]=useState([])

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchProductData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/product', {
          method: 'GET',
          signal: signal
        });

        if (!response.ok) {
          throw new Error('Network Error');
        }

        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.log("Error fetching requested data: ", error);
      }
    };

    fetchProductData();

    return () => {
      abortController.abort();
    };
  }, [authToken]);

  const addToCart = async (product) => {
    const isFound = cart.find((element) => element._id === product._id);
  
    if (!isFound) {
      try {
        const response = await fetch(`http://localhost:3000/api/cart`, {
          method: 'POST',
          headers: {
            "authToken":authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({productId:product._id})
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
          {/* <Nav cartCount={cartCount}/> */}
          <Nav cartCount={cartCount} setProducts={setProductData}/>
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
            <Route exact path="/login" component={Login} />
            <Route path="/logout" component={Logout}/>
            <Route path="/signup" component={SignUp} />
            <Route exact path="/about" component={AboutUs} />
            <Route path="/about/contact" component={MessagePane}/>
            <Route path="/application status" component={ApplicationStatus}/>
            <Route path="/success order" component={OrderSuccess} />
            <Route path="/failed order" component={OrderFailed} />
            <Route path="/product management" component={ProductManagement} />
            <Route path="/login/vendorpending" component={pendingVendor} />
            <Route path="/login/buyerlogin" component={successBuyer} />
            <Route path="/login/loginfailed" component={failedLogin} />
            <Route path="/login/paymentform" component={PaymentForm} />


          </Switch>

          <Footer/>
        </div>
    </BrowserRouter>
  );
}

export default App;
