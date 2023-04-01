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
//import Images from "../../../../components/admin/createProduct/images";
//import Colors from "../../../../components/admin/createProduct/colors";
//import Style from "../../../../components/admin/createProduct/style";
//import Sizes from "../../../../components/admin/createProduct/clickToAdd/Sizes";
//import Details from "../../../../components/admin/createProduct/clickToAdd/Details";
//import Questions from "../../../../components/admin/createProduct/clickToAdd/Questions"
//import { showDialog } from "../../../../store/DialogSlice";
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
  const [image, setImage] = useState("");
  const [description_images, setDescription_images] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(product);
  useEffect(() => {
    const getParentData = async () => {
      try {
        const { data } = await axios.get(`/api/product/${product.parent}`);
        console.log(data);
        if (data) {
          setProduct({
            ...product,
            name: data.name,
            description: data.description,
            brand: data.brand,
            category: data.category,
            subCategories: data.subCategories,
            questions: [],
            details: [],
          });
        }
      } catch (error) {
        console.error(error);
        alert("Une erreur s'est produite lors de la récupération des données");
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
  const validate = Yup.object({
    name: Yup.string()
      .required("Please add a name")
      .min(10, "Product name must bewteen 10 and 300 characters.")
      .max(300, "Product name must bewteen 10 and 300 characters."),
    brand: Yup.string().required("Please add a brand"),
    category: Yup.string().required("Please select a category."),
    /*
        subCategories: Yup.array().min(
          1,
          "Please select atleast one sub Category."
        ),
       */
    sku: Yup.string().required("Please add a sku/number"),
    color: Yup.string().required("Please add a color"),
    description: Yup.string().required("Please add a description"),
  });
  const createProduct = async () => {
    let test = validateCreateProduct(product, images);
    if (test == "valid") {
      createProductHandler();
    } else {
      dispatch(
        showDialog({
          header: "Please follow our instructions.",
          msgs: test,
        })
      );
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };
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
          color: product.color.color,
          imageInputFile: "",
          styleInout: "",
        }}
        validationSchema={validate}
        onSubmit={() => {
          createProduct();
        }}
      >
        {(formik) => (
          <Form>
            {/* <Images
                        name="imageInputFile"
                        header="Product Carousel Images"
                        text="Add images"
                        images={images}
                        setImages={setImages}
                        setColorImage={setColorImage}
                    /> */}
            <div className={styles.flex}>
              {product.color.image && (
                <img
                  src={product.color.image}
                  className={styles.images_span}
                  alt=""
                />
              )}
              {product.color.color && (
                <span
                  className={styles.color_span}
                  styles={{ background: `${product.color.color}` }}
                ></span>
              )}
            </div>
                      {/* <Colors
                                name="color"
                                product={product}
                                setProduct={setProduct}
                                colorImage={colorImage}
                                />
                                <Style
                                name="styleInput"
                                product={product}
                                setProduct={setProduct}
                                colorImage={colorImage}
                                /> */}
              <SingularSelect
                name="parent"
                value={product.parent}
                placeholder="Parent product"
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
                  name="subCategories"
                  disabled={product.parent}
                  handleChange={handleChange}
                />
              )}
              <div className={styles.header}>Basic Infos</div>

              <AdminInput
                type="text"
                label="Name"
                name="name"
                placholder="Product name"
                onChange={handleChange}
              />
              <AdminInput
                type="text"
                label="Description"
                name="description"
                placholder="Product description"
                onChange={handleChange}
              />
              <AdminInput
                type="text"
                label="Brand"
                name="brand"
                placholder="Product brand"
                onChange={handleChange}
              />
              <AdminInput
                type="text"
                label="Sku"
                name="sku"
                placholder="Product sku/ number"
                onChange={handleChange}
              />
              <AdminInput
                type="text"
                label="Discount"
                name="discount"
                placholder="Product discount"
                onChange={handleChange}
              />
              {/* <Sizes
                sizes={product.sizes}
                product={product}
                setProduct={setProduct}
              />
              <Details
                details={product.details}
                product={product}
                setProduct={setProduct}
              />
              <Questions
                questions={product.questions}
                product={product}
                setProduct={setProduct}
              /> */}
             <button
              className={`${styles.btn} ${styles.btn__primary} ${styles.submit_btn}`}
              type="submit"
            >
              Create Product
            </button>
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