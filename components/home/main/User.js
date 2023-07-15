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
import { useSession, signIn, signOut } from "next-auth/react"
export default function User() {
    const {data: session} = useSession()
  return ( 
    <div className={styles.user}>
              <img
        src="../../../images/userheader.jpg"
        alt=""
        className={styles.user__header}
      />
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <img src={session.user?.image} alt="" />
            <h4>{session.user.name}</h4>
          </div>
        ) : ( 
          <div className={styles.user__infos}>
            <img
              src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
              alt=""
            />
            <div className={styles.user__infos_btns}>
              <button className={styles.btn_outlined} onClick={()=>signIn()}>Register</button>
              <button className={styles.btn_outlined} onClick={()=>signIn()}>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user__links}>
          <li>
            <Link href="/profile" legacyBehavior>
              <a>
                <IoSettingsOutline />
              </a>
            </Link>
          </li>
          <li>
            <Link href="" legacyBehavior> 
              <a>
                <HiOutlineClipboardList />
              </a>
            </Link>
          </li>
          <li>
            <Link href="" legacyBehavior>
              <a>
                <AiOutlineMessage />
              </a>
            </Link>
          </li>
          <li>
            <Link href="" legacyBehavior>
              <a>
                <BsHeart />
              </a>
            </Link>
          </li>
        </ul>
        <div className={styles.user__swiper}>
          <img
            src="https://assets.stickpng.com/images/5a5a6d2414d8c4188e0b088d.png"
            alt=""
            className={styles.new}
          />
          <Swiper
            effect={"cards"}
            grabCursor={true}
            navigation={true}
            modules={[EffectCards, Navigation]}
            className="user__swiper"
            style={{
              maxWidth: "180px",
              height: "240px",
              marginTop: "1rem",
            }}
          >
            {userSwiperArray.map((item, i) => (
              <SwiperSlide key={i}>
                <Link href="">
                  <img src={item.image} alt="" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <img
        src="../../../images/userheader.jpg"
        alt=""
        className={styles.user__footer}
      />
    </div>
  )
}
