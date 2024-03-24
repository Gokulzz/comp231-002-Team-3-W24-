

import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";

import Header from "./components/layouts/Header/Header"
import Footer from "./components/layouts/Footer/Footer"


import { routes } from "./libs/RoutesList"
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage";
import ReceptionistDashboard from "./pages/Dashboards/Receptionist";
import Apointments from "./pages/Dashboards/Receptionist/Apointments/Apointments";
import Dashboard from "./pages/Dashboards/Receptionist/Dashboard/Dashboard";


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./table.css"
import ApointmentDetailPage from "./pages/Dashboards/Receptionist/Apointments/Detail/ApointmentDetailPage";
import ApointmentsRequests from "./pages/Dashboards/Receptionist/Apointments/Requests/ApointmentsRequests";
import Create from "./pages/Dashboards/Receptionist/Apointments/Requests/Create/Create";
export default function App() {


  return (
    <div className='App'>
      <BrowserRouter>

        <Header />

        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="receptionist" element={<ReceptionistDashboard />}>
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={<Apointments />} />
            <Route path="appointments/requests" element={<ApointmentsRequests />} />
            <Route path="appointments/requests/create" element={<Create />} />
            <Route path="appointments/:id" element={<ApointmentDetailPage />} />
          </Route>
          <Route path="*" element={<h1>Not Found 404</h1>} />
        </Routes>






      </BrowserRouter>

    </div>
  )
}
