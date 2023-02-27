
import Order from "../../models/Order";
import User from "../../models/User";
import Header from "../../components/header"
import styles from "../../styles/order.module.scss"
import { IoIosArrowForward } from "react-icons/io";
import db from "../../utils/db";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useReducer,useEffect } from "react";

function reducer(state, action){
    switch (action.type){
        case "PAY_REQUEST":
        return {...state, loading :true}
        case "PAY_SUCCESS":
        return {...state, loading :false , success : true}
        case "PAY_FAIL":
        return {...state, loading :false, error: action.payload}
        case "PAY_RESET":
        return {...state, loading :false, success: false, error: false}
    }
}
export default function order({orderData, paypal_client_id}){
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    console.log(paypalDispatch)
    const [{loading, error, success}, dispatch] = useReducer( reducer, {
        loading: true,
        order: {},
        error: ""
    })
    useEffect(()=>{
        if(!orderData._id || success){
            if(success){
                dispatch({
                    type: "PAY_RESET",
                })
            }
        }else{
            paypalDispatch({
                type: "resetOptions",
                value:{
                    "client-id": paypal_client_id,
                    currency: "USD"
                }
            });
            paypalDispatch({
                type: "setLoadingStatus",
                value: 'pending'

            })
        }
    }, [order, success])
    function createOrderHandler(){}
    function onApproveHandler(){}
    function onErrorHandler(){}

    return(
        <>
        <Header country={{
          name: "Cameroun",
          flag: "https://cdn.ipregistry.co/flags/emojitwo/cm.svg",
        }}/>
        <div className={styles.order}>
            <div className={styles.container}>
                <div className={styles.order__infos}>
                    <div className={styles.order__header}>
                        <div className={styles.order__header_head}>
                            Home <IoIosArrowForward /> Orders <IoIosArrowForward/>
                            ID{orderData._id}
                        </div>
                        <div className={styles.order__header_status}>
                            Payment Status: {
                                !orderData.isPaid ? ( <img src="../../../images/verified.png" alt="paid"/>
                            ) : (<img src="../../../images/unverified.png" alt="paid"/>)}
                        </div>

                        <div className={styles.order__header_status}>
                            Order Status : <span
                            className={
                            orderData.status == "Not Processed" ? styles.not_processed 
                            : orderData.status == "Processing"
                            ? styles.processing
                            : orderData.status == "Dispatched"
                            ? styles.dispatched
                            : orderData.status == "Cancelled"
                            ? styles.cancelled
                            : orderData.status == "Completed"
                            ? styles.completed
                            : ""
                          
                            }>
                                {orderData.status}
                            </span>
                        </div>

                    </div>
                    <div className={styles.order__products}>
                        {orderData.products.map((product)=>(
                            <div className={styles.product} key={product.id}>
                                <div className={styles.product__img}>
                                    <img src={product.image} alt={product.name}/>
                                </div>
                                <div className={styles.product__infos}>
                                    <h1 className={styles.product__infos_name}>
                                        {product.name.length > 30 ?
                                        `${product.name.substring(0, 30)}...`: 
                                        product.name}
                                    </h1>
                                    <div className={styles.product__infos_style}>
                                        <img src={product.color.image} alt=""/> 
                                        /{product.size}
                                    </div>
                                    <div className={styles.product__infos_priceQty}>
                                            {product.price} FCFA x {product.qty}
                                    </div>
                                    <div className={styles.product__infos_total }>
                                    {(product.price * product.qty).toFixed(2)}FCFA
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className={styles.order__products_total}>
                            {orderData.couponApplied ? 
                           ( <>
                            <div className={styles.order__products_total_sub}>
                                <span>SubTotal</span>
                                <span>{orderData.totalBeforeDiscount}FCFA</span>
                            </div>
                            <div className={styles.order__products_total_sub}>
                                <span>Coupon Applied <em>{orderData.couponApplied}</em></span>
                                <span>-{(orderData.totalBeforeDiscount - orderData.total).toFixed(2)}FCFA</span>
                            </div>
                            <div className={styles.order__products_total_sub}>
                                <span>Tax price</span>
                                <span>+{orderData.taxPrice}FCFA</span>
                            </div>
                            <div className={`${styles.order__products_total_sub} ${styles.bordertop}`}>
                                <span>TOTAL TO PAY</span>
                                <b>{orderData.total}FCFA</b>
                            </div>
                            </>) : ( 
                            <>
                            <div className={styles.order__products_total_sub}>
                                <span>Tax price</span>
                                <span>+{orderData.taxPrice}FCFA</span>
                            </div>
                            <div className={`${styles.order__products_total_sub} ${styles.bordertop}`}>
                                <span>TOTAL TO PAY</span>
                                <b>{orderData.total}FCFA</b>
                            </div>
                            </> )}
                        </div>
                    </div>
                </div>
                <div className={styles.order__actions}>
                    <div className={styles.order__address}>
                        <h1>Customer's Order</h1>
                        <div className={styles.order__address_user}>
                                <div className={styles.order__address_user_infos}>
                                    <img src={orderData.user.image} />
                                    <div>
                                        <span>{orderData.user.name}</span>
                                        <span>{orderData.user.email}</span>
                                    </div>
                                </div>
                        </div>
                        <div className={styles.order__address_shipping}>
                            <h2>Shipping Address</h2>
                            <span>
                                {orderData.shippingAddress.firstName}
                                {orderData.shippingAddress.lastName}
                            </span>
                            <span>{orderData.shippingAddress.address1}</span>
                            <span>{orderData.shippingAddress.state},{orderData.shippingAddress.city}
                            </span>
                            <span>{orderData.shippingAddress.zipCode}</span>
                            <span>{orderData.shippingAddress.country}</span>
                        </div>
                        <div className={styles.order__address_shipping}>
                            <h2>Billing Address</h2>
                            <span>
                                {orderData.shippingAddress.firstName}
                                {orderData.shippingAddress.lastName}
                            </span>
                            <span>{orderData.shippingAddress.address1}</span>
                            <span>{orderData.shippingAddress.state},{orderData.shippingAddress.city}
                            </span>
                            <span>{orderData.shippingAddress.zipCode}</span>
                            <span>{orderData.shippingAddress.country}</span>
                        </div>
                    </div>
                    <div className={styles.order__payment}>
                          { isPending ?( <span>loading...</span> ):
                                 (<PayPalButtons 
                                createOrder={createOrderHandler}
                                onApprove={onApproveHandler}
                                onError={onErrorHandler}>
                                </PayPalButtons>) }
                    </div>
                </div>
            </div>
        </div>
      
        </>
    )
}

export async function getServerSideProps(context){
    db.connectDb()
    const {query} = context;
    const id = query.id;
    const order = await Order.findById(id)
    .populate({ path: "user", model: User })
    .lean();
    let paypal_client_id = process.env.PAYPAL_CLIENT_ID;
   
    db.disconnectDb()
    return{
        props:{
            orderData: JSON.parse (JSON.stringify(order)),
            paypal_client_id, 
        }
    }
}