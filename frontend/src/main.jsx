import ReactDOM from 'react-dom/client'; // Correct capitalization for ReactDOM
// Correct import for the default export
import './index.css';
import App from './App';
import  {BrowserRouter} from 'react-router-dom';
import StoreContextProvider from './Context/StoreContext'
ReactDOM.createRoot(document.getElementById('app')).render(
 
    <BrowserRouter>
    <StoreContextProvider>
    <App/>
    </StoreContextProvider>
    </BrowserRouter>

);
