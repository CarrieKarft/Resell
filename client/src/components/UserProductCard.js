import React, {useState} from "react";
import UpdateProduct from './UpdateProduct'

function UserProductCard({prod, onHandleUpdateProduct, onHandleProductDelete}) {
    const [selected, setSelected] = useState(false)
    const {product_name, description, image_url} = prod
    return (
        <div className="productCard">
            <h2>{product_name}</h2>
            <img src={image_url} alt={product_name} className="productImage"/>
            <p>{description}</p>
            <button onClick={() => onHandleProductDelete(prod.id)}>Delete Product</button>
            <button onClick={() => setSelected(!selected)}>Edit Product</button>
            <div style={{display: selected ? null : "none"}}>
            <UpdateProduct setSelected={setSelected} prod={prod} onHandleUpdateProduct={onHandleUpdateProduct}/>
            </div>
        </div>
    )
}

export default UserProductCard;