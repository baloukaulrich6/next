import { Form, Formik } from "formik"
import { useState } from "react"
import styles from "./styles.module.scss"
import * as Yup from 'yup';
import AdminInput from "../../inputs/adminInput";
import axios from "axios";
import { toast } from "react-toastify";
import SingularSelect from "../../selected/SingularSelect"

export default function Create({categories, setSubCategories}) {
    const [name, setName] = useState("")
    const [parent, setParent] = useState("");
    const validate = Yup.object({
        name: Yup.string().required('setSubCategories name is required')
        .min(3, "setSubCategories name must be between  3 and 20 character.")
        .max(20, "setSubCategories name must be between  3 and 20 character.")
        .matches(
            /^[a-zA-Z\s]*$/,
            "Numbers and special charcters are not allowed."),
        parent: Yup.string().required("please choose a parent Categories")
    })
    const submitHandler = async() =>{
        try{
            const {data} = await axios.post("/api/admin/subCategory", {name, parent})
            setSubCategories(data.subCategories)
            setName('');
            setParent("")
            toast.success(data.message)
        }catch(error){
            toast.error(error.response.data.message)
        }
    }
  return (
    <>
     <Formik
     enableReinitialize
     initialValues={{name, parent}}
     validationSchema={validate}
     onSubmit={()=>{submitHandler()}}>
        {(formik) =>(
            <Form>
                <div className={styles.header}>create a Category</div>
                <AdminInput
                type= "text"
                label="Name"
                name='name'
                placeholder="Sub-Category name"
                onChange={(e) => setName(e.target.value)}
                />
                <SingularSelect 
                   name="parent" 
                   value={parent} 
                   data={categories} 
                   placeholder=" Select Category"
                   handleChange={(e) => setParent(e.target.value)}
                   />
                <div className = {styles.btnWrap}>
                      <button type="submit" className={`${styles.btn}`}>
                    <span>Add SubCategory</span>
                    </button>
                </div>
              
            </Form>
        )}    
    </Formik>   
    </>
  )
}
