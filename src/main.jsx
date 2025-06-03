import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './app/store.jsx'
import DropDownAsk from './components/DropDownAsk.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
      <DropDownAsk />
    </Provider>
)