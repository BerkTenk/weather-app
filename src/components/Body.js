import  { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import Header from './Header'
import Weather from './weather'
function Body() {
    const {theme} = useContext(ThemeContext)
  return (
    <div>
        <div className={`app ${theme }`}>
    <Header/>
    <hr/>
    <Weather/>
    
    </div>
    </div>
  )
}

export default Body