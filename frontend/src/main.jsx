import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routers/router.js';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<RouterProvider router={router} />
		<ToastContainer position='bottom-right' autoClose={2000} />
	</Provider>
);
