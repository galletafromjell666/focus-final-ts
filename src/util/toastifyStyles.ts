import { ToastOptions } from 'react-toastify/dist/types';
interface ToastifyStyles {
    delete: ToastOptions;
    success: ToastOptions;
    loginErr: ToastOptions;
}
const toastStyles: ToastifyStyles = {
    delete: {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
    },
    success: {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
    },
    loginErr: {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
    }
};

export default toastStyles;
