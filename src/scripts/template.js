(function () {
  let template = document.querySelector('.nav'); // нашли элемент в который будем добавлять fullscrin

  // нашли кнопку для обработчика событий
  let menuLink = document.querySelector('.hamburger-menu-link');

  function handler() {
    // Этот метод добавляет элементу класс, указанный в скобках
    template.classList.add('fullscrin');
  }
  //обработчик событий по клику
  menuLink.addEventListener('click', handler);

  //нашли кнопку для того, что бы закрыть fullscrin
  let close = document.querySelector('.close');

  function handler1() {
    //Этот метод удаляет из элемента класс, указанный в скобках
    template.classList.remove('fullscrin');
  }
  //обработчик событий по клику на закрытие
  close.addEventListener('click', handler1);
})();

//повесить класс на боди оверфлов хидден когда открывается полноэкранное меню
//когда закрываемБ отменить это
