import React,{useContext, useRef} from 'react'
import './css/Details.css'
import {useParams} from 'react-router-dom'
import {DataContext} from './DataProvider'
import {Link} from 'react-router-dom'

export default function Details() {
    const {id} = useParams()
    const value = useContext(DataContext)
    const [products] = value.products
    const addCart = value.addCart
    
    const imgDiv = useRef();

    const details = products.filter((product, index) =>{
        console.log("here")
        console.log(product.id)
        console.log(id)
        return product.id == id
    })

    const handleMouseMove = e =>{
        const {left, top, width, height} = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        imgDiv.current.style.backgroundPosition = `${x}% ${y}%`
    }

    return (
        <div>
            {
               details.map(product =>(
                   <div className="details" key={product.id}>
                       <div className="img-container" onMouseMove={handleMouseMove}
                       style={{backgroundImage: `url(${product.image})`}} ref={imgDiv} 
                       onMouseLeave={() => imgDiv.current.style.backgroundPosition = `center`} />

                       <div className="box-details">
                           <h2 title={product.title}>{product.title}</h2>
                           <h3>${product.price}</h3>
                           <p>{product.description}</p>
                           <p>{product.content}</p>
                           
                           <Link to="/cart" className="cart" onClick={() => addCart(product.id)}>
                               Add to cart
                            </Link>
                       </div>

                   </div>
               ))
           }
        </div>
    )
}
