import { useState } from 'react'
import { Link, Route, Routes, Outlet, BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Dashboard from './Pages/dashboard-page'
import UsersPage from './Pages/users-page'
import InstitutionsPage from './Pages/institutions-page'
import OrdersPage from './Pages/orders-page'
import { PlansPage } from './Pages/plans-page'
import SubscriptionsPage from './Pages/subscriptions-page'
import TradesPage  from './Pages/trades-page'

function App() {

  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersPage/>} />
          <Route path='institutions' element={<InstitutionsPage/>} />
          <Route path='orders' element={<OrdersPage/>} />
          <Route path='plans' element={<PlansPage/>} />
          <Route path='subscriptions' element={<SubscriptionsPage/>} />
          <Route path='trades' element={<TradesPage/>} />
        </Route>
        <Route path='login' element={<h1>login</h1>} />
        <Route path="*" element={<Layout />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
