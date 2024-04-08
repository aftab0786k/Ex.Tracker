import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/authSlice';

const Header = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const darkMode = useSelector(state => state.ui.isDarkModeOn);
    const logoutHandler = ()=>{
        dispatch(authActions.logout());
        navigate('/');
    }
    return(
        <header className={`${darkMode ? styles.dark : styles.light} ${styles.head}`}>
            <h1>ExpenseTracky</h1>
            <nav className={styles.nav}>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    {isLoggedIn && (<button onClick={logoutHandler} className={styles.action}>Logout</button>)}
                    {!isLoggedIn && (<li><NavLink to='/'>Login</NavLink></li>)}
                </ul>
            </nav>
        </header>
    );
}

export default Header;