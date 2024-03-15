import React, { useState } from 'react'

import styles from "./styles.module.scss"
import FormGroup from '../../../components/primary/FormGroup/FormGroup'
import SelectGroup from '../../../components/primary/SelectGroup/SelectGroup'
import { Icon } from '@iconify/react'
import axios, { formToJSON } from 'axios'
import { SERVER_BASE_URL, AUTH_URL } from '../../../libs/Urls'

export default function LoginPage() {


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
          const token = res.data.token
          localStorage.setItem(
            "token",
            token
          )
        }
      })
      .catch(err => {
      })


  }




  return (
    <main className={styles.loginPage}>

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

        <button
          type='submit'
          className={styles.submitButton}>
          <span>
            Submit
          </span>
          <Icon icon="formkit:submit" />
        </button>


      </form>

    </main >
  )
}
