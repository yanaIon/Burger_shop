(function () {
  class Slider {
    constructor(props) {
      const { selector } = props;
      this.position = 0;
      this.selector = selector;
      this.sliderDomElem = document.querySelector(selector);
      this.sliderRightButton = this.sliderDomElem.querySelector(
        '.scroll-down-btn__right'
      );
    }

    handleClick(e) {}

    slideRight() {
      // прокрутить на один вправо
      // this
    }
  }

  const slider = new Slider({ selector: '.module-slider' });

  console.log(slider);
})();
