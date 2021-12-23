let openModalElement = document.querySelector('.open-modal-btn')
let modalElement = document.querySelector('.modal')
let closeBtnElement = document.querySelector('.close-btn')
let xBtnElement = document.querySelector('.modal__header .bx')

function toggleModal() {
    // console.log(e)
    modalElement.classList.toggle('hide')
}

openModalElement.addEventListener('click', toggleModal)
closeBtnElement.addEventListener('click', toggleModal)
xBtnElement.addEventListener('click', toggleModal)
modalElement.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) toggleModal()
})