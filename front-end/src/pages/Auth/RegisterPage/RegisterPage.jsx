import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
// import FormGroup from "../../../components/primary/FormGroup/FormGroup";
// import SelectGroup from "../../../components/primary/SelectGroup/SelectGroup";
import { Icon } from "@iconify/react";
import axios, { formToJSON } from "axios";
import { AUTH_URL } from "../../../libs/Urls";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {} from "./RegisterPage.css"



export default function RegisterPage() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const roleTypes = [
    {
      value: "patient",
      title: "patient",
    },
    {
      value: "administrator",
      title: "administrator",
    },
    {
      value: "doctor",
      title: "doctor",
    },
    {
      value: "receptionist",
      title: "receptionist",
    },
  ];

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    // const data = formToJSON(e.target);

    axios
      .post(
        AUTH_URL.REGISTER, 
        { firstName, lastName, email, phone, dob, gender, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          Swal.fire({
            title: "Login Succes!",
            text: "In Order To Contrinue Please Login.",
            icon: "success",
          }).finally((res) => {
            navigate("/auth/login");
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: err.response.data.message,
          icon: "error",
        });
      });
  };

  return (
    <main className={styles.registerPage}>
      <img className={styles.background} src="/images/hospital/image.avif" />

      <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        
        <form onSubmit={onRegisterSubmit}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="gender-dropdown">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            </div>
            <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
            <p className="already-registered">Already Registered? 
            <Link to={"/auth/login"} >
               Log In
            </Link>
            </p>

          <button type="submit" className="submitButton">
            <span>Submit</span>
            <Icon icon="formkit:submit" />
          </button>
        </form>
      </div>
    </main>
  );

  // <FormGroup
  //   title={"UserName"}
  //   name={"username"}
  //   type={"text"} />

  // <FormGroup
  //   title={"Email"}
  //   name={"email"}
  //   type={"email"} />

  // <FormGroup
  //   title={"Password"}
  //   name={"password"}
  //   type={"password"} />

  // <SelectGroup
  //   name={"role"}
  //   options={roleTypes}
  //   title={"Role"}
  // />

  // <div className={styles.buttons}>
  //   <button
  //     type='button'
  //     className={styles.loginButton}
  //     onClick={() => { navigate("/auth/login") }}>
  //     <span>
  //       Login
  //     </span>
  //     <Icon icon="formkit:submit" />
  //   </button>
}
