import { useState } from 'react'
import Select from './Select'
import styles from './styles.module.scss'

export default function AddReview({product}) {
    const [size, setSize]= useState('')
  return (
    <div className={styles.reviews__add}>
        <div className="flex wrap">
            <div className='flex' style={{gap: "10px"}}>
                size :
                <Select property={size} text= "Size" data={product.allSizes}/>
            </div>
        </div>
    </div>
  )
}
