import { useSelector } from 'react-redux';
import styles from './Card.module.css';

const Card = (props)=>{
    const darkMode = useSelector(state => state.ui.isDarkModeOn);

    return(
        <div className={`${styles.card} ${darkMode ? styles.darkTheme : styles.lightTheme}`}>
            {props.children}
        </div>
    );
}

export default Card;