class Slider {
  constructor() {
    /**
     * Обёртка компонента
     * @type {HTMLElement}
     */
    this.slider = null;

    /**
     * Обёртка самого слайдера
     * @type {HTMLElement}
     */
    this.sliderWrapper = null;

    /**
     * Блок куда выводим слайды
     * @type {HTMLElement}
     */
    this.sliderSlides = null;

    /**
     * Кнопка для листания влево
     * @type {HTMLElement}
     */
    this.buttonLeft = null;

    /**
     * Кнопка для листания вправо
     * @type {HTMLElement}
     */
    this.buttonRight = null;

    /**
     * Ширина одного слайда
     * @type {number}
     */
    this.slideWidth = 60;

    /**
     * Количество прокручиваемых слайдов
     * @type {number}
     */
    this.scrollableCount = 1;

    /**
     * Количество слайдов видимых пользователю
     * @type {number}
     */
    this.visebleCount = 0;

    /**
     * Всего слайдов
     * @type {number}
     */
    this.slidesCount = 0;

    /**
     * Текущая позиция прокрутки
     * @type {number}
     */
    this.position = 0;

    /**
     * Текущий шаг прокрутки
     * @type {number}
     */
    this.step = 1;

    /**
     * Максимальный шаг прокрутки
     * @type {number}
     */
    this.maxStep = 1;

    /**
     * Минимальная позиция для прокрутки
     * @type {number}
     */
    this.minScrollPos = 0;

    /**
     * Максимальная позиция для прокрутки
     * @type {number}
     */
    this.maxScrollPos = 0;
  }

  /**
   * Инициализация компонента
   * @param {{slider: HTMLElement, scrollableCount: number }} options - опции
   */
  init(options) {
    this.slider = options.slider;
    this.scrollableCount = options.scrollableCount || 1;

    this.#initElements();
    this.#bindEvents();
    this.#checkDisableButtons();
  }

  /**
   * Получение зависимостей для слайдера и расчёт значений
   */
  #initElements() {
    this.sliderWrapper = this.slider.querySelector('.js-slider-wrapper');
    this.sliderSlides = this.slider.querySelector('.js-slider-slides');
    this.buttonLeft = this.slider.querySelector('.js-slider-left');
    this.buttonRight = this.slider.querySelector('.js-slider-right');

    const slides = this.sliderSlides.children;

    this.slideWidth = slides[0] ? slides[0].offsetWidth : 0;
    this.slidesCount = slides.length;
    this.maxScrollPos = -this.slideWidth * (this.slidesCount - this.scrollableCount);
    this.visebleCount = Math.floor(this.sliderWrapper.offsetWidth / this.slideWidth);
    this.step = this.scrollableCount;
    this.maxStep = this.slidesCount - (this.visebleCount - this.scrollableCount);
  }

  /**
   * Навешивает обработчики событий
   */
  #bindEvents() {
    this.buttonLeft.addEventListener('click', this.#moveLeft.bind(this));
    this.buttonRight.addEventListener('click', this.#moveRight.bind(this));
  }

  /**
   * Прокручивает слайдер влево
   */
  #moveLeft() {
    const nextPosition = this.position + (this.slideWidth * this.scrollableCount);

    this.position = Math.min(nextPosition, this.minScrollPos);
    this.sliderSlides.style.transform = `translateX(${this.position}px)`;

    if (this.step > this.scrollableCount) {
      this.step -= this.scrollableCount;
      this.#checkDisableButtons();
    }
  }

  /**
   * Прокручивает слайдер вправо
   */
  #moveRight() {
    const nextPosition = this.position - (this.slideWidth * this.scrollableCount);

    this.position = Math.max(nextPosition, this.maxScrollPos);
    this.sliderSlides.style.transform = `translateX(${this.position}px)`;

    if (this.step <= this.maxStep) {
      this.step += this.scrollableCount;
      this.#checkDisableButtons();
    }
  }

  /**
   * Проверяет возможность нажатия кнопок для прокрутки
   */
  #checkDisableButtons() {
    const leftButtonMethod = this.step <= this.scrollableCount ? 'setAttribute' : 'removeAttribute';
    const rightButtonMethod = this.step >= (this.slidesCount - (this.visebleCount - this.scrollableCount)) ? 'setAttribute' : 'removeAttribute';

    this.buttonLeft[leftButtonMethod]('disabled', 'disabled');
    this.buttonRight[rightButtonMethod]('disabled', 'disabled');
  }
}

export default Slider;
