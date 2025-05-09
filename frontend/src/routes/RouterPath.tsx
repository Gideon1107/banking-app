import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import LandingPage from '../pages/LandingPage'
import DashboardLayout from '../layouts/DashboardLayout'
import Home from '../pages/dashboard/Home'
import Payments from '../pages/dashboard/Payments'
import Cards from '../pages/dashboard/Cards'
import Loan from '../pages/dashboard/Loan'
import Live from '../pages/dashboard/Live'
import Profile from '../pages/dashboard/Profile'
import AddCard from '../pages/dashboard/AddCard'
import ChangePin from '../components/Dashboard/ChangePin'
import Details from '../components/payments/Details'
import Bills from '../components/payments/Bills'

function RouterPath() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          {/* Nested Routes for Payments */}
          <Route path="payments">
            <Route index element={<Payments />} />
            <Route path="details" element={<Details />} />
            <Route path="bills" element={<Bills />} />
          </Route>

          <Route path="cards" >
            <Route index element={<Cards />} />
            <Route path="add" element={<AddCard />} />
            <Route path="change" element={<ChangePin />} />
          </Route>

          <Route path="loan" element={<Loan />} />
          <Route path="live-chat" element={<Live />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterPath
