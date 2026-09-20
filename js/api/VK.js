/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {
<<<<<<< HEAD
  static ACCESS_TOKEN = null;
  static lastCallback;
  static getToken() {
    let token = localStorage.getItem('vk_token');
    if (!token) {
      token = prompt('Введите VK access_token:');
      if (token) {
        localStorage.setItem('vk_token', token.trim());
      }
    
    return token;
    } 
  }

 
=======

  static ACCESS_TOKEN = '958eb5d439726565e9333aa30e50e0f937ee432e927f0dbd541c541887d919a7c56f95c04217915c32008';
  static lastCallback;
>>>>>>> a0b9213dccd420fcec73bc3d7334eb07ba9449f3

  /**
   * Получает изображения
   * */
<<<<<<< HEAD
  static get(id = '', callback) {
    const token = this.getToken();
    if (!token) {
      alert('Необходим VK токен');
      callback([]);
      return;
    }

    this.lastCallback = callback;

    const script = document.createElement('script');
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&access_token=${token}&v=5.199&callback=VK.processData`;
    document.head.appendChild(script);
=======
  static get(id = '', callback){

>>>>>>> a0b9213dccd420fcec73bc3d7334eb07ba9449f3
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
<<<<<<< HEAD
  static processData(result) {
    const script = document.querySelector('script[src*="api.vk.com"]');
    if (script) script.remove();

    if (result.error) {
      // если токен не работает - удаляем и заново запрашиваем
      if (result.error.error_code === 5) {
        localStorage.removeItem('vk_token');
        alert('Токен VK недействителен. Введите новый при следующем запросе.');
      } else {
        alert(`Ошибка VK: ${result.error.error_msg}`);
      }
      VK.lastCallback([]);
      VK.lastCallback = () => {};
      return;
    }

    const response = result.response;
    if (!response) {
      alert('Неизвестная ошибка VK');
      VK.lastCallback([]);
      VK.lastCallback = () => {};
      return;
    }

    const items = (response.items || [])
      .map(el => {
        if (el.orig_photo) return el.orig_photo.url;
        if (el.sizes) {
          const arrSizes = ['s','m','x','o','p','q','r','y','z','w'];
          let numSize = -1, url;
          el.sizes.forEach(size => {
            const idx = arrSizes.indexOf(size.type);
            if (idx > numSize) { numSize = idx; url = size.url; }
          });
          return url;
        }
        return null;
      })
      .filter(Boolean);

    VK.lastCallback(items);
    VK.lastCallback = () => {};
  }
}

=======
  static processData(result){

  }
}
>>>>>>> a0b9213dccd420fcec73bc3d7334eb07ba9449f3
