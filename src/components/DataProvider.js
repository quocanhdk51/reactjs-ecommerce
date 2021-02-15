import React, {createContext, useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import { getReceiptByUser } from "../services/receipt.service"
export const DataContext = createContext();

export const DataProvider = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const endpoint = "http://localhost:8080/api"

    const [products, setProducts] = useState([])

    const getProduct = () => {
        fetch(endpoint + "/product/all", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                setProducts(result)
            }
        )
    }
    //add cart action
    const [cart, setCart] = useState([])

    const addCart = (id) =>{
        const check = cart.every(item =>{
            return item.id !== id
        })
        if(check){
            const data = products.filter(product =>{
                return product.id === id
            })
            setCart([...cart, ...data])
        }else{
            alert("The product has been added to cart.")
        }
    }

    const [receipts, setReceipts] = useState([]);

    const getReceipt = () => {
        if (user == null) {
            return;
        }
        fetch(endpoint + "/receipt/?user_id=" + user.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.accessToken
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                setReceipts(result)
            }
        )
      }

    const postReceipt = (data, total) => {
        console.log(data)
        if (user == null) {
            alert("need to login first")
            return false;
        }
        fetch(endpoint + "/receipt/?user_id=" + user.id + "&total=" + total, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.accessToken
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(
            (result) => {
                getReceipt();
                return true;
            }
        )
    }

    useEffect(() => {
        getReceipt()
    })

    useEffect(() => {
        getProduct()
    }, [])

    useEffect(() =>{
        const dataCart =  JSON.parse(localStorage.getItem('dataCart'))
        if(dataCart) setCart(dataCart)
     },[])
 
     useEffect(() =>{
         localStorage.setItem('dataCart', JSON.stringify(cart))
     },[cart])


    // const [brand, setBrands] = useState([])
    // const showBrandProduct = (brand) =>{
    //     const data = products.filter(product => {
    //         return product.brand == brand
    //     })
    // }

    

    const value = {
        products: [products, setProducts],
        cart: [cart, setCart],
        addCart: addCart,
        receipts: [receipts, setReceipts],
        postReceipt: postReceipt,
    }

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}
