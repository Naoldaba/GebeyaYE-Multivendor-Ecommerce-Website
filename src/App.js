import Nav from "./components/Nav"
import Footer from './components/Footer'
import ProductCatalog from "./pages/ProductCataloge";
import shoe from './utils/shoe.avif';
import bag from './utils/bag.avif';
import toy from './utils/toy.jpg';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Cart from "./pages/Cart";
import AboutUs from "./pages/About";
import ContactForm from "./pages/ContactForm";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";


const productData=[
  {
    id:1,
    name:"product-1",
    image: shoe,
    description: "bla bla",
    price: 1200
  },
  {
    id:2,
    name:"product-2",
    image: bag,
    description: "bla bla",
    price: 3000
  },
  {
    id:3,
    name:"product-3",
    image: toy,
    description: "bla bla",
    price: 2500
  },
  {
    id:4,
    name:"product-1",
    image: shoe,
    description: "bla bla",
    price: 1000
  },
  {
    id:5,
    name:"product-2",
    image: bag,
    description: "bla bla",
    price: 5000
  },
  {
    id:6,
    name:"product-3",
    image: toy,
    description: "bla bla",
    price: 1000
  }
]


function App() {
  const [cartCount, setCartCount]=useState(0);
  const [cart, setCart] = useState([]);

  const addToCart = product => {
  const isFound = cart.find(element=>{
      if (element.id==product.id){
          return true
      }

      return false;
  })
  
      {!isFound && setCart([...cart, product])}
      {!isFound && setCartCount(cartCount+1)}
    
  };


  return (
    <BrowserRouter>
      <div className="flex flex-col justify-between min-h-screen">
        <Nav cartCount={cartCount}/>
        <Switch>
          <Route exact path="/">
            <ProductCatalog products={productData} addToCart={addToCart}/>
          </Route>
          <Route path="/cart">
            <Cart cart={cart} setCart={setCart} cartCount={cartCount} setCartCount={setCartCount}/>
          </Route>
          <Route path="/dashboard">
            <VendorDashboard products={productData}/>
          </Route>
          <Route path="/admindashboard">
            <AdminDashboard />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/about" component={AboutUs} />
          <Route path="/about/contact" component={ContactForm}/>
        </Switch>

        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
