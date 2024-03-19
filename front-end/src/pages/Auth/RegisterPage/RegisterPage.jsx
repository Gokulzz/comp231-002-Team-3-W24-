import React, { useState } from 'react'

import styles from "./styles.module.scss"
import FormGroup from '../../../components/primary/FormGroup/FormGroup'
import SelectGroup from '../../../components/primary/SelectGroup/SelectGroup'
import { Icon } from '@iconify/react'
import axios, { formToJSON } from 'axios'
import { AUTH_URL } from '../../../libs/Urls'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
export default function RegisterPage() {



  const navigate = useNavigate()


  const roleTypes = [
    {
      value: 'patient',
      title: 'patient'
    },
    {
      value: 'administrator',
      title: 'administrator'
    },
    {
      value: 'doctor',
      title: 'doctor'
    },
    {
      value: 'receptionist',
      title: 'receptionist'
    }
  ]

  const onRegisterSubmit = (e) => {
    e.preventDefault()
    const data = formToJSON(e.target)

    axios.post(AUTH_URL.REGISTER, data)
      .then(res => {
        console.log(res)
        if (res.status === 201) {
          Swal.fire({
            title: "Login Succes!",
            text: "In Order To Contrinue Please Login.",
            icon: "success"
          }).finally(res => {
            navigate("/login")
          })

        }
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          title: err.response.data.message,
          icon: "error"
        })
      })


  }


  return (
    <main className={styles.registerPage}>

      <form
        onSubmit={onRegisterSubmit}
      >

        <FormGroup
          title={"UserName"}
          name={"username"}
          type={"text"} />

        <FormGroup
          title={"Email"}
          name={"email"}
          type={"email"} />


        <FormGroup
          title={"Password"}
          name={"password"}
          type={"password"} />

        <SelectGroup
          name={"role"}
          options={roleTypes}
          title={"Role"}
        />


        <div className={styles.buttons}>
          <button
            type='button'
            className={styles.loginButton}
            onClick={() => { navigate("/login") }}>
            <span>
              Login
            </span>
            <Icon icon="formkit:submit" />
          </button>

          <button
            type='submit'
            className={styles.submitButton}>
            <span>
              Submit
            </span>
            <Icon icon="formkit:submit" />
          </button>
        </div>




      </form>

    </main >
  )
}
