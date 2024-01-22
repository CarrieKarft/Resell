import React, {useContext} from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import ProductsPage from './components/ProductsPage';
import NewProductForm from './components/NewProductForm';
import {ProductsContext} from './context/ProductsContext'
import { CurrentUserContext } from './context/CurrentUserContext';
import SignupPage from './components/SignupPage';
import NavBar from './components/NavBar';
import CurrentUserBids from './components/CurrentUserBids';
import ViewProduct from './components/ViewProduct';
import UserProfile from './components/UserProfile';



function App() {
  const {products, setProducts} = useContext(ProductsContext);
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext)

  if(!currentUser) return <SignupPage  onHandleLoginFetch={onHandleLoginFetch} handleUserSignupFetch={handleUserSignupFetch}/>

  function onHandleLoginFetch(loginObj) {
    fetch('/login', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObj)
  }).then(r => {
    if(r.ok) {
        r.json().then(userData => setCurrentUser(userData))
    } else {
        r.json().then(errorData => alert(errorData.error))
    }
  })
  }

  function onHandleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => setCurrentUser(null));
  }

  function handleUserSignupFetch(newUserObj) {
    console.log(newUserObj)
    fetch('/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserObj)
    })
    .then(r => {
      if(r.ok) {
          r.json().then(newUserData => setCurrentUser(newUserData))
      } else {
          r.json().then(errorData => alert(errorData.errors))
      }
    })
  }

  
  
  function onHandleCreateProduct(data) {
    fetch('/products', {
      method: "POST",
      body: data
    })
    .then((r) => {
      if(r.ok) {
          r.json().then((newProductData) => handleNewProductState(newProductData))
      } else {
          r.json().catch((errorData) => alert(errorData.errors))
      }
  })
  }

  function handleNewProductState(newProductData) {
    console.log(newProductData.image_url)
    const addingNewProduct = [...products, newProductData]
    setProducts(addingNewProduct)
  }
  return (
    <div className="App">
      
      <NavBar username={currentUser.username}/>
      <Routes>
        {/* <SignupPage handleUserSignupFetch={handleUserSignupFetch}/> */}
        <Route path='/profile' element={<UserProfile onHandleLogout={onHandleLogout}/>} />
        <Route path='/products-page' element={<ProductsPage />} />
        <Route path='/product/new' element={<NewProductForm onHandleCreateProduct={onHandleCreateProduct}/>} />
      </Routes>
    </div>
  );
}

export default App;
