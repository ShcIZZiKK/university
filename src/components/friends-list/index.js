import data from '@/app/data';
import Slider from '@/components/slider';
import listTemplate from './parts/friends.twig';

class FriendsList {
  constructor() {
    /**
     * Обёртка компонента
     * @type {HTMLElement}
     */
    this.wrapper = null;

    /**
     * Обёртка для вставки списка друзей
     * @type {HTMLElement}
     */
    this.friendsListWrapper = null;
  }

  /**
   * Инициализация компонента
   * @param {HTMLElement} wrapper
   */
  init(wrapper) {
    this.wrapper = wrapper;
    this.friendsListWrapper = wrapper.querySelector('.js-friends-wrapper');

    this.#setFriendsList();
  }

  /**
   * Выводит список друзей на страницу
   */
  #setFriendsList() {
    const { friends } = data;

    // Генерируем новое поле fullName для каждого элемента
    friends.forEach((friend) => {
      friend.fullName = `${friend?.name} ${friend?.lastName}`;
    });

    // Выводим список друзей на страницу
    this.friendsListWrapper.insertAdjacentHTML('beforeend', listTemplate({ list: friends }));

    // Если обёртка имеет класс слайдера, инициализируем слайдер
    if (this.wrapper.classList.contains('js-slider')) {
      const slider = new Slider();

      slider.init({
        slider: this.wrapper,
        scrollableCount: 1,
      });
    }
  }
}

export default FriendsList;
