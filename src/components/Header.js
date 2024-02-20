import {useContext} from 'react'
import ThemeContext from '../contexts/ThemeContext';
import { MdDarkMode, MdLightMode } from "react-icons/md";

function Header() {
  const {theme, setTheme} = useContext(ThemeContext);
  return (
    <div>
          Temayı Değiştir:
          <button className='btn' onClick={()=> setTheme(theme === "light" ? "dark":"light")}>{theme == "dark" ? <MdLightMode /> :<MdDarkMode /> }</button>
    </div>
  )
};

export default Header