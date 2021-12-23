
function validator(options) {
    let formElement = document.querySelector(options.form)
    let selectorRules= {}

    if (formElement) {
        formElement.onsubmit = (e) => {
            e.preventDefault()
            let isFormValid = true


            options.rules.forEach(rule => {
                let inputElements = formElement.querySelectorAll(rule.selector)
                for (inputElement of inputElements) {
                    let isValid = validate(inputElement, rule)

                    if(!isValid) {
                        isFormValid = false
                    }
                }
            })


            if(isFormValid) {
                let dataElements = formElement.querySelectorAll('[name]')
                let data = {}
                for(item of dataElements) {
                    if (item.type == 'checkbox' || item.type == 'radio') {
                        if (!item.matches(':checked')) {
                            continue
                        }
                    }
                    data[item.name] = item.value
                    
                }
                options.onSubmit(data)
            }
            else {

            }
        }

        options.rules.forEach((rule) => {
            let inputElements = formElement.querySelectorAll(rule.selector)

            if (Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.getErrorMessage)
            }
            else {
                selectorRules[rule.selector] = [rule.getErrorMessage]
            }
            

            for (inputElement of inputElements) {
                if (inputElement) {
                    // lắng nghe sự kiện onblur
                    inputElement.onblur = () => {
                        validate(inputElement, rule)
                    }
                    // nếu đang có lỗi, oninput thì xóa lỗi đi
                    inputElement.oninput = () => {
                        let errorElement = inputElement.closest(options.formGroupSelector).querySelector('.form-message')
                        errorElement.innerHTML = ''
                        inputElement.closest(options.formGroupSelector).classList.remove('invalid')
                    }
                }
            }

        })
    }

    function validate(inputElement, rule) {
        // let errorMessage = rule.getErrorMessage(inputElement.value)
        let errorElement = inputElement.closest(options.formGroupSelector).querySelector('.form-message')
        let rules = selectorRules[rule.selector]

        for (let i = 0; i < rules.length; i++) {

            switch(inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'))
                    break
                default:
                    errorMessage = rules[i](inputElement.value)
            }
            
            if (errorMessage) break
        }

        if (errorMessage) {
            errorElement.innerHTML = errorMessage
            inputElement.closest(options.formGroupSelector).classList.add('invalid')
        }
        else {
            errorElement.innerHTML = ''
            inputElement.closest(options.formGroupSelector).classList.remove('invalid')
        }

        return !errorMessage
    }
}




validator.isRequired = (selector, message='That field is required not be empty.') => {
    return {
        selector,
        getErrorMessage: (value) => value ? undefined : message,
    }
}

validator.isEmail = (selector, message='That field must be a valid email address.') => {
    return {
        selector,
        getErrorMessage: (value) => {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message
        }
    }
}

validator.isPassword = (selector, message='Password must be minimize 8 characters, at least one letter and one number.') => {
    return {
        selector,
        getErrorMessage: (value) => {
            let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            return regex.test(value) ? undefined : message
        }
    }
}

validator.isConfirmed = (pw, confirmation, message='Failed to confirm password') => {
    return {
        selector: confirmation,
        getErrorMessage: (value) => {
            let password = document.querySelector(pw).value
            return password === value ? undefined : message
        }
    }
}
