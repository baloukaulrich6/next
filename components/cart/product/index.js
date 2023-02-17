import styles from "./styles.module.scss"
import {BsHeart} from "react-icons/bs"
import {AiOutlineDelete} from "react-icons/ai"
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'
import {useSelector, useDispatch} from "react-redux"
import {updateCart} from "../../../store/cartSlice"

export default function Product({product}) {
    const {cart} = useSelector((state)=>({...state}))
    const dispatch = useDispatch()
    const updateQty = (type)=>{
        let newCart = cart.cartItems.map((p)=>{
            if(p._uid == product._uid){
                return{
                    ...p,
                    qty: type == 'plus'? product.qty + 1 : product.qty - 1,
                }
            }
            return p
        })
        dispatch(updateCart(newCart))
    }
    const removeProduct = (id)=>{
        let newCart = cart.cartItems.filter((p)=>{
            return p._uid != id;
        })
        dispatch(updateCart(newCart))
    }
  return (
    <div className={`${styles.card} ${styles.product}`}>
        {product.quantity < 1 && <div className={styles.blur}></div>}
        <div className={styles.product__header}>
            <img src="../../../images/store.webp" alt=""/>
            BLEASY Official Store
        </div>
        <div className ={styles.product__image}>
            <div className={styles.checkBox}></div>
            <img src ={product.images[0].url} alt="" />
            <div className={styles.col}>
                <div className={styles.grid}>
                    <h1>
                        {
                            product.name.length > 30 ?
                            `${product.name.substring(0, 30)}`
                            : product.name
                        }
                    </h1>
                    <div className={{zIndex: '2'}}>
                        <BsHeart />
                    </div>
                    <div className={{zIndex: '2'}} onClick={() => removeProduct(product._uid)}>
                        <AiOutlineDelete />
                    </div>
                </div>
                <div className={styles.product__style}>
                    <img src ={product.color.image} alt=""/>
                    {product.size && <span>{product.size}</span>}
                    {
                        product.price &&
                        <span>{product.price.toFixed(2)}</span>
                    }
                    <MdOutlineKeyboardArrowRight />
                </div>
                <div className={styles.product__priceQty}>
                    <div className={styles.product__priceQty_price}>
                        <span className={styles.price}>
                            {(product.price * product.qty).toFixed(2)}FCFA
                        </span>
                        {
                            product.price !== product.priceBefore &&(
                            <span className ={styles.priceBefore}>
                                {product.priceBefore}FCFA
                            </span>
                        )}
                        {
                            product.discount > 0 && (
                                <span className={styles.discount}>-{product.discount}%</span>
                            )
                        }
                    </div>
                    <div className={styles.product__priceQty_qty}>
                        <button disabled={product.qty < 2} onClick={()=>updateQty("minus")}>-</button>
                        <span>{product.qty}</span>
                        <button disabled={product.qty==product.quantity} onClick={()=>updateQty("plus")}>+</button>
                    </div>
                </div>
                <div className={styles.product__shipping}>
                    {product.shipping ?
                    `+${product.shipping}FCFA shipping fee` : "Free Shipping"}
                </div>
                {
                    product.quantity < 1 && 
                    <div className={styles.notAvailable}>
                        This product is out stock, add it to you whishlist it may get restocked.
                    </div>
                }
            </div>
        </div>
    </div>
  )
}
