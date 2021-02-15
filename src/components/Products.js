import React, {useContext,useState} from 'react'
import './css/Products.css'
import {DataContext} from '../components/DataProvider'
import {Link} from 'react-router-dom'

export default function Products() {
    const value = useContext(DataContext)
    const [products] = value.products
    const addCart = value.addCart
    const [search, setSearch]= useState("");

    const result = products.filter((product) =>{
        return product.title.toLowerCase().includes(search.toLowerCase()) 
    })


    return (
        <div className="container">
            <div className="form-group row">
                <input className="form-control" type="text" placeholder="Search" onChange={e=> setSearch(e.target.value)}/>
            </div>
            <div className="row">
                {
                    result.map(product =>(
                        <div className="card card-container" key={product.id}>
                            <Link to={`/products/id/${product.id}`}>
                                <img src={product.image} alt="" />
                            </Link>
                            <div className="box">
                            <h3 title={product.title}>
                                <Link to={`/products/id/${product.id}`}>{product.title}</Link>
                            </h3>
                            <p>{product.description}</p>
                            <h4>${product.price}</h4>
                            <button onClick={() => addCart(product.id)}>
                                Add to cart
                            </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}