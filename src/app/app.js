import FriendsList from '@/components/friends-list';
import Rating from '@/components/rating';
import Game from '@/components/game';

import characterImage from '@/assets/images/interactive/girl.png';

// Если нужно отладить движение девушки, импортируем этот файл
// import '@/components/debugger';

document.addEventListener('DOMContentLoaded', () => {
// Вывод рейтинга
  const popupRatingButton = document.querySelector('.js-popup-rating');
  const ratingWrapper = document.querySelector('.js-rating');

  if (popupRatingButton) {
    const rating = new Rating();

    rating.init(popupRatingButton, ratingWrapper);
  }

  // Список друзей
  const friendsWrapper = document.querySelector('.js-friends');

  if (friendsWrapper) {
    const friendsList = new FriendsList();

    friendsList.init(friendsWrapper);
  }

  // Передвижение персонажа
  const canvas = document.getElementById('game');
  const gameButton = document.querySelector('.js-character-move');

  if (canvas && gameButton) {
    const game = new Game();

    game.init({
      button: gameButton,
      canvas,
    });

    game.setImageCharacter({
      src: characterImage,
      width: 21,
      height: 69,
    });
  }
});
