import { createRoot } from 'react-dom/client';
import './style/index.scss';
import App from './components/App/App.jsx';
import { Provider } from 'react-redux';
import store from './app/store.js';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
