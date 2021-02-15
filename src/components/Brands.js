import React, {useContext, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {DataContext} from './DataProvider'
import './css/Brands.css'

export default function Brands() {
    // const {brand} = useParams();
    const {brand} = useParams();
    const value = useContext(DataContext)
    const addCart = value.addCart
    const [products] = value.products

    const [search, setSearch]= useState("");

    const result = products.filter((product) =>{
        return product.brand == brand       
    }).filter((product) =>{
        return product.title.toLowerCase().includes(search.toLowerCase()) 
    })


    return(
        <div className="container">
            <div className="form-group row">
                <input className="form-control" type="text" placeholder="Search" onChange={e=> setSearch(e.target.value)}/>
            </div>
            <div className="row">
                {
                    result.map(product =>(
                        <div className="card card-container" key={product.id}>
                            <Link to={`/products/${product.id}`}>
                                <img src={product.image} alt="" />
                            </Link>
                            <div className="box">
                            <h3 title={product.title}>
                                <Link to={`/products/${product.id}`}>{product.title}</Link>
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