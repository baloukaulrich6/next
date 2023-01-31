import styles from './styles.module.scss'
import { BiRightArrowAlt } from 'react-icons/bi'


export default function CircleIconBtn({type,text,icon}) {
  return (
    <button className={styles.button} type={type}>
        <div className={styles.svg__wrap}>
            <BiRightArrowAlt/>
        </div>
        {text}
    </button>
  )
}
