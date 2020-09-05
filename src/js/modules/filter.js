const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll('.all'),
        no = document.querySelector('.portfolio-no');
        
    const typeFilter = (markType) => {
        markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });
        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        if(markType){
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        }else{
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    };

    const selectorBtn = ['.all', '.lovers', '.chef', '.girl', '.guy', '.grandmother', '.granddad'],
        keyMark = ['.all', '.lovers', '.chef', '.girl', '.guy'];

    function queryElements(array, parent, all = false){
        const elements = [];
        if (all){
            array.forEach(item => {
                elements.push(parent.querySelectorAll(item));
            });
        }else {
            array.forEach(item => {
                elements.push(parent.querySelector(item));
            });
        }
        return elements;
    }

    const btns = queryElements(selectorBtn, menu),
        marks = queryElements(keyMark, wrapper, true);

    btns.forEach((item, i) => {
        item.addEventListener('click', () => {
            typeFilter(marks[i]);
        });
    });

    menu.addEventListener('click', (e) => {
        let target = e.target;

        if(target && target.tagName == "LI"){
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
        }
    });
};
export default filter;