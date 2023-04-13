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
import { useRouter } from 'next/router';
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
    const router = useRouter()
    const filter= ({search,category, brand, style}) =>{
        const path = router.pathname;
        const {query} = router
        if(search) query.search = search
        if(category) query.category = category
        if(brand) query.brand = brand
        if(style) query.style = style
        router.push({
            pathname: path,
            query: query
        });
    }
    const searchHandler = (search) =>{
        if(search == ""){
            filter({search: {}})
        }else{
            filter({search})
        }
        
    } 
    const categoryHandler = (category) =>{
        filter({category})
        
    }
    const brandHandler = (style) =>{
        filter({style})
        
    }
    const styleHandler = (brand) =>{
        filter({brand})
        
    }
    return(
        <div className={styles.browse}>
            <Header country searchHandler={searchHandler}/>
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
                            categoryHandler = {categoryHandler}
                      />
                      <SizesFilter sizes={sizes}/>
                      <ColoFilter colors={colors}/>
                      <Brands brands ={brands} brandHandler={brandHandler}/>
                      <StyleFilter data={stylesData} styleHandler={styleHandler}/>
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
    const {query} = ctx
    //---------------------------------------------------------->
    const searchQuery = query.search || ""
    const categoryQuery = query.category || ""
    const brandQuery = query.brand || ""
    const styleQuery = query.style.split("_") || ""
    //---------------------------------------------------------->
    const search = searchQuery && searchQuery !== "" ? {
        name : {
        $regex: searchQuery,
        $options: "i"
    }
    }:{}
    const category = categoryQuery && categoryQuery !== "" ? {
        category : categoryQuery
    }: {}
    const brand = brandQuery && brandQuery !== "" ? {
        brand : brandQuery
    }: {}
    const style = styleQuery && styleQuery !== "" ? {
        "details.value" : {
        $regex: styleQuery,
        $options: "i"
    }
    }:{}

    //---------------------------------------------------------->

    //---------------------------------------------------------->

    
    db.connectDb()
    let productsDb = await Product.find({
        ...search, 
        ...category, 
        ...brand,
        ...style
    }).sort({createdAt: -1}).lean();
    let categories = await  Category.find().lean();
    let products = randomize(productsDb)
    let subCategories = await  SubCategory.find().populate({
        path: "parent",
        model: Category,
    })
    .lean()
    let colors = await Product.find({...category}).distinct("subProducts.color.color")
    let brandsDb = await Product.find({...category}).distinct('brand');
    let sizes = await Product.find({...category}).distinct("subProducts.sizes.size")
    let details = await Product.find({...category}).distinct("details")
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