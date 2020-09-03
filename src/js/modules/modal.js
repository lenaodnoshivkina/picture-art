const modals = () => {

    const scroll = calcScroll();
    let btnPressed;

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false){

        const trigger = document.querySelectorAll(triggerSelector),
        modal =  document.querySelector(modalSelector),
        close = modal.querySelector(closeSelector),
        windows = document.querySelectorAll('[data-modal]');
    

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target){
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy){
                    item.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');        
                });

                openModal(modalSelector, scroll);
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';        
            });

            closeModal(modalSelector);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal){
                windows.forEach(item => {
                    item.style.display = 'none';        
                });

                closeModal(modalSelector);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.style.display == 'block'){
                windows.forEach(item => {
                    item.style.display = 'none';        
                });

                closeModal(modalSelector);
            }
        });
    }
    
    function openModal(modalSelector, marginRight){
        const modal =  document.querySelector(modalSelector);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${marginRight}px`;
    }
    
    function closeModal(modalSelector){
        const modal =  document.querySelector(modalSelector);
        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
    }

    function showModalByTime(selector, time){
        setTimeout(function() {
            let display;
            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none'){
                    display = 'block';
                }
            });

            if(!display){
                openModal(selector, scroll);
                document.body.style.marginRight = `${scroll}px`;
            }
            
        }, time);
    }

    function calcScroll(){
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function showModalByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnPressed && (window.pageYOffset + document.
                documentElement.clientHeight >= document.
                documentElement.scrollHeight)){
                    document.querySelector(selector).click();
                    window.removeEventListener('scroll', showModalByScroll);
                }
        });
    }
    

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);

    showModalByScroll('.fixed-gift');

    showModalByTime('.popup-consultation', 5000);

};

export default modals;