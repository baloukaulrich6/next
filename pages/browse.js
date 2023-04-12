import styles from '../styles/browse.module.scss';
import db from "../utils/db"
import Product from "../models/Product"
import Category from "../models/Category"
import SubCategory from "../models/SubCategory"
import ProductCard from '../components/productCard/index'
import Link from 'next/link'
import Header from '../components/header/index'
import { 
    filterArray, 
    removeDuplicates, 
    randomize 
} from '../utils/arrays_utils';
import CategoryFilter from '../components/browse/categoryFilter';
import SizesFilter from '../components/browse/sizeFilter';
import ColoFilter from '../components/browse/colorFilter';
import Brands from '../components/browse/brandsFilter';
import StyleFilter from '../components/browse/styleFilter';
import PatternsFilter from '../components/browse/patternsFilter';
import MaterialsFilter from '../components/browse/materialsFilter';
import GenderFilter from '../components/browse/genderFilter';
import HeadingFilters from '../components/browse/HeadingFilter';
export default function browse({
    categories,
    subCategories, 
    products, 
    sizes, 
    colors,
    brands,
    stylesData,
    patterns,
    materials

}){
    return(
        <div className={styles.browse}>
            <Header country/>
            <div className={styles.browse__container}>
                <div className={styles.browse__path}>
                    Home / Browse
                </div>
                <div className={styles.browse__tags}>
                    {categories.map((c) =>(
                        <Link href="" key={c._id}>
                            <a>{c.name}</a>
                        </Link>
                    ))}
                </div>
                <div className={styles.browse__store}>
                    <div className={`${styles.browse__store_filters} ${styles.scrollbar}`}>
                      <button className={styles.browse__clearBtn}>Clear All (3)</button>  
                      <CategoryFilter 
                            categories={categories}
                            subCategories={subCategories}
                      />
                      <SizesFilter sizes={sizes}/>
                      <ColoFilter colors={colors}/>
                      <Brands brands ={brands}/>
                      <StyleFilter data={stylesData}/>
                      <PatternsFilter patterns={patterns}/>
                      <MaterialsFilter materials={materials}/>
                      <GenderFilter />
                    </div>
                    <div className={styles.browse__store_products_wrap}>
                        <HeadingFilters />
                        <div className={styles.browse__store_products}>
                            {
                                products.map((product) =>(
                                    <ProductCard product={product} key={product._id} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx){
    db.connectDb()
    let productsDb = await Product.find().sort({createdAt: -1}).lean();
    let categories = await  Category.find().lean();
    let products = randomize(productsDb)
    let subCategories = await  SubCategory.find().populate({
        path: "parent",
        model: Category,
    })
    .lean()
    let colors = await Product.find().distinct("subProducts.color.color")
    let brandsDb = await Product.find().distinct('brand');
    let sizes = await Product.find().distinct("subProducts.sizes.size")
    let details = await Product.find().distinct("details")
    let stylesDb = filterArray(details, "Style")
    let patterDb = filterArray(details, "Pattern Type")
    let materialDb = filterArray(details, "Material")
    let styles = removeDuplicates(stylesDb)
    let patterns = removeDuplicates(patterDb)
    let materials = removeDuplicates(materialDb)
    let brands = removeDuplicates(brandsDb)
    return {
        props:{
            categories: JSON.parse(JSON.stringify(categories)),
            subCategories: JSON.parse(JSON.stringify(subCategories)),
            products: JSON.parse(JSON.stringify(products)),
            sizes,
            colors,
            brands,
            stylesData: styles,
            patterns,
            materials
        
        },
    }
}