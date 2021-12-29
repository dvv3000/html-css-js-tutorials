function showMessage({title, content, type}) {
    const main = document.querySelector('#message')
    if (main) {
        const message = document.createElement("div")
        const icons = {
            success: "<i class='bx bxs-check-square'></i>",
            info: "<i class='bx bxs-info-circle'></i>",
            error: "<i class='bx bxs-error'></i>"
        }


        message.classList.add("message", `message--${type}`)
        message.innerHTML = 
                            `<div class="message__icon">
                                ${icons[type]}
                            </div>
                            <div class="message__content">
                                <h3>${title}</h3>
                                <p>${content}</p>
                            </div>
                            <div class="message__close">
                                <i class='bx bx-x'></i>
                            </div>`
        main.appendChild(message)

        const autoRemoveMessage = setTimeout(() => {
            main.removeChild(message)
        }, 4000)

        message.onclick = (e) => {
            if(e.target.closest(".message__close")) {
                main.removeChild(message)
                clearTimeout(autoRemoveMessage)
            }
        }
    }
}