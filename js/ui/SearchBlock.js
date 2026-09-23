/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor(element) {
    this.searchBlock = element;
    this.registerEvents();
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents() {
    const inputId = this.searchBlock.querySelector('input');
    const buttons = this.searchBlock.querySelectorAll('button');

    buttons.forEach(btnItem => {
      btnItem.addEventListener('click', () => {
        const searchId = inputId.value.trim();
        if (!searchId) {
          return;
        }

        if (btnItem.classList.contains('replace')) {
          App.imageViewer.clear();
        }

        VK.get(searchId, result => {
          App.imageViewer.drawImages(result);
        });
      });
    });
  }

}