import './App.css';
import { CityContextProvider } from './contexts/CityContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Body from './components/Body';

function App() {
  return (
    
      <ThemeProvider>
        <CityContextProvider>
          <Body/>
        </CityContextProvider>
      </ThemeProvider>
    
  );
}

export default App;
