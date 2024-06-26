import React, { useState } from 'react'

import styles from "./styles.module.scss"
import FormGroup from '../../../components/primary/FormGroup/FormGroup'
import SelectGroup from '../../../components/primary/SelectGroup/SelectGroup'
import { Icon } from '@iconify/react'
import axios, { formToJSON } from 'axios'
import { SERVER_BASE_URL, AUTH_URL } from '../../../libs/Urls'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../../@redux/UserSlice/UserSlice'

export default function LoginPage() {




  const dispatcher = useDispatch()

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


  const onLoginSubmit = (e) => {
    e.preventDefault()
    const data = formToJSON(e.target)


    //
    axios.post(AUTH_URL.LOGIN, data)
      .then(res => {
        if (res.status === 200) {


          const responseData = res.data

          const user = {
            token: responseData.token,
            userId: responseData.userId,
            role: data.role,
          }

          dispatcher(login(user))

          Swal.fire({
            title: "Login Succes!",
            icon: "success"
          }).finally(res => {
            navigate(`/dashboard/${user.role}`)
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
    <main className={styles.loginPage}>

      <img className={styles.background} src="/images/hospital/image.avif" />


      <form
        onSubmit={onLoginSubmit}
      >

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
            className={styles.registerButton}
            onClick={() => { navigate("/auth/register") }}>
            <span>
              Register
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
