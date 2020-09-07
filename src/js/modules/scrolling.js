const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    //скрыть или показать кнопку "наверх" в зависимости от того,
    //сколько пролистал пользователь

    window.addEventListener('scroll', () => { 
        if (document.documentElement.scrollTop > 1650){
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        }else{
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    // Scrolling with requestAnimationFrame

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.7;
    //событие для всех ссылок

    links.forEach(link => {
        link.addEventListener('click', function(e){
            e.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            //scrollTop - расстояние, которое было пролистано сверху
            //toBlock - верхняя граница того эл-та, к которому мы будем скроллить

            requestAnimationFrame(step);

            function step(time){
                if (start === null){
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                //на сколько продвинуть и в какую сторону

                document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock){
                    requestAnimationFrame(step);
                }else {
                    location.hash = hash;
                }
                //когда анимация остановится
            }
        });
    });
 
    //Pure js scrolling

    // const element = document.documentElement,
    //     body = document.body;

    // const calcScroll = () => {
    //     upElem.addEventListener('click', function(event){
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //         //scrollTop - расстояние, которое было пролистано сверху

    //         if (this.hash !== ''){
    //             event.preventDefault();
    //             let hashElement = document.querySelector(this.hash),
    //                 hashElementTop = 0;

    //                 //hashElement - элемент, к которому мы будем скроллить (перемещаться)
    //                 //hashElementTop  - количество пикселей до родителя hashElement
                
    //             while (hashElement.offsetParent) {
    //                 //offsetParent - св-во, которое получает родитель элемента

    //                 hashElementTop += hashElement.offsetTop;
    //                 //offsetTop - параметр, который позволяет узнать, сколько пикселей от hashElement до границы родительского эл-та

    //                 hashElement = hashElement.offsetParent;

    //                 //
    //             }

    //             hashElementTop = Math.round(hashElementTop);
    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // };

    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1,
    //         prevScrollTop,
    //         speed;

    //     if (to > from){
    //         //движение сверху вниз
    //         speed = 30;
    //     }else{
    //         //движение снизу верх
    //         speed = -30;
    //     }

    //     let move = setInterval(function(){
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //         //scrollTop - расстояние, которое было пролистано сверху

    //         if(
    //             prevScrollTop === scrollTop || 
    //             (to > from && scrollTop >= to) || 
    //             (to < from && scrollTop <= to)
    //             //условие - долистали до нужного момента
    //         ){
    //              clearInterval(move);
    //              history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
    //              //убираем знаки # из адресной строки и заменяем на новый
    //         }else{
    //             body.scrollTop += speed;
    //             element.scrollTop += speed;
    //             prevScrollTop = scrollTop;
    //         }
    //     }, timeInterval);
    // };  
    // calcScroll();


};
export default scrolling;