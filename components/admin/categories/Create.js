import { Form, Formik } from "formik"
import { useState } from "react"
import styles from "./styles.module.scss"
import * as Yup from 'yup';
import AdminInput from "../../inputs/adminInput";
import axios from "axios";
import { toast } from "react-toastify";

export default function Create({setCategories}) {
    const [name, setName] = useState("");
    const validate = Yup.object({
        name: Yup.string().required('Category name is required')
        .min(3, "Category name must be between  3 and 20 character.")
        .max(40, "Category name must be between  3 and 20 character.")
    })
    const submitHandler = async() =>{
        try{
            const {data} = await axios.post("/api/admin/category", {name})
            setCategories(data.categories)
            setName('')
            toast.success(data.message)
        }catch(error){
            toast.error(error.response.data.message)
        }
    }
  return (
    <>
     <Formik
     enableReinitialize
     initialValues={{name}}
     validationSchema={validate}
     onSubmit={()=>{submitHandler()}}>
        {(formik) =>(
            <Form>
                <div className={styles.header}>create a Category</div>
                <AdminInput
                type= "text"
                label="Name"
                name='name'
                placeholder="Category name"
                onChange={(e) => setName(e.target.value)}
                />
                 <div className = {styles.btnWrap}>
                      <button type="submit" className={`${styles.btn}`}>
                      <span>Add Category</span>
                    </button>
                </div>
            </Form>
        )}    
    </Formik>   
    </>
  )
}
