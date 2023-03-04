import './App.css';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './pages/SignIn';
import DashBoard from './pages/Dashboard.js';
import Match from './pages/Match';
import Signup from './pages/SignUp';
import Summary from './pages/Summary';
import ViewProfile from './pages/ViewProfile';

function App() {


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/DashBoard' element={<DashBoard />} />
          <Route path='/Match' element={<Match />} />
          <Route path='/SignIn' element={<LogIn />} /> 
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Summary' element={<Summary />} />      
          <Route path='/ViewProfile' element={<ViewProfile />} />
          
        </Routes>
      </Router>

    </>
  );
}

export default App;
