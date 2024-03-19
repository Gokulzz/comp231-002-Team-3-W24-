

import { Icon } from "@iconify/react"
import styles from "./styles.module.scss"


export default function HomePage() {


  const services = [
    {
      "name": "Health Information",
      "description": "Access medical information, treatment options, and wellness tips.",
      "image_src": "/images/services/Health Information and Education.webp"
    },
    {
      "name": "Appointment Booking",
      "description": "Schedule appointments with healthcare providers online.",
      "image_src": "/images/services/Appointment Scheduling.webp"
    },
    {
      "name": "Telemedicine Consultations",
      "description": "Connect with doctors remotely for non-emergency consultations.",
      "image_src": "/images/services/Telemedicine Consultations.jpg"
    },
    {
      "name": "Medication Management",
      "description": "Request prescription refills and set medication reminders.",
      "image_src": "/images/services/Online Prescription Refills and Medication Management.jpg"
    },
    {
      "name": "Symptom Checker",
      "description": "Get personalized advice based on your symptoms.",
      "image_src": "/images/services/Symptom Checker and Health Assessment Tools.png"
    }
  ]


  const contactUs = {
    "title": "Contact Us",
    "description": "Have questions or need assistance? Feel free to reach out to us. Our team is here to help you with any inquiries you may have regarding our services or anything else related to your healthcare needs.",
    "contact_info": [
      {
        "type": "address",
        "value": "123 Medical Street, Cityville, State, Country",
        "icon": <Icon icon="fa6-solid:map-location" />
      },
      {
        "type": "phone",
        "value": "+123-456-7890",
        "icon": <Icon icon="bxs:phone" />
      },
      {
        "type": "email",
        "value": "info@example.com",
        "icon": <Icon icon="ic:baseline-alternate-email" />
      }
    ]
  }





  return (
    <main className={styles.homePage}>


      <img className={styles.background} src="/images/hospital/image.avif" />

      <section className={styles.services}>
        <h2 className={styles.header}>Services</h2>
        <p className={styles.description}>
          "Explore our convenient services for all your healthcare needs. From booking appointments to accessing reliable health information, managing medications, and connecting with doctors remotely, we've got you covered. Browse below to find what you need."
        </p>
        <div className={styles.list}>
          {
            services.map((service, index) => {
              return <div className={styles.item} key={index}>
                <img src={service.image_src} alt="" />
                <div className={styles.info}>
                  <h3>
                    {service.name}
                  </h3>
                  <p>
                    {service.description}
                  </p>
                </div>

              </div>
            })
          }

        </div>

      </section>


      <section className={styles.contactUs}>
        <div className={styles.map}>
          <img src="/images/contactUs/location.webp" alt="" />
        </div>
        <div className={styles.info}>
          <div className={styles.right}>
            <h2>{contactUs.title}</h2>
            <p>
              {contactUs.description}
            </p>
          </div>
          <div className={styles.left}>
            {
              contactUs.contact_info.map((item, index) => {
                return <div className={styles.item} key={index}>
                  <span className={styles.first}>
                    {item.icon}
                    {item.type}
                  </span>
                  <span className={styles.second}>
                    {item.value}
                  </span>

                </div>
              })
            }
          </div>

        </div>

      </section>



    </main>
  )
}
