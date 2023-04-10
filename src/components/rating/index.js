import data from '@/app/data';
import Popup from '@/components/popup';
import rowsTemplate from './parts/rows.twig';

class Rating {
  constructor() {
    /**
     * Кнопка для открытия попапа с рейтином
     * @type {HTMLElement}
     */
    this.triggerButton = null;

    /**
     * Обёртка компонента
     * @type {HTMLElement}
     */
    this.ratingWrapper = null;

    /**
     * Обёртка для вывода списка рейтинга
     * @type {HTMLElement}
     */
    this.ratingListWrapper = null;

    /**
     * Обёртка попапа
     * @type {HTMLElement}
     */
    this.popupWrapper = null;

    /**
     * Экземпляр класса попапа
     * @type {Popup}
     */
    this.popup = null;
  }

  /**
   * Инициализация компонента
   * @param {HTMLElement} triggerButton
   * @param {HTMLElement} ratingWrapper
   */
  init(triggerButton, ratingWrapper) {
    this.triggerButton = triggerButton;
    this.ratingWrapper = ratingWrapper;

    this.#initElements();
    this.#initPopup(triggerButton.dataset.popup);
    this.#bindEvents();
  }

  /**
   * Получение внутренних элементов рейтинга
   */
  #initElements() {
    if (!this.ratingWrapper) {
      return;
    }

    this.ratingListWrapper = this.ratingWrapper.querySelector('.js-rating-list');
  }

  /**
   * Инициализация попапа
   * @param id
   */
  #initPopup(id) {
    if (!id) {
      return;
    }

    this.popupWrapper = document.querySelector(`#${id}`);

    if (this.popupWrapper) {
      this.popup = new Popup();

      this.popup.init(this.popupWrapper);
    }
  }

  /**
   * Навешивает обработчики событий
   */
  #bindEvents() {
    if (!this.triggerButton || !this.popup) {
      return;
    }

    // При клике на кнопку получаем данные рейтинга и выводим их в попапе
    this.triggerButton.addEventListener('click', () => {
      // Получаем заголовок для попапа из data атрибута
      const title = this.triggerButton.dataset.title || '';

      // Делаем блок с рейтингом видимым
      this.ratingWrapper.classList.add('is-active');
      // Заполняем данными рейтинга
      this.#setDataRating();
      // Устанавливает данные попапа
      this.popup.setData(this.ratingWrapper, title);
      // Открывает попап с рейтингов
      this.popup.openPopup();
    });
  }

  /**
   * Устанавливает данные попапа
   */
  #setDataRating() {
    if (!this.popup) {
      return;
    }

    // В теории здесь был бы запрос к данным
    const { rating, friends } = data;

    // Сортируем участников рейтинга по кол-ву очков
    rating.sort((prev, next) => next.points - prev.points);

    // Для друзей внутри рейтинга, добавляем специальный класс
    rating.forEach((item) => {
      const isFriend = friends.find((friend) => friend.id === item.id);

      item.class = isFriend ? 'is-friend' : '';
    });

    // Выводим рейтинг на страницу
    this.ratingListWrapper.insertAdjacentHTML('beforeend', rowsTemplate({ rows: rating }));
  }
}

export default Rating;
