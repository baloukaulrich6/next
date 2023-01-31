
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Header from '../components/header'
import Footer from '../components/footer'
import axios from 'axios'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home({country}) {
  const { data: session } = useSession()
  return (
  <div>
    <Header country={country}/>
    <Footer country={country}/>
  </div>
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
