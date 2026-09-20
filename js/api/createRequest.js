/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  let url = options.url;
  if (options.data && options.method !== 'POST_BODY') {
    const params = new URLSearchParams(Object.entries(options.data)).toString();
    url += (url.includes('?') ? '&' : '?') + params;
  }

  xhr.onload = () => {
    let response = xhr.response;
    if (xhr.status >= 200 && xhr.status < 300) {
      options.callback?.(null, response);
    } else {
      options.callback?.(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`), response);
    }
  };

  xhr.onerror = () => {
    options.callback?.(new Error('Сетевая ошибка'), null);
  };

  try {
    xhr.open(options.method || 'GET', url);

    if (options.headers) {
      for (const [key, value] of Object.entries(options.headers)) {
        xhr.setRequestHeader(key, value);
      }
    }

    xhr.send();
  } catch (err) {
    console.error(err);
    options.callback?.(err, null);
  }
};




