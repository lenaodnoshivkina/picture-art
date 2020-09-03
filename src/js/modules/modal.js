const modals = () => {

    function bindModal(triggerSelector, modalSelector, closeSelector, clickOverflow = true){

        const trigger = document.querySelectorAll(triggerSelector),
        modal =  document.querySelector(modalSelector),
        close = modal.querySelector(closeSelector),
        windows = document.querySelectorAll('[data-modal]'),
        scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target){
                    e.preventDefault();
                }

                windows.forEach(item => {
                    item.style.display = 'none';        
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
            if (e.target === modal && clickOverflow){
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

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');

    showModalByTime('.popup-consultation', 5000);

};

export default modals;