import React, {useContext} from 'react';
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
  const {setProducts} = useContext(ProductsContext);
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext)

  if(!currentUser) return <SignupPage  onHandleLoginFetch={onHandleLoginFetch}/>

  function onHandleLoginFetch(loginObj) {
    fetch('/login', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObj),
  }).then(r => {
    if(r.ok) {
        r.json().then(userData => setCurrentUser(userData))
    } else {
        r.json().then(errorData => alert(errorData.errors))
    }
  })
  }

  function onHandleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => setCurrentUser(null));
  }

  
  
  function onHandleCreateProduct(newProdObj) {
    // console.log(data)
    fetch('/products', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProdObj)
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
  }
  return (
    <div className="App">\
      <SignupPage />
      <UserProfile onHandleLogout={onHandleLogout}/>
      <ProductsPage />
      <NewProductForm onHandleCreateProduct={onHandleCreateProduct}/>
    </div>
  );
}

export default App;
