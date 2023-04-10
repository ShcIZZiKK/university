class Popup {
  constructor() {
    /**
     * Обёртка попапа
     * @type {HTMLElement}
     */
    this.popupWrapper = null;

    /**
     * Кнопка для закрытия попапа
     * @type {HTMLElement}
     */
    this.closeButton = null;

    /**
     * Фон попапа
     * @type {HTMLElement}
     */
    this.overlay = null;

    /**
     * Обёртка для вывода заголовка
     * @type {HTMLElement}
     */
    this.titleWrapper = null;

    /**
     * Обёртка для вывода контента попапа
     * @type {HTMLElement}
     */
    this.contentWrapper = null;

    /**
     * Класс для показа попапа
     * @type {string}
     */
    this.activeClass = 'is-active';
  }

  /**
   * Инициализация компонента
   * @param {HTMLElement} wrapper
   */
  init(wrapper) {
    this.popupWrapper = wrapper;

    this.#initElements();
    this.#bindEvents();
  }

  /**
   * Получение элементов попапа
   */
  #initElements() {
    if (!this.popupWrapper) {
      return;
    }

    this.closeButton = this.popupWrapper.querySelector('.js-popup-close');
    this.overlay = this.popupWrapper.querySelector('.js-popup-overlay');
    this.titleWrapper = this.popupWrapper.querySelector('.js-popup-title');
    this.contentWrapper = this.popupWrapper.querySelector('.js-popup-content');
  }

  /**
   * Навешивает обработчики событий
   */
  #bindEvents() {
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.closePopup.bind(this));
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', this.closePopup.bind(this));
    }
  }

  /**
   * Открывает попап
   */
  openPopup() {
    if (!this.popupWrapper) {
      return;
    }

    this.popupWrapper.classList.add(this.activeClass);
  }

  /**
   * Закрывает попап
   */
  closePopup() {
    if (!this.popupWrapper) {
      return;
    }

    this.popupWrapper.classList.remove(this.activeClass);
  }

  /**
   * Устанавливает данные для вывода в попапе
   * @param {HTMLElement} content - контент
   * @param {string} title - заголовок
   */
  setData(content, title = '') {
    if (this.titleWrapper) {
      this.titleWrapper.innerHTML = title;
    }

    if (this.contentWrapper) {
      this.contentWrapper.innerHTML = '';
      this.contentWrapper.appendChild(content);
    }
  }
}

export default Popup;
