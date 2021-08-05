(function () {
    //********** 1 */
    let item = document.querySelectorAll('.acco__item'); // нашли элемент с которым будем работать
    //********** 1 */

    //********** 3 */
    function handler(event) {
        //********** 4 */
        const elem = findParentByClassName('acco__item', event.target); //нашли элемент li, на который нажимаем
        //********** 4 */

        //********** 5 */
        for (let i = 0; i < item.length; i++) {
            if (item[i].classList.contains("acco__item_active") === true && item[i] !== elem) {
                item[i].classList.remove('acco__item_active')
            }
        };
        //********** 5 */


        //********** 6 */
        elem.classList.toggle('acco__item_active'); // добавили или убрали active
        //********** 6 */
    }
    //********** 3 */



    //********** 2 */
    for (let i = 0; i < item.length; i++) {
        item[i].addEventListener('click', handler);   //обработчик событий по клику
    };
    //********** 2 */

  })();


  const findParentByClassName = (className, child) => {
      if (child.parentElement) {
          if(child.parentElement.classList.contains(className)) {
              return child.parentElement;
          } else {
            findParentByClassName(className, child.parentElement);
          }
      }

      return null;
  }