import styles from "../../../../styles/products.module.scss";
import Layout from "../../../../components/admin/layout/index";
import db from "../../../../utils/db";
import Product from "../../../../models/Product";
import Category from "../../../../models/Category";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SingularSelect from "../../../../components/selected/SingularSelect";
import MultipleSelect from "../../../../components/selected/MultipleSelect";
import AdminInput from "../../../../components/inputs/adminInput/index";
import Images from "../../../../components/admin/createProduct/images";
import Colors from "../../../../components/admin/createProduct/colors";
import Style from "../../../../components/admin/createProduct/style";
import Sizes from "../../../../components/admin/createProduct/clickToAdd/Sizes";
import Details from "../../../../components/admin/createProduct/clickToAdd/Details";
import Questions from "../../../../components/admin/createProduct/clickToAdd/Questions";
import { showDialog } from "../../../../store/DialogSlice";
import { validateCreateProduct } from "../../../../utils/validation";
import { useDispatch } from "react-redux";
import DialogModal from "../../../../components/dialogModal";
const initialState = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  discount: 0,
  images: [],
  description_images: [],
  parent: "",
  category: "",
  subCategories: [],
  color: {
    color: "",
    image: "",
  },
  sizes: [
    {
      size: "",
      qty: "",
      price: "",
    },
  ],
  details: [
    {
      name: "",
      value: "",
    },
  ],
  questions: [
    {
      question: "",
      answer: "",
    },
  ],
  shippingFee: "",
};
export default function create({ categories, parents }) {
  const [product, setProduct] = useState(initialState);
  const [subs, setSubs] = useState([]);
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState("");
  const [description_images, setDescription_images] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    const getParentData = async () => {
      const { data } = await axios.get(`/api/product/${product.parent}`);
      if (data) {
        setProduct({
          ...product,
          name: data.name,
          description: data.description,
          brand: data.brand,
          category: data.category,
          subCategory: data.subCategory,
          question: [],
          details: [],
        });
      }
    };
    getParentData();
  }, [product.parent]);
  useEffect(() => {
    async function getSubs() {
      const { data } = await axios.get("/api/admin/subCategory", {
        params: {
          category: product.category,
        },
      });
      setSubs(data);
    }
    getSubs();
  }, [product.category]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const validate = Yup.object({
    name: Yup.string()
    .required('Please Add a name')
    .min(4, "product name must beateen and 5 and 300 characters.")
    .max(300, "product name must beateen and 5 and 300 characters.")
    .min(10, "product name must beateen and 5 and 300 characters."),
    brand: Yup.string().required('Please Add a brand'),
    category: Yup.string().required('Please Add a category'),
    subCategories: Yup.array().min(1,'Please select atleast one sub Categories'),
    sku: Yup.string().required('Please Add a sku / number'),
    color: Yup.string().required('Please Add a color'),
    description: Yup.string().required('Please Add a description'),
  });
  const createProduct = async () => {};
 
  return (
    <Layout>
      <div className={styles.header}>Create Product</div>
      <Formik
        enableReinitialize
        initialValues={{
          name: product.name,
          brand: product.brand,
          description: product.description,
          category: product.category,
          subCategories: product.subCategories,
          parent: product.parent,
          sku: product.sku,
          discount: product.discount,
          color: product.color,
          imageInputFile: "",
          stylesInput: "",
        }}
        validationSchema={validate}
        onSubmit={() => {
          createProduct();
        }}
      >
        {(formik) => (
          <Form>
             <Images  
            name = "imageInputFile"
            header=" Product Carousel Image"
            text= "Add images"
            images={images}
            setImages= {setImages}
            setColorImage= {setColorImage}
          /> 
            <div className={styles.flex}>
              {product.color.image && (
                <img
                  src={product.color.image}
                  className={styles.image_span}
                  alt=""
                />
              )}
              {product.color.color && (
                <span
                  className={styles.color_span}
                  style={{ background: `${product.color.color}` }}
                ></span>
              )}
            </div>
             <Colors
              name= "color"
              product = {product}
              setProduct={setProduct}
              colorImage={colorImage}  
            /> 
            <Style
              name= "styleInput"
              product = {product}
              setProduct={setProduct}
              colorImage={colorImage}  
            />
           
              <SingularSelect
                name="parent"
                value={product.parent}
                placeholder="parent product"
                data={parents}
                header="Add to an existing product"
                handleChange={handleChange}
              />
              <SingularSelect
                name="category"
                value={product.category}
                placeholder="Category"
                data={categories}
                header="Select a Category"
                handleChange={handleChange}
                disabled={product.parent}
              />
              {product.category && (
                <MultipleSelect
                  value={product.subCategories}
                  data={subs}
                  header="Select SubCategories"
                  name="SubCategories"
                  disabled={product.parent}
                  handleChange={handleChange}
                />
              )}
              <div className={styles.header}>Basic Infos</div>
              <AdminInput
                types="text"
                label="Name"
                name="name"
                placeholder="Product name"
                OnChanges={handleChange}
              />
              <AdminInput
                types="text"
                label="Description"
                name="description"
                placeholder="Product description"
                OnChanges={handleChange}
              />
              <AdminInput
                types="text"
                label="Brand"
                name="brand"
                placeholder="Product Brand"
                OnChanges={handleChange}
              />
              <AdminInput
                types="text"
                label="Sku"
                name="sku"
                placeholder="Product Sku / number"
                OnChanges={handleChange}
              />
              <AdminInput
                types="text"
                label="Discount"
                name="discount"
                placeholder="Product Discount"
                OnChanges={handleChange}
              />
          {/* <Images  
                name = "imageDescInputFile"
                header=" Product Description Image"
                text= "Add images"
                images={description_images}
                setImages= {setDescription_images}
                setColorImage= {setColorImage}
              /> 
              <Sizes  
                sizes= {product.sizes}
                product= {product}
                setProduct={setProduct}
              />
              <Details  
                sizes= {product.details}
                product= {product}
                setProduct={setProduct}
              />
              <Questions  
                sizes= {product.questions}
                product= {product}
                setProduct={setProduct}
              />
          */}
            <button className={styles.btn} types="submit">Create Product</button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(prox) {
  db.connectDb();
  const results = await Product.find().select("name subProduct").lean();
  const categories = await Category.find().lean();
  db.disconnectDb();
  return {
    props: {
      parents: JSON.parse(JSON.stringify(results)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
