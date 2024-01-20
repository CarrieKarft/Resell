import React, {useContext} from 'react';
import ProductsPage from './components/ProductsPage';
import NewProductForm from './components/NewProductForm';
import {ProductsContext} from './context/ProductsContext'



function App() {
  const {setProducts} = useContext(ProductsContext);
  
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
    <div className="App">
      <ProductsPage />
      <NewProductForm onHandleCreateProduct={onHandleCreateProduct}/>
    </div>
  );
}

export default App;
