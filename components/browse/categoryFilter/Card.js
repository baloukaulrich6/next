import { useState } from 'react'
import styles from '../styles.module.scss'
import { BsPlusLg } from 'react-icons/bs'
import { FaMinus } from 'react-icons/fa'
export default function Card({category}) {
  const [show, setShow] = useState(true)
  return (
    <>
        <section>
            <li>
                <input type='radio' name='filter' id={category._id}/>
                <label htmlFor={category._id}>
                    <a>{category.name}</a>
                </label>
                <span>{show ? <FaMinus />: <BsPlusLg/>}</span>
            </li>
        </section>
    </>
  )
}
