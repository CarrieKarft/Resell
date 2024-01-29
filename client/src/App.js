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
import AboutPage from './components/AboutPage';




function App() {
  const {products, setProducts} = useContext(ProductsContext);
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext)

  const navigate = useNavigate();

  if(!currentUser) return <div className='signUp'><SignupPage onHandleLoginFetch={onHandleLoginFetch} handleUserSignupFetch={handleUserSignupFetch}/></div>

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
    // console.log(newUserObj)
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
          r.json().then((errorData) => alert(errorData.errors))
      }
  })
  }

  function handleNewProductState(newProductData) {
    const addingNewProduct = [...products, newProductData]
    setProducts(addingNewProduct)
    navigate('/products-page')
  }

  function onHandelCreatingNewComment(newCommentObj) {
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
          r.json().then(errorData => alert(errorData.errors))
      }
    })
  }

  function handleUpdatingCommentState(newCommentData) {
    const findingProduct = products.find(prod => prod.id === newCommentData.product_id)
    const updatingProdComments = [...findingProduct.comments, newCommentData]
    const updatingProd = {...findingProduct, comments: updatingProdComments}
    const replacingProd = products.map(prod => prod.id === findingProduct.id ? updatingProd : prod)
    setProducts(replacingProd)

  }

  function onHandleUpdatingComment(comment, id) {
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
          r.json().then(errorData => alert(errorData.errors))
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
    const findingProduct = products.find(prod => prod.id === product_id);
    const filterOutComment = findingProduct.comments.filter(comm => comm.id !== id);
    const updatingProduct = {...findingProduct, comments: filterOutComment};
    const replacingProduct = products.map(prod => prod.id === updatingProduct.id ? updatingProduct : prod);
    setProducts(replacingProduct);
  }

  function onHandleUpdatingBid (id, bidObj) {
    fetch(`/bids/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bidObj)
    })
    .then(r => {
      if(r.ok) {
        r.json().then((updatedbid) => handleUpdatingBidState(updatedbid))
      } else {
        r.json().then(errorData => alert(errorData.error))
      }
    })
  }

  function handleUpdatingBidState(updatedbid) {
    console.log(products)
    const findProduct = products.find(prod => updatedbid.product_id === prod.id);
    findProduct.current_highest_bid = updatedbid;
    const updatingProducts = products.map(prod => prod.id === findProduct.id ? findProduct : prod);
    console.log(updatingProducts)
    setProducts(updatingProducts)
    console.log(currentUser)
    const replacingUserBid = currentUser.bids.map(bid => bid.id === updatedbid.id ? updatedbid : bid)

    const findinUserProduct = currentUser.products.find(prod => updatedbid.product_id === prod.id);
    findinUserProduct.current_highest_bid = updatedbid;
    const replacingProductForUser = currentUser.products.map(prod => prod.id === findinUserProduct.id ? findinUserProduct : prod)
    const newCurrentUser = {...currentUser, products: replacingProductForUser, bids: replacingUserBid}
    console.log(newCurrentUser)
    setCurrentUser(newCurrentUser)

  }

  function onHandleCreateBid(bidObj) {
    console.log(bidObj)
    fetch('/bids', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bidObj)
    })
    .then(r => {
      if(r.ok) {
        r.json().then((newBid) => handleCreatingBidState(newBid))
      } else {
        r.json().then(errorData => alert(errorData.error))
      }
    })
  }

function handleCreatingBidState(newBid) {
  console.log(newBid)
  console.log("1", products)
  const findProduct = products.find(prod => prod.id === newBid.product_id);
  findProduct.current_highest_bid = newBid;
  const replacingProduct = products.map(prod => prod.id === findProduct.id ? findProduct : prod);
  console.log("2", replacingProduct)
  setProducts(replacingProduct);

 console.log("1", currentUser)
  const addBidToBids = [...currentUser.bids, newBid];

  const findUserProduct = currentUser.products.find(prod => prod.id === newBid.product_id)
  console.log(findUserProduct)
  if (!findUserProduct) {
    const {comments, ...notComments} = findProduct
    const addingProductToUser = [...currentUser.products, notComments];
    const newCurrentUser1 = {...currentUser, bids: addBidToBids, products: addingProductToUser};
    console.log(newCurrentUser1)
    setCurrentUser(() => newCurrentUser1)
  } else {
  findUserProduct.current_highest_bid = newBid
  const replacingUserProducts = currentUser.products.map(prod => prod.id === findUserProduct.id ? findUserProduct : prod)
  const newCurrentUser = {...currentUser, bids: addBidToBids, products: replacingUserProducts};
  console.log("2", newCurrentUser)
  setCurrentUser(newCurrentUser)
  }
  console.log("should have bid", currentUser)
}

console.log("should have bid", currentUser)

function onHandleUpdatingWinningBid(winningBid) {
  console.log("winning bid", winningBid)
  const updatingBids = currentUser.bids.map(bid => bid.id === winningBid.id ? winningBid : bid)
  console.log("user bids", updatingBids)
  const updatingUser = {...currentUser, bids: updatingBids}
  setCurrentUser(updatingUser)
  console.log(currentUser)

  const findProdut = products.find(prod => prod.id === winningBid.product_id)
  findProdut.current_highest_bid = winningBid
  const replaceProducts = products.map(prod => prod.id === findProdut.id ? findProdut : prod)
  setProducts(replaceProducts)
}

function onHandleUpdatingNonWinner(findProduct) {
  fetch(`/products/${findProduct.id}`, {
    method: "DELETE",
  })
  .then(r => {
    if(r.ok) {
      r.json().then(() => handleRemovingProduct(findProduct))
    } else {
      r.json().then(errorData => alert(errorData.error))
    }
  })
}

function handleRemovingProduct(findingProduct) {
  const filteringOutProduct = products.filter(prod => prod.id !== findingProduct.id)
  setProducts(filteringOutProduct)
  navigate('/products-page')
}

 

  return (
    <div className="App">
      <NavBar username={currentUser.username}/>
      <Routes>
        <Route path='/' element={<AboutPage />} />
        <Route path='/profile' element={<UserProfile onHandleLogout={onHandleLogout}/>} />
        <Route path='/bids' element={<CurrentUserBids />} />
        <Route path='/products-page' element={<ProductsPage />} />
        <Route path='/product/new' element={<NewProductForm onHandleCreateProduct={onHandleCreateProduct}/>} />
    <Route path='/product/:id' element={<ViewProduct onHandelCreatingNewComment={onHandelCreatingNewComment} onHandleUpdatingComment={onHandleUpdatingComment} onHandleDelete={onHandleDelete} onHandleUpdatingBid={onHandleUpdatingBid} onHandleCreateBid={onHandleCreateBid} onHandleUpdatingWinningBid={onHandleUpdatingWinningBid} onHandleUpdatingNonWinner={onHandleUpdatingNonWinner}/> }/>
      </Routes>
    </div>
  );
}

export default App;
