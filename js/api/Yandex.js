/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
<<<<<<< HEAD
  static getToken() {
    let tokenUser = localStorage.getItem('tokenUser');
    if (!tokenUser) {
      tokenUser = prompt('Введите Yandex токен для работы с Yandex Диском!');
      if (tokenUser) {
        localStorage.setItem('tokenUser', tokenUser);
      }
    }
    return tokenUser;
=======
  static getToken(){

>>>>>>> a0b9213dccd420fcec73bc3d7334eb07ba9449f3
  }

  /**
   * Метод загрузки файла в облако
   */
<<<<<<< HEAD
  static uploadFile(path, url, callback) {
    createRequest({
      method: 'POST',
      url: `${Yandex.HOST}/resources/upload`,
      headers: {
        'Authorization': `OAuth ${Yandex.getToken()}`,
      },
      data: {
        url: url,
        path: path,
      },
      callback: callback,
    });
=======
  static uploadFile(path, url, callback){

>>>>>>> a0b9213dccd420fcec73bc3d7334eb07ba9449f3
  }

  /**
   * Метод удаления файла из облака
   */
<<<<<<< HEAD
  static removeFile(path, callback) {
    createRequest({
      method: 'DELETE',
      url: `${Yandex.HOST}/resources`,
      headers: {
        'Authorization': `OAuth ${Yandex.getToken()}`,
      },
      data: {
        path: path,
      },
      callback: callback,
    });
=======
  static removeFile(path, callback){

>>>>>>> a0b9213dccd420fcec73bc3d7334eb07ba9449f3
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
<<<<<<< HEAD
  static getUploadedFiles(callback) {
    createRequest({
      method: 'GET',
      url: `${Yandex.HOST}/resources/files`,
      headers: {
        'Authorization': `OAuth ${Yandex.getToken()}`,
      },
      callback: callback,
    });
=======
  static getUploadedFiles(callback){

>>>>>>> a0b9213dccd420fcec73bc3d7334eb07ba9449f3
  }

  /**
   * Метод скачивания файлов
   */
<<<<<<< HEAD
  static downloadFileByUrl(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    link.remove();
=======
  static downloadFileByUrl(url){

>>>>>>> a0b9213dccd420fcec73bc3d7334eb07ba9449f3
  }
}
