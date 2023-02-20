import { Formik, Form } from "formik";
import { useState } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import "yup-phone";
import ShippingInput from "../../inputs/shippingInput";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { countries } from "../../../data/countries";
import SingularSelect from "../../selected/SingularSelect";
import {
  IoIosRemoveCircleOutline,
  IoMdArrowDropupCircle,
} from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import {
  changeActiveAddress,
  deleteAddress,
  saveAddress,
} from "../../../request/user";
import { FaIdCard, FaMapMarkedAlt } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber1: "",
  phoneNumber2: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  country: "",
};

export default function Shipping({ addresses, setAddresses, user }) {
  const [shipping, setShipping] = useState(initialValues);
  const [visible, setVisible] = useState(user?.address.length ? false : true);
  const {
    firstName,
    lastName,
    phoneNumber1,
    phoneNumber2,
    state,
    city,
    zipCode,
    address1,
    country,
  } = shipping;
  const validate = Yup.object({
    firstName: Yup.string()
      .required("First name is required.")
      .min(3, "First name must be atleast 3 characters long.")
      .max(20, "First name must be less than 20 characters long."),
    lastName: Yup.string()
      .required("Last name is required.")
      .min(3, "Last name must be atleast 3 characters long.")
      .max(20, "Last name must be less than 20 characters long."),
    phoneNumber1: Yup.string()
      .required("Phon number valide +237693000000.")
      .phone()
      .min(12, "Phone number must be atleast 3 characters long.")
      .max(12, "Phone number must be less than 20 characters long."),
    phoneNumber2: Yup.string()
      .required("Phon number valide +237693000000")
      .phone()
      .min(12, "Phone number must be atleast 12 characters long.")
      .max(12, "Phone number must be less than 20 characters long."),
    state: Yup.string()
      .required("State name is required.")
      .min(2, "State name should contain 2-60 characters..")
      .max(60, "State name should contain 2-60 characters."),
    city: Yup.string()
      .required("City name is required.")
      .min(2, "City name should contain 2-60 characters.")
      .max(60, "City name should contain 2-60 characters."),
    zipCode: Yup.string()
      .required("ZipCode/Postal is required.")
      .min(2, "ZipCode/Postal should contain 2-30 characters..")
      .max(30, "ZipCode/Postal should contain 2-30 characters."),
    address1: Yup.string()
      .required("Address Line 1 is required.")
      .min(3, "Address Line 1 should contain 3-100 characters.")
      .max(100, "Address Line 1 should contain 3-100 characters."),
    country: Yup.string().required("Country name is required."),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };
  const saveShippingHandler = async () => {
    const res = await saveAddress(shipping);
    setAddresses(res.addresses);
  };
  const changeActiveHandler = async (id) => {
    const res = await changeActiveAddress(id);
    setAddresses(res.addresses);
  };
  const deleteHandler = async (id) => {
    const res = await deleteAddress(id);
    setAddresses(res.addresses);
  };
  return (
    <div className={styles.shipping}>
      <div className={styles.header}>
        <h2>Shipping Information</h2>
      </div>
      <div className={styles.addresses}>
        {addresses.map((address) => (
          <div style={{position: "relative"}}>
            <div
              className={styles.address__delete}
              onClick={() => deleteHandler(address._id)}
            >
              <IoIosRemoveCircleOutline />
            </div>
            <div
              className={`${styles.address}
                ${address.active && styles.active}`}
              key={address._id}
              onClick={() => changeActiveHandler(address._id)}
            >
              <div className={styles.address__side}>
                <img src={user.image}></img>
              </div>
              <div className={styles.address__col}>
                <span>
                  <FaIdCard />
                  {address.firstName.toUpperCase()}
                  {address.lastName.toUpperCase()}
                </span>
                <span>
                  <GiPhone />
                  {address.phoneNumber1}
                </span>
                <span>
                  <GiPhone />
                  {address.phoneNumber2}
                </span>
              </div>
              <div className={styles.address__col}>
                <span>
                  <FaMapMarkedAlt />
                  {address.address1}
                </span>
                <span>
                  {address.city},{address.country},{address.state}
                </span>
                <span>{address.zipCode}</span>
              </div>
              <span
                className={styles.active__text}
                style={{
                  display: `${!address.active && "none"}`,
                }}
              >
                Active
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.hide_show} onClick={() => setVisible(!visible)}>
        {visible ? (
          <span>
            <IoMdArrowDropupCircle style={{ fontSize: "2rem", fill: "#222" }} />
          </span>
        ) : (
          <span>
            ADD NEW ADDRESS <AiOutlinePlus />
          </span>
        )}
      </button>
      {visible && (
        <Formik
          enableReinitialize
          initialValues={{
            firstName,
            lastName,
            phoneNumber1,
            phoneNumber2,
            state,
            city,
            zipCode,
            address1,
            country,
          }}
          validationSchema={validate}
          onSubmit={() => {
            saveShippingHandler();
          }}
        >
          {(formik) => (
            <Form>
              <SingularSelect
                name="country"
                value={country}
                placeholder="*Country"
                handleChange={handleChange}
                data={countries}
              />
              <div className={styles.col}>
                <ShippingInput
                  name="firstName"
                  placeholder="*First Name"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="lastName"
                  placeholder="*Last Name"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.col}>
                <ShippingInput
                  name="state"
                  placeholder="*State/Province"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="city"
                  placeholder="*City"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.col}>
                <ShippingInput
                  name="phoneNumber1"
                  placeholder="*Phone number"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="phoneNumber2"
                  placeholder="*Second Phone number"
                  onChange={handleChange}
                />
              </div>
              <ShippingInput
                name="zipCode"
                placeholder="*Post/Zip code"
                onChange={handleChange}
              />
              <ShippingInput
                name="address1"
                placeholder="Address 1"
                onChange={handleChange}
              />
              <button type="submit">Save Address</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}