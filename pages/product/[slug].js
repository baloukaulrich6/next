import styles from "../../styles/product.module.scss";
import db from "../../utils/db";
import Product from "../../models/Product";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Category from "../../models/Category";
import SubCategory from "../../models/SubCategory";
import MainSwiper from "../../components/productPage/MainSwiper";
import { useState } from "react";
import Infos from "../../components/productPage/infos";
import Reviews from "../../components/productPage/reviews";
import User from "../../models/User";
export default function product({ product }) {
    const [activeImg, setActiveImg] = useState("")
  return (
    <div>
      <Head>
        <title>{product.name}</title>
      </Head> 
      <Header country = "Cameroun" />
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            Home / {product.category.name}
            {product.subCategories.map((sub) => (
              <span>/{sub.name}</span>
            ))}
          </div>
          <div className={styles.product__main}>
                <MainSwiper images={product.images} activeImag={activeImg} />
                <Infos product={product} setActiveImg={setActiveImg} />
          </div>
          <Reviews product={product}/>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const style = query.style;
  const size = query.size || 0;
  db.connectDb();
  //---------------
  let product = await Product.findOne({ slug })
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories._id", model: SubCategory })
    .populate({ path: "reviews.reviewBy", model: User })
    .lean();
    let subProduct = product.subProducts[style];
    let prices = subProduct.sizes
    .map((s) => {
      return s.price;
    })
    .sort((a, b) => {
      return a - b;
    });
  let newProduct = {
    ...product,
    style, 
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map((p) => {
      return p.color;
    }),
    priceRange:
      subProduct.discount
      ? `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(2)} to ${(
        prices[prices.length - 1] -
        prices[prices.length - 1] / subProduct.discount
      ).toFixed(2)} FCFA`
      :`From ${prices[0]} to ${prices[prices.length - 1]} FCFA`, 
    price:
      subProduct.discount > 0
        ? (
            subProduct.sizes[size].price -
            subProduct.sizes[size].price / subProduct.discount
          ).toFixed(2)
        : subProduct.sizes[size].price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
    ratings:[
      {
        "percentage": 76,
      },
      {
        "percentage": 14,
      },
      {
        "percentage": 6,
      },
      {
        "percentage": 4,
      },
      {
        "percentage": 0,
      },
    ],
    allSizes : product.subProducts.map((p) =>{
      return p.sizes
    }).flat().sort((a, b)=>{
      return a.size - b.size 
    }).filter((element, index, array)=>array.findIndex((el2)=>el2.size === element.size) === index),
  };
  //---------------
  db.disconnectDb();
  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}
