

import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";

import Header from "./components/layouts/Header/Header"
import Footer from "./components/layouts/Footer/Footer"


import { routes } from "./libs/RoutesList"
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage";
import ReceptionistApointments from "./pages/Dashboards/Receptionist/Apointments/ReceptionistApointments";



import ApointmentDetailPage from "./pages/Dashboards/Receptionist/Apointments/Detail/ApointmentDetailPage";
import ApointmentsRequests from "./pages/Dashboards/Receptionist/Apointments/Requests/ApointmentsRequests";
import PatientCreateApointment from "./pages/Dashboards/Receptionist/Apointments/Requests/Create/PatientCreateApointment";
import PatientLayout from "./pages/Dashboards/Patient/Layout";
import ReceptionistLayout from "./pages/Dashboards/Receptionist/ReceptionistLayout";
import PatientDashboard from "./pages/Dashboards/Patient/Dashboard/PatientDashboard";
import ReceptionistDashboard from "./pages/Dashboards/Receptionist/Dashboard/ReceptionistDashboard";
import PatientApointmentRequests from "./pages/Dashboards/Patient/ApointmentRequests/PatientApointmentRequests";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import UserSlice, { fetchUserFromDB } from "./@redux/UserSlice/UserSlice";
import { useEffect } from "react";
import axios from "axios";
import AdminLayout from "./pages/Dashboards/Admin/Layout";
import AdminDashboard from "./pages/Dashboards/Admin/Dashboard/AdminDashboard";
import UsersPage from "./pages/Dashboards/Admin/Users/UsersPage";
import DoctorsPage from "./pages/Dashboards/Admin/Doctors/DoctorsPage";
import DoctorLayout from "./pages/Dashboards/Doctor/DoctorLayout";
import DoctorDashboard from "./pages/Dashboards/Doctor/Dashboard/DoctorDashboard";
import DoctorApointments from "./pages/Dashboards/Doctor/Apointments/DoctorApointments";





export default function App() {

  const dispatcher = useDispatch()
  const user = useSelector(state => state.user.value)
  useEffect(() => {
    dispatcher(fetchUserFromDB())
  }, [])



  return (
    <div className='App'>


      <BrowserRouter>
        <Header />

        <Routes>

          <Route path="/" element={<HomePage />} />


          {/* Auth PAges */}
          <Route
            path="/auth/login"
            element={<LoginPage />} />



          <Route
            path="/auth/register"
            element={<RegisterPage />} />




          {/* Recepptionist Pages */}
          <Route path="/dashboard/receptionist"
            element={<ReceptionistLayout />}>


            <Route
              index
              path="dashboard"
              element={<ReceptionistDashboard />}
            />


            <Route
              path="appointments"
              element={<ReceptionistApointments />} />


            <Route
              path="appointments/requests"
              element={<ApointmentsRequests />} />


            <Route path="appointments/:id"
              element={<ApointmentDetailPage />} />

          </Route>


          {/* Patient Pages */}
          <Route path="/dashboard/patient" element={<PatientLayout />}>
            <Route index path="" element={<PatientDashboard />} />
            <Route index path="dashboard" element={<PatientDashboard />} />
            <Route path="appointments/requests" element={<PatientApointmentRequests />} />
            <Route path="appointments/requests/create" element={<PatientCreateApointment />} />
            <Route path="appointments/:id" element={<ApointmentDetailPage />} />
          </Route>



          {/* administrator Pages */}
          <Route path="/dashboard/administrator/" element={<AdminLayout />}>
            <Route index path="" element={<AdminDashboard />} />
            <Route index path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
          </Route>



          {/* Doctors Pages */}
          <Route path="/dashboard/doctor/" element={<DoctorLayout />}>
            <Route index path="" element={<DoctorDashboard />} />
            <Route index path="dashboard" element={<DoctorDashboard />} />
            <Route path="appointments" element={<DoctorApointments />} />
          </Route>



          <Route path="*" element={<h1>Not Found 404</h1>} />
        </Routes>

      </BrowserRouter>

    </div>
  )
}
