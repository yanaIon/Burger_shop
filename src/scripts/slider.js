(function () {
  class Slider {
    constructor(props) {
      const { selector } = props;
      this.position = 0;
      this.selector = selector;
      // Слайдер
      this.sliderDomElem = document.querySelector(selector);
      // Список со слайдами
      this.listDomElem = this.sliderDomElem.querySelector('.slider__lists');
      // Нашла количество элементов в слайдере
      this.elemCount = this.listDomElem.getElementsByClassName(
        'slider__item'
      ).length;
      console.log('Привет', this.elemCount);
      // Правая кнопка
      this.sliderRightButton = this.sliderDomElem.querySelector(
        '.scroll-btn.scroll-btn__right'
      );
      console.log(this);
      // Привязываем this к обработчику т.к. при передаче в слушатель происходит потеря контекста (this)
      this.handleClickRight = this.handleClickRight.bind(this);
      // обработка клика по правой кнопке
      this.sliderRightButton.addEventListener('click', this.handleClickRight);
    }

    handleClickRight() {
      this.slideRight();
    }

    incrementPosition() {
      this.position += 1;
    }

    updateCssPositionOfList() {
      this.listDomElem.style.transform = `translate(${-this.position * 100}%)`;
    }
    slideRight() {
      // метод для листания вправо
      // увеличим позицию на 1
      if (this.position >= this.elemCount - 1) {
        return;
      }
      this.incrementPosition();
      // применим стили
      this.updateCssPositionOfList();
    }
  }

  const slider = new Slider({ selector: '.slider' });

  console.log(slider);
})();
