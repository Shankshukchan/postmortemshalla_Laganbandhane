import MoveToTopButton from './compoenets/buttons/MoveToTopButton';
import Pricing from './compoenets/pricing/Pricing';


import './App.css'
import Footer from './compoenets/navigation/Footer'
import Login from './compoenets/register/Login'
import Signup from './compoenets/register/Signup'
import Home from './compoenets/home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Templates from './compoenets/templates/Templates'
import Editor from './compoenets/editor/Editor'
import Navbar from './compoenets/navigation/Navbar'
import ContactUs from './compoenets/contact/ContactUs'
import AboutUs from './compoenets/about-us/AboutUs'
import UserDashboard from './compoenets/dashboards/user-dashboard/UserDashboard';
import AdminDashboard from './compoenets/dashboards/admin-dashboard/AdminDashboard';






function App() {
 

  return (<>
 
<BrowserRouter>
<Navbar/>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/templates" element={<Templates/>}/>
  <Route path="/editor/:id" element={<Editor/>}/>
  <Route path="/contact-us" element={<ContactUs/>}/>
  <Route path="/about-us" element={<AboutUs/>}/>
  <Route path="/pricing" element={<Pricing/>}/>
  <Route path="/templates" element={<Templates/>}/>
  <Route path="/user-dashboard" element={<UserDashboard/>}/>
  <Route path='/admin-dashboard' element={<AdminDashboard/>}/>


</Routes>
  <Footer/>
  <MoveToTopButton/>
</BrowserRouter>
  </>
    
  )
}

export default App