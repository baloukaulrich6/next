import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Header from '../components/header'
import Footer from '../components/footer'
import axios from 'axios'
import { useSession, signIn, signOut } from "next-auth/react"
import Main from '../components/home/main'
import FlashDeals from '../components/home/flashDeals'
import Category from '../components/home/category'
import { gamingSwiper, homeImprovSwiper, women_accessories, women_dresses, women_shoes, women_swiper } from '../data/home'
import { useMediaQuery } from "react-responsive";
import ProductsSwiper from '../components/productsSwiper'
export default function Home({country}) {
  const isMedium = useMediaQuery({query:"(max-width:850px)"})
  const isMobile = useMediaQuery({query:"(max-width:550px)"})
  const { data: session } = useSession()
  return (
  <>
    <Header country={country}/>
    <div className={styles.home}>
      <div className={styles.container}>
        <Main  />
        <FlashDeals />
        <div className={styles.home__category}>
          <Category 
            header="Dresses" 
            products={women_dresses} 
            background="#E67A00"/>
         { ! isMedium && 
         (<Category 
            header="Shoes/ High Heels" 
            products={women_shoes} 
            background="#5a31f4"/>)}
          { isMobile && 
         (<Category 
            header="Shoes/ High Heels" 
            products={women_shoes} 
            background="#5a31f4"/>)}
            
          <Category 
            header="Accessories" 
            products={women_accessories} 
            background="#000"/>
        </div>
        <ProductsSwiper products={women_swiper}/>
        <ProductsSwiper products={gamingSwiper} header="For Gamers"/>
        <ProductsSwiper products={homeImprovSwiper} header="House Improvement" bg="#000"/>
      </div>
    </div>
    <Footer country={country}/>
  </>
  )
}
export async function getServerSideProps(){
  let data = await axios.get("https://api.ipregistry.co/?key=brrjx68hmpvjdbg4").then((res)=>{
    console.log(res.data.location.country)
  return res.data.location.country;

}).catch((err)=>{
  console.log(err);
})

return{
  props:{
    country: {name: data.name, flag: data.flag.emojitwo},
  },
};

}
