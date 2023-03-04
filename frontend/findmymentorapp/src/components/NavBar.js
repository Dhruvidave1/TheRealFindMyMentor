
import {Link} from 'react-router-dom';

import './NavBar.css';

function Navbar() {
    
  return (
    <>
    <nav className='navbar'>
        <div className='navbar-container'>
            <Link to='/' className='navbar-logo'>
                FindMyMentor
            </Link>

            <ul className='nav-menu active'>

                <li className='nav-item'>
                    <Link to='/SignIn' className='nav-links' > Sign In </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/SignUp' className='nav-links' > Sign Up </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/ViewProfile' className='nav-links' > View Profile </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/Match' className='nav-links' > Match! </Link>
                </li>                
                

            </ul>
                      
        </div>

    </nav>
    </>
  )
}

export default Navbar