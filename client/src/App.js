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
          r.json().catch((errorData) => alert(errorData.errors))
      }
  })
  }

  function handleNewProductState(newProductData) {
    // console.log(newProductData.image_url)
    const addingNewProduct = [...products, newProductData]
    setProducts(addingNewProduct)
    navigate('/products-page')
  }

  function onHandelCreatingNewComment(newCommentObj) {
    // console.log(newCommentObj)
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
    // console.log(newCommentData)
    const findingProduct = products.find(prod => prod.id === newCommentData.product_id)
    const updatingProdComments = [...findingProduct.comments, newCommentData]
    const updatingProd = {...findingProduct, comments: updatingProdComments}
    const replacingProd = products.map(prod => prod.id === findingProduct.id ? updatingProd : prod)
    setProducts(replacingProd)

  }

  function onHandleUpdatingComment(comment, id) {
    // console.log(comment)
    // console.log(id)
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
    // console.log(id)
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
    // console.log(id)
    // console.log(product_id)
    const findingProduct = products.find(prod => prod.id === product_id);
    const filterOutComment = findingProduct.comments.filter(comm => comm.id !== id);
    const updatingProduct = {...findingProduct, comments: filterOutComment};
    const replacingProduct = products.map(prod => prod.id === updatingProduct.id ? updatingProduct : prod);
    setProducts(replacingProduct);
  }

  function onHandleSearchCall(searchWord) {
    console.log(searchWord)
    fetch(`/search-products/${searchWord}`)
    .then(r => {
      if(r.ok) {
        r.json().then((productData) => console.log(productData))
      } else {
        r.json().then(errorData => alert(errorData.error))
      }
    })
  }

  function onHandleUpdatingBid (id, bidObj) {
    // console.log(id)
    // console.log(bidObj)
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
    console.log(updatedbid)
    // need to update prod.highest bid
    console.log(products)
    const findProduct = products.find(prod => updatedbid.product_id === prod.id);
    findProduct.current_highest_bid = updatedbid;
    const updatingProducts = products.map(prod => prod.id === findProduct.id ? findProduct : prod);
    console.log(updatingProducts)
    setProducts(updatingProducts)
    console.log(currentUser)
    // need to update currentUser.bids
    const replacingUserBid = currentUser.bids.map(bid => bid.id === updatedbid.id ? updatedbid : bid)

    const findinUserProduct = currentUser.products.find(prod => updatedbid.product_id === prod.id);
    findinUserProduct.current_highest_bid = updatedbid;
    // findinUserProduct.current_highest_bid.bid_amount = updatedbid.bid_amount;
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
  // findProduct.highest_bid = newBid.bid_amount;
  findProduct.current_highest_bid = newBid;
  const replacingProduct = products.map(prod => prod.id === findProduct.id ? findProduct : prod);
  console.log("2", replacingProduct)
  setProducts(replacingProduct);

 console.log("1", currentUser)
  const addBidToBids = [...currentUser.bids, newBid];

  // update current user products highest bid
  // find product
  const findUserProduct = currentUser.products.find(prod => prod.id === newBid.product_id)
  console.log(findUserProduct)
  if (!findUserProduct) {
    const {comments, ...notComments} = findProduct
    const addingProductToUser = [...currentUser.products, notComments];
    const newCurrentUser1 = {...currentUser, bids: addBidToBids, products: addingProductToUser};
    console.log(newCurrentUser1)
    setCurrentUser(newCurrentUser1)
  } else {
     // assign new highest bid
  // findUserProduct.highest_bid = newBid.bid_amount
  findUserProduct.current_highest_bid = newBid
  // add to current user products
  const replacingUserProducts = currentUser.products.map(prod => prod.id === findUserProduct.id ? findUserProduct : prod)
  // replace products in current user object
  const newCurrentUser = {...currentUser, bids: addBidToBids, products: replacingUserProducts};
  console.log("2", newCurrentUser)
  setCurrentUser(newCurrentUser)
  }
}

function onHandleUpdatingWinningBid(winningBid) {
  console.log(winningBid)
  const updatingBids = currentUser.bids.map(bid => bid.id === winningBid.id ? winningBid : bid)
  const updatingUser = {...currentUser, bids: updatingBids}
  setCurrentUser(updatingUser)
  console.log(currentUser)

  // fix product state 
  // find product
  const findProdut = products.find(prod => prod.id === winningBid.product_id)
  // set current_highest_bid to winning bid
  findProdut.current_highest_bid = winningBid
  // replace products
  const replaceProducts = products.map(prod => prod.id === findProdut.id ? findProdut : prod)
  // set in state
  setProducts(replaceProducts)
  console.log(products)
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
        <Route path='/products-page' element={<ProductsPage onHandleSearchCall={onHandleSearchCall}/>} />
        <Route path='/product/new' element={<NewProductForm onHandleCreateProduct={onHandleCreateProduct}/>} />
    <Route path='/product/:id' element={<ViewProduct onHandelCreatingNewComment={onHandelCreatingNewComment} onHandleUpdatingComment={onHandleUpdatingComment} onHandleDelete={onHandleDelete} onHandleUpdatingBid={onHandleUpdatingBid} onHandleCreateBid={onHandleCreateBid} onHandleUpdatingWinningBid={onHandleUpdatingWinningBid} onHandleUpdatingNonWinner={onHandleUpdatingNonWinner}/> }/>
      </Routes>
    </div>
  );
}

export default App;
