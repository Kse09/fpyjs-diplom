/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor(element) {
    this.imagesWrapper = element;
    this.init();
  }

  init() {
    this.imagesList = this.imagesWrapper.children[0];
    this.imagePreview = this.imagesWrapper.children[1];
    this.btnSelectAll = this.imagesWrapper.querySelector('.select-all');
    this.btnUploadedFiles = this.imagesWrapper.querySelector('.show-uploaded-files');
    this.btnSend = this.imagesWrapper.querySelector('.send');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    // по двойному клику мышкой предпросмотр
    this.imagesList.addEventListener('dblclick', e => {
      if (e.target.tagName === 'IMG') {
        this.imagePreview.querySelector('img').src = e.target.src;
      }
    });

    // одиночный клик - выделение
    this.imagesList.addEventListener('click', e => {
      if (e.target.tagName === 'IMG') {
        e.target.classList.toggle('selected');
      }
      this.checkButtonText();
    });

    // кнопки "Выбрать всё" и "Снять выделение"
    this.btnSelectAll.addEventListener('click', () => {
      const allImages = this.imagesList.querySelectorAll('.image-wrapper img');
      const selectedList = this.imagesList.querySelectorAll('.image-wrapper img.selected');

      if (selectedList.length > 0) {
        selectedList.forEach(img => img.classList.remove('selected'));
      } else {
        allImages.forEach(img => img.classList.add('selected'));
      }

      this.checkButtonText();
    });

    // кнопка "Посмотреть загруженные файлы"
    this.btnUploadedFiles.addEventListener('click', () => {
      const modalPreviewer = App.getModal('filePreviewer');
      modalPreviewer.open();

      Yandex.getUploadedFiles((err, response) => {
        if (err) {
          alert('Ошибка получения файлов');
          return;
        }
        modalPreviewer.showImages(response);
      });
    });

    // кнопка "Отправить на диск"
    this.btnSend.addEventListener('click', () => {
      const selectedList = this.imagesList.querySelectorAll('.image-wrapper img.selected');
      const imageSrcList = Array.from(selectedList, el => el.src);

      const modalfileUploader = App.getModal('fileUploader');
      modalfileUploader.open();
      modalfileUploader.showImages(imageSrcList);
    });
  }

  

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    this.imagesList.querySelectorAll('.image-wrapper').forEach(element => {
      element.remove();
    });
    this.checkButtonText();
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    const row = this.imagesList.querySelector('.row');
    images.forEach(image => {
      row.insertAdjacentHTML('beforeEnd', `
        <div class="four wide column ui medium image-wrapper">
          <img src="${image}" />
        </div>
        `);
    });

    if (this.imagesList.querySelectorAll('.image-wrapper').length > 0) {
      this.btnSelectAll.classList.remove('disabled');
    } else {
      this.btnSelectAll.classList.add('disabled');
    }

    this.checkButtonText();
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText() {
    const allImages = this.imagesList.querySelectorAll('.image-wrapper img');
    const selectedList = this.imagesList.querySelectorAll('.image-wrapper img.selected');

    const allSelected = allImages.length > 0 &&
      Array.from(allImages).every(img => img.classList.contains('selected'));

    this.btnSelectAll.innerText = allSelected ? 'Снять выделение' : 'Выбрать всё';
    this.btnSend.classList.toggle('disabled', selectedList.length === 0);
  }
}

