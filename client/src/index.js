import React from 'react'
import ReactDOM from "react-dom/client"
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Home from "./views/Home/Home.js"
import Login from "./views/Login/Login.js"
import SignUp from './views/SignUp/SignUp.js'
import AddTransaction from './views/AddTransaction/AddTransaction.js'
import "./global.css"

const root=ReactDOM.createRoot(document.getElementById("root"))

const router = createBrowserRouter([
    {
    path:'/',
    element:<Home />
},
{
    path:"/login",
    element:<Login />
},
{
    path:"/signup",
    element:<SignUp/>
},
{
    path:"/addTransaction",
    element:<AddTransaction/>
},
{
    path:"*",
    element:<h1 >Ohh....
        Page Not Found😑</h1>
}

])

root.render(<RouterProvider router={router}/>)

