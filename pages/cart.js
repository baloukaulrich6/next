import Product from "../components/cart/product";
import {useDispatch, useSelector} from "react-redux"
import Empty from "../components/cart/empty";
import Header from "../components/cart/header"
import styles from "../styles/cart.module.scss"
import CartHeader from "../components/cart/cartHeader";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Checkout from "../components/cart/checkout"; 
import PaymentMethods from "../components/cart/paymentMethods";
import ProductsSwiper from "../components/productsSwiper";
import { women_swiper } from "../data/home";
import {saveCard} from "../request/user"
export default function cart() {
  const Router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();


  const [shippingFee, setShippingFee] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [total, setTotal] = useState(0)
  useEffect(()=>{
    setShippingFee(selected.reduce((a, c)=> a + Number(c.shipping ), 0).toFixed(2));
    setSubtotal(selected.reduce((a, c)=> a + c.price * c.qty, 0).toFixed(2))
    setTotal((selected.reduce((a, c)=> a + c.price * c.qty, 0)+ Number(shippingFee)).toFixed(2))
  },[selected])
  const saveCardToDbHandler = async () =>{
    if(session){
      const res = saveCard(selected, );
      Router.push("/checkout")
    }else{
      signIn()
    }
  }
  
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
                    subtotal={subtotal}
                    shippingFree={shippingFee}
                    total={total}
                    selected={selected}
                    saveCardToDbHandler ={saveCardToDbHandler}
                  />
                  <PaymentMethods />
                </div>
            ):(
                <Empty />
            )}
        <ProductsSwiper products={women_swiper}/>
        </div>
    </>
  )
}
