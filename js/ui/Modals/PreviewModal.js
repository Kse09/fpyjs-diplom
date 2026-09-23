/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal {
  constructor(element) {
    super(element);
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    this.elementDOM.querySelector('.header i').addEventListener('click', () => {
      this.close();
    });

    this.content.addEventListener('click', e => {
      const btnDelete = e.target.closest('.delete');
      if (btnDelete) {
        const icon = btnDelete.querySelector('i');
        icon.className = 'icon spinner loading';
        btnDelete.classList.add('disabled');

        Yandex.removeFile(btnDelete.dataset['path'], (err, response) => {
          if (err) {
            alert('Ошибка удаления файла');
            icon.className = 'trash icon';
            btnDelete.classList.remove('disabled');
            return;
          }
          btnDelete.closest('.image-preview-container').remove();
        });
      }

      const btnDownload = e.target.closest('.download');
      if (btnDownload) {
        Yandex.downloadFileByUrl(btnDownload.dataset['file']);
      }
    });
  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {
    const loading = this.content.querySelector('.loading');
    if (loading) {
      loading.remove();
    }

    this.content.innerHTML = '';

    const items = (data && data.items) || [];
    const imagesListHTML = [];
    [...items].reverse().forEach(item => {
      imagesListHTML.push(this.getImageInfo(item));
    });
    this.content.insertAdjacentHTML('beforeEnd', imagesListHTML.join('\n'));
  }

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {
    const dateResult = new Date(date);
    return dateResult.toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    const previewUrl = (item.sizes && item.sizes.length > 0)
      ? (item.sizes.find(s => s.name === 'medium')?.url || item.sizes[0].url)
      : item.preview;

    return `
      <div class="image-preview-container">
        <img src="${previewUrl}" />
        <table class="ui celled table">
        <thead>
          <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>${item.name}</td>
            <td>${this.formatDate(item.created)}</td>
            <td>${Math.round(item.size / 1024)}Кб</td>
          </tr>
        </tbody>
        </table>
        <div class="buttons-wrapper">
          <button class="ui labeled icon red basic button delete" data-path="${item.path}">
            Удалить
            <i class="trash icon"></i>
          </button>
          <button class="ui labeled icon violet basic button download" data-file="${item.file}">
            Скачать
            <i class="download icon"></i>
          </button>
        </div>
      </div>
      `;
  }
}
