import { useState } from "react"
import styles from "./styles.module.scss"
import * as Yup from "yup"
import { Form, Formik } from "formik"
import ShippingInput from "@/components/inputs/shippingInput"

export default function Summary({
totalAfterDiscount,
setTotalAfterDiscount,
paymentMethod,
selecteAddress,
cart,
user
}) {
    const [coupon, setCoupon] = useState("")
    const [discount, setDiscount] = useState("")
    const [error, setError] = useState("")
    const validationCoupon = Yup.object({
        coupon : Yup.string().required("Please entre a coupon first !")
    })
    const applyCouponHandler = async () =>{}
    const placeOrderHandler  = async () =>{}
    return (
    <div className={styles.Summary}>
        <div className={styles.header}>
            <h3>Order Summary</h3>
        </div>
        <div className={styles.coupon}>
            <Formik
                enableReinitialize
                initialValues={{coupon}}
                validationSchema={validationCoupon}
                onSubmit= {()=>{
                    applyCouponHandler()
                }}
                >
                {
                    (formik) =>(
                        <Form>
                            <ShippingInput
                                name ="coupon"
                                placeholder="coupon"
                                onChange={(e)=>setCoupon(e.target.value)}/>
                                <button className={styles.apply_btn} type="submit">Apply</button>
                                <div className={styles.infos}>
                                    <span>
                                        Total : <b>{cart.cartTotal}</b>
                                    </span>
                                    {discount > 0 && (
                                        <span className={styles.discount}>
                                            Coupon applied : <b>-{discount}%</b>
                                        </span>
                                    )}
                                    {totalAfterDiscount < cart.cartTotal && totalAfterDiscount != "" && (
                                        <span>
                                            New price : <b>{totalAfterDiscount}FCFA</b>
                                        </span>
                                    )}
                                </div>
                        </Form>
                    )
                }
                </Formik>
        </div>
        <button 
        className={styles.submit_btn}
        onClick={() =>{placeOrderHandler()}}>Place Order</button>
    </div>
  )
}
