import path from './path.js';

class Game {
  constructor() {
    /**
     * Html элемент канваса
     * @type {HTMLCanvasElement}
     */
    this.canvas = null;

    /**
     * Контекст канваса
     * @type {CanvasRenderingContext2D}
     */
    this.context = null;

    /**
     * Пути движения анимации
     * @type {Array<Array<{x: number, y: number}>>}
     */
    this.path = null;

    /**
     * Всего переходов
     * @type {number}
     */
    this.maxStep = 0;

    /**
     * Текущий номер перехода
     * @type {number}
     */
    this.currentStep = 0;

    /**
     * Проигрывается ли сейчас анимация перехода
     * @type {boolean}
     */
    this.isAnimationPlaying = false;

    /**
     * Кнопка для запуска перехода
     * @type {HTMLElement}
     */
    this.playButton = null;

    /**
     * Объект с персонажем
     * @type {{image: HTMLImageElement, width: number, height: number}}
     */
    this.character = null;

    /**
     * Время в мс на переход от одной точки к другой
     * @type {number}
     */
    this.timeOneMovement = 800;
  }

  /**
   * Инициализация компонента
   * @param {{button: HTMLElement, canvas: HTMLCanvasElement}} options - опции
   */
  init(options) {
    this.playButton = options.button;
    this.canvas = options.canvas;

    this.context = this.canvas.getContext('2d');
    this.path = path;
    this.maxStep = path.length;

    this.#bindEvents();
  }

  /**
   * Устанавливает картинку персонажа для игры
   * @param {{src: string, width: number, height: number}} options - опции
   */
  setImageCharacter(options) {
    const { x, y } = this.path[0][0];

    this.character = {
      image: new Image(),
      width: options.width,
      height: options.height,
    };

    this.character.image.onload = () => {
      this.context.drawImage(this.character.image, x, y, this.character.width, this.character.height);
    };

    this.character.image.src = options.src;
  }

  /**
   * Навешивает обработчики событий
   */
  #bindEvents() {
    this.playButton.addEventListener('click', () => {
      if (this.currentStep >= this.maxStep) {
        console.log('Движение персонажа окончено');

        return;
      }

      if (this.isAnimationPlaying) {
        console.log('Дождитесь окончания проигрывания анимации');

        return;
      }

      this.#playAnimation();
      this.currentStep++;
    });
  }

  /**
   * Отрисовка перехода меджу двумя позициями
   * @param {function} draw - функция отрисовки
   * @param {number} duration - продолжительность перехода
   * @param {function} callback - функция вызываемая в конце перехода
   */
  #render({ draw, duration, callback }) {
    const start = performance.now();

    const animate = (time) => {
      const timeFraction = (time - start) / duration;

      if (timeFraction >= 1) {
        callback();

        return;
      }

      draw(timeFraction);

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  /**
   * Запуск анимации
   */
  #playAnimation() {
    // Устанавливаем флаг, что сейчас идёт анимация
    this.isAnimationPlaying = true;

    // Массив позиций для движения
    const currentPathArray = this.path[this.currentStep];

    if (this.currentStep > 0) {
      const prevPath = this.path[this.currentStep - 1];
      const prevPosition = prevPath[prevPath.length - 1];

      currentPathArray.unshift(prevPosition);
    }

    // Всего движений в текущей анимации
    const maxMovements = currentPathArray.length - 1;
    // Рассчитываем время движения от одной точки до следующей
    const durationAnim = this.timeOneMovement / (maxMovements);

    // Текущий шаг движения
    let currentMovement = 0;
    // Направление движения по оси X
    let directionX = 1;
    // Направление движения по оси Y
    let directionY = 1;

    // Функция для анимации
    const animate = () => {
      // Проверяем что движение закончилось
      if (currentMovement >= maxMovements) {
        this.isAnimationPlaying = false;

        return;
      }

      // Определяем направление движения
      directionX = currentPathArray[currentMovement].x > currentPathArray[currentMovement + 1].x ? -1 : 1;
      directionY = currentPathArray[currentMovement].y > currentPathArray[currentMovement + 1].y ? -1 : 1;

      // Функция отрисовки движения
      const draw = (progress) => {
        const distanceToNextPosX = Math.abs(currentPathArray[currentMovement].x - currentPathArray[currentMovement + 1].x);
        const distanceToNextPosY = Math.abs(currentPathArray[currentMovement].y - currentPathArray[currentMovement + 1].y);
        const x = currentPathArray[currentMovement].x + ((distanceToNextPosX * directionX) * progress);
        const y = currentPathArray[currentMovement].y + ((distanceToNextPosY * directionY) * progress);

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.character.image, x, y, this.character.width, this.character.height);
      };

      // Функция вызываемая в конце движения
      const callbackAnimationEnd = () => {
        currentMovement++;
        animate();
      };

      this.#render({
        duration: durationAnim,
        draw: draw.bind(this),
        callback: callbackAnimationEnd,
      });
    };

    // Вызываем функцию для отрисовки анимации
    animate();
  }
}

export default Game;
