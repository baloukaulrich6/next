import { Rating } from '@mui/material'
import styles from './styles.module.scss'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {useEffect, useState} from "react"
import {TbMinus, TbPlus} from "react-icons/tb"
import {BsHandbagFill, BsHeart} from "react-icons/bs"
import Share from "./share"
import Accordian from './Accordian'
import SimillarSwiper from './SimillarSwiper'


export default function Infos({product, setActiveImg}) {
    const router = useRouter()
    const [size, setSize] = useState(router.query.size)
    const [qty, setQty] = useState(1)
    useEffect(()=>{
        setSize("");
        setQty(1);
    },[router.query.style])
    useEffect(()=>{
        if(qty > product.quantity){
            setQty(product.quantity)
        }
    }, [router.query.size])
  return (
    <div className={styles.infos}>
        <div className={styles.infos__container}>
            <h1 className={styles.infos__name}>{product.name} </h1>
            <h2 className={styles.infos__sku}>{product.shu} </h2>
            <div className={styles.infos__rating}>
                <Rating 
                name= "half-rating-react"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
                style={{color:"#E67A00"}}
                />
                ({product.numReviews}
                {product.numReviews == 1 ? "review" : "review"})
            </div>
            <div className={styles.infos__price}>
                {! size ? (
                    <h2>{product.priceRange}</h2>
                    ) : (
                        <h1>{product.price}</h1>
                    )}
                    {product.discount > 0 ? (
                        <h3>
                            {size && <span>{product.priceBefore} FCFA</span>}
                            <span>( - {product.discount}%)</span>
                        </h3>) : (
                            " "
                            )
                    }
            </div>
            <span className ={styles.infos__shipping}>
                 {
                    product.shipping ?`+ ${product.shipping} FCFA Shipping free`: "Free Shipping" 
                 }
            </span>
            <span>
                {size 
                 ? product.quantity 
                 : product.sizes.reduce((start, next) => start + next.qty, 0)
                }pieces available
            </span>
            <div className = {styles.infos__size}>
                <h4>Select a Size :</h4>
                <div className={styles.infos__sizes_wrap}>
                    {product.sizes.map((size, i)=>(
                        <Link href= {`/product/${product.slug}?style=${router.query.style}&size=${i}`}>
                            <div className={`${styles.infos__sizes_size} ${i == router.query.size && styles.active_size}`}
                            onClick={()=>setSize(size.size)}>{size.size}</div>
                        </Link>
                    ))}
                </div>

            </div>
            <div  className={styles.infos__colors}>
                {product.colors && product.colors.map((color, i) =>(
                    <span className={i == router.query.style ? styles.active_color : ""}
                    onMouseOver ={()=> setActiveImg(product.subProducts[i].images[0].url)}
                    onMouseLeave ={()=> setActiveImg("")}>
                        <Link href={`/product/${product.slug}?style=${i}`}>
                            <img src={color.image} />
                        </Link>
                    </span>
                ))}
            </div>
            <div className = {styles.infos__qty}>
                <button 
                onClick={()=>qty > 1 && setQty((prev) => prev - 1 )}>
                    <TbMinus/>
                </button>
                <span>{qty}</span>
                <button 
                onClick={()=>qty < product.quantity && setQty((prev) => prev + 1 )}>
                    <TbPlus/>
                </button>
            </div>
            <div className={styles.infos__actions}>
                <button 
                disabled={product.quantity < 1 }
                style={{cursor: `${product.quantity < 1 ? "not-allowed": ""}`}} >
                    <BsHandbagFill />
                    <b>ADD TO CART</b>
                </button>
                <button>
                    <BsHeart />
              
                </button>
            </div>
            <Share />
            <Accordian details={[product.description, ...product.details]} />
            <SimillarSwiper />
        </div>
    </div>
  )
}