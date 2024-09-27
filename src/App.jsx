import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import MatrixList from './pages/Dashboard/Componants/Matrix/MatrixList';
import MatrixEditForm from './pages/Dashboard/Componants/Matrix/MatrixEditForm';
import MatrixForm from './pages/Dashboard/Componants/Matrix/MatrixForm';
import React from 'react';
import Form from './pages/Login/Form';
import Home from './pages/Home/Home';
import Users from './pages/Users/Users';
import UserInfo from './pages/Users/UserInfo';
import AdminUserCard from './pages/Dashboard/Componants/users/AdminUserCard';
import AdminUsers from './pages/Dashboard/Componants/users/AdminUsers';




function App() {
  return (
    <>
  <Router>
      <Routes>
        <Route path='/dashboard' element={<AdminDashboard />} />
        <Route path='/home' element={<Home />} />
        <Route path='/userinfo' element={<UserInfo />} />
        <Route path='/AdminUserCard' element={<AdminUserCard />} />
        <Route path='/AdminUsers' element={<AdminUsers />} />




        <Route path='/MatrixList' element={<MatrixList />} />
        <Route path='/MatrixEditForm' element={<MatrixEditForm />} />
        <Route path='/MatrixForm' element={<MatrixForm />} />
        <Route path='/' element={<Form />} />
        <Route path='/users' element={<Users />} />

      </Routes>
    </Router>
    </>
  )
}

export default App;
