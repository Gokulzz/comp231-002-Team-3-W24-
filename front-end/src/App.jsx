

import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";

import Header from "./components/layouts/Header/Header"
import Footer from "./components/layouts/Footer/Footer"


import { routes } from "./libs/RoutesList"


export default function App() {


  return (
    <div className='App'>
      <BrowserRouter>

        <Header />

        <Routes>

          {
            routes.map(route => {
              return <Route 
              path={route.path}
               element={route.element} />
            })
          }

        </Routes>

        


      </BrowserRouter>

    </div>
  )
}
