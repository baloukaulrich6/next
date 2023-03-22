import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'
import axios from "axios"
import styles from './styles.module.scss'
const CARD_OPTIONS = {
    iconStyle: "solid",
    style:{
        base:{
            //iconColor:"#000",
            //color:'#000',
            //fontSize:'16px',
            fontSmoothing:"antialiased",
            //":-wekit-autofill":{color:'#000'},
            //"::placeholder":{color:'#000'},

        },
        invalid:{
            iconColor:"#fd010169",
            color:"#fd010169",

        }
    }
}
export default function Form({total, order_id}) {
    const [error, setError] = useState()
    const stripe = useStripe()
    const elements = useElements()
    const handlerSubmit = async(e) =>{
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        if(!error){
            try{
                const {id} = paymentMethod;
                const res = await axios.post(`/api/order/${order_id}/payWhitStripe`,{
                    amount: total,
                    id,
                });
                if(res.data.success){
                    window.location.reload(false);
                }else{
                    setError(error)
                }
            }catch(error){
                setError(error.message)
            }
        }else{
            setError(error.message)
        }
    }
  return (
    <div className={styles.stripe}>
        <form onSubmit={handlerSubmit}>
            <CardElement options={CARD_OPTIONS}/>
            <button type='submit'>PAY</button>
            {error && <span className={styles.striper__error} >{error}</span>}
        </form>
    </div>
  )
}
