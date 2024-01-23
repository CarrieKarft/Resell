import React, {useContext} from 'react';
import {Routes, Route, useNavigate, json} from "react-router-dom";
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
  console.log(products)
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

  function onHandelCreatingNewComment(newCommentObj) {
    console.log(newCommentObj)
    fetch('/comments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommentObj)
    }).then(r => {
      if(r.ok) {
          r.json().then(newCommentData => handleUpdatingCommentState(newCommentData))
      } else {
          r.json().then(errorData => alert(errorData.error))
      }
    })
  }

  function handleUpdatingCommentState(newCommentData) {
    console.log(newCommentData)
    const findingProduct = products.find(prod => prod.id === newCommentData.product_id)
    const updatingProdComments = [...findingProduct.comments, newCommentData]
    const updatingProd = {...findingProduct, comments: updatingProdComments}
    const replacingProd = products.map(prod => prod.id === findingProduct.id ? updatingProd : prod)
    setProducts(replacingProd)

  }

  function onHandleUpdatingComment(comment, id) {
    console.log(comment)
    console.log(id)
    fetch(`/comments/${id}`,  {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({comment: comment})
    }).then(r => {
      if(r.ok) {
          r.json().then(updatedCommentData => handleStateForUpdatedComment(updatedCommentData))
      } else {
          r.json().then(errorData => alert(errorData.error))
      }
    })
  }

  function handleStateForUpdatedComment(updatedCommentData) {
    const findingProduct = products.find(prod => prod.id === updatedCommentData.product_id);
    const replacingComment = findingProduct.comments.map(comm => comm.id === updatedCommentData.id ? updatedCommentData : comm);
    const updatedProduct = {...findingProduct, comments: replacingComment};
    const replacingProduct = products.map(prod => prod.id === updatedProduct.id ? updatedProduct : prod);
    setProducts(replacingProduct)
  }

  function onHandleDelete(id, product_id) {
    console.log(id)
    fetch(`/comments/${id}`, {
      method: "DELETE",
    })
    .then(r => {
      if(r.ok) {
        r.json().then(() => handleRemovingComment(id, product_id))
      } else {
        r.json().then(errorData => alert(errorData.error))
      }
    })
  }

  function handleRemovingComment(id, product_id) {
    console.log(id)
    console.log(product_id)
    const findingProduct = products.find(prod => prod.id === product_id);
    const filterOutComment = findingProduct.comments.filter(comm => comm.id !== id);
    const updatingProduct = {...findingProduct, comments: filterOutComment};
    const replacingProduct = products.map(prod => prod.id === updatingProduct.id ? updatingProduct : prod);
    setProducts(replacingProduct);
  }


  return (
    <div className="App">
      
      <NavBar username={currentUser.username}/>
      <Routes>
        <Route path='/profile' element={<UserProfile onHandleLogout={onHandleLogout}/>} />
        <Route path='/products-page' element={<ProductsPage />} />
        <Route path='/product/new' element={<NewProductForm onHandleCreateProduct={onHandleCreateProduct}/>} />
        <Route path='/product/:id' element={<ViewProduct onHandelCreatingNewComment={onHandelCreatingNewComment} onHandleUpdatingComment={onHandleUpdatingComment} onHandleDelete={onHandleDelete}/>}/>
      </Routes>
    </div>
  );
}

export default App;
