import Product from "../components/cart/product";
import {useDispatch, useSelector} from "react-redux"
import Empty from "../components/cart/empty";
import Header from "../components/cart/header"
import styles from "../styles/cart.module.scss"
import CartHeader from "../components/cart/cartHeader";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Checkout from "../components/cart/checkout"; 
export default function cart() {
  const Router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  useEffect(()=>{

  },[])
  console.log("select", selected)
  
  return (
    <>
        <Header country={{
          name: "Cameroun",
          flag: "https://cdn.ipregistry.co/flags/emojitwo/cm.svg",
        }}/>
        <div className={styles.cart}>
            {cart.cartItems.length > 0 ? (
                <div className={styles.cart__container}>
                  <CartHeader 
                    cartItems={cart.cartItems} 
                    className={cart.cartItems}
                    selected={selected}
                    setSelected={setSelected}/>
                 <div className={styles.cart__products}> {
                  cart.cartItems.map((product)=>(
                    <Product 
                      product={product} 
                      key={product._uid} 
                      selected={selected}
                      setSelected={setSelected}/>
                  ))
                  }</div>
                  <Checkout 
                    subtotal="5000"
                    shippingFree={0}
                    total="5000"
                    selected={[]}/>
                </div>
            ):(
                <Empty />
            )}
        </div>
    </>
  )
}
