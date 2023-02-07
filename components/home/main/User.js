import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
// import required modules
import { EffectCards, Navigation } from "swiper";
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styles from './styles.module.scss'
import { IoSettingsOutline } from 'react-icons/io5'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { AiOutlineMessage } from 'react-icons/ai'
import { BsHeart } from 'react-icons/bs'
import { userSwiperArray } from '../../../data/home'
export default function User() {
    const {data: session} = useSession()
  return (
    <div className={styles.user}>
        <img src="../../../images/3.jpg" alt='' className={styles.user__header}/>
        <div className={styles.user__container}>
            {
                session ?
                (
                    <div className={styles.user__infos}>
                        <img src={session.user?.image} alt=""/>
                        <h4>{session.user.name}</h4>
                    </div>
                ):(
                <div className={styles.user__infos}>
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt=""/>
                    <div className={styles.user__infos_btns}>
                        <button>Register</button>
                        <button>Login</button>
                    </div>
                </div>
            )}
            <ul className={styles.user__links}>
                <li>
                    <Link href="/profile" legacyBehavior>
                        <a>
                            <IoSettingsOutline/>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="" legacyBehavior>
                        <a>
                            <HiOutlineClipboardList/>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="" legacyBehavior>
                        <a>
                            <AiOutlineMessage/>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="" legacyBehavior>
                        <a>
                            <BsHeart/>
                        </a>
                    </Link>
                </li>
            </ul>
            <div className={styles.user__swiper}>
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    navigation={true}
                    modules={[EffectCards, Navigation]}
                    className="userMenu__swiper"
                    style={{
                        maxWidth: "160px", 
                        height: '250px', 
                        marginTop:'2rem'}}
                >
                    {userSwiperArray.map((item)=>(
                        <SwiperSlide>
                            <Link href=''>
                                <img src={item.image} alt=""/>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    </div>
  )
}
