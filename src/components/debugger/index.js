import template from './debugger.twig';

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', template());

  const canvas = document.getElementById('game');
  const debuggerBlock = document.querySelector('.js-debugger');
  const mouseX = debuggerBlock.querySelector('.js-debugger-x');
  const mouseY = debuggerBlock.querySelector('.js-debugger-y');
  const saveButton = debuggerBlock.querySelector('.js-debugger-add');
  const clearPath = debuggerBlock.querySelector('.js-debugger-clear');
  const pathWrapper = debuggerBlock.querySelector('.js-debugger-path');
  const moveElem = debuggerBlock.querySelector('.js-move-elem');
  let currentCoords = null;
  let path = [];

  const rect = canvas.getBoundingClientRect();

  document.addEventListener('click', (event) => {
    if (event.target.tagName !== 'CANVAS') {
      return;
    }

    const left = event.offsetX - moveElem.clientWidth / 2;
    const top = event.offsetY - moveElem.clientHeight;

    mouseX.innerText = left;
    mouseY.innerText = top;

    moveElem.style.left = `${left + rect.left}px`;
    moveElem.style.top = `${top}px`;

    currentCoords = {
      x: left,
      y: top,
    };
  });

  saveButton.addEventListener('click', () => {
    path.push(currentCoords);
    pathWrapper.innerText = JSON.stringify(path);
  });

  clearPath.addEventListener('click', () => {
    pathWrapper.innerText = '';
    path = [];
  });
});
