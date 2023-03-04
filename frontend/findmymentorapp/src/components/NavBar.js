
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
                    <Link to='/Dashboard' className='nav-links' > Dashboard </Link>
                </li>                
                

            </ul>
                      
        </div>

    </nav>
    </>
  )
}

export default Navbar