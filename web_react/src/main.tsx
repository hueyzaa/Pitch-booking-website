import { store } from '@app/store/store';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './i18n';
import { apiURL } from './configs/configs';

const originalWarn = console.error;
console.error = (...args) => {
  if (
    args[0].includes('Support for defaultProps will be removed from function components in a future major release.')
  ) {
    return;
  }
  originalWarn(...args);
};

// Todo: Cập nhật favicon từ localStorage
function updateFaviconFromLocalStorage() {
  const configStr = localStorage.getItem('cauHinhHeThong');
  if (!configStr) return;

  try {
    const config = JSON.parse(configStr);
    if (config.logoUrl) {
      const faviconUrl = apiURL + '/' + config.logoUrl.replace(/\\/g, '/');

      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    }
  } catch (e) {
    console.error('Invalid JSON in cauHinhHeThong:', e);
  }
}

//Todo: gọi hàm cập nhật favicon từ localStorage
updateFaviconFromLocalStorage();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
