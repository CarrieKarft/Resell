import {useState, useEffect, createContext} from 'react';

const ProductsContext = createContext();

function ProductsProvider({ children }) {
    const [products, setProducts] = useState([])


    useEffect(() => {
      fetch('/products')
      .then((r) => {
          if(r.ok) {
              r.json().then((productsData) => setProducts(productsData))
          } else {
              r.json().catch((errorData) => alert(errorData.errors))
          }
      })
    }, [])

    return <ProductsContext.Provider value={{products, setProducts}}>{children}</ProductsContext.Provider>;
}

export { ProductsContext, ProductsProvider };