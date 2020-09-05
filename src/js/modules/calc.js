const calc = (size, material, options, promocode, result, state) => {
    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promcodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);

    let sum = 0;

    const calcFunction = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == '' || materialBlock.value == ''){
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        }else if(promcodeBlock.value === 'IWANTPOPART'){
            resultBlock.textContent = Math.round(sum * 0.7);
        } else{
            resultBlock.textContent = sum;
        }
    };

    function bindActionToElems(elem, prop){
        if(prop == 'promcode'){
            state[prop] = elem.value;
        }else{
            elem.forEach(item => {
                if (item.getAttribute('value') == elem.value){
                    state[prop] = item.textContent;
                }
            });
        }
        state.price = resultBlock.textContent.replace(/\D/g, '');
        //console.log(state);
    }

    sizeBlock.addEventListener('change', (e) => {
        calcFunction();
        bindActionToElems(e.target, 'size');
    });
    materialBlock.addEventListener('change', (e) => {
        calcFunction();
        bindActionToElems(e.target, 'material');
    });
    optionsBlock.addEventListener('change', (e) => {
        calcFunction();
        bindActionToElems(e.target, 'options');
    });
    promcodeBlock.addEventListener('input', (e) => {
        calcFunction();
        bindActionToElems(e.target, 'promcode');
    });

};
export default calc;
