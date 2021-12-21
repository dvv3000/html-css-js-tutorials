data = [
        {
            name: 'Haweye',
            imgSource: 'images/haweye.jpg',
            role: 'Using achery',
        },
        {
            name: 'Spiderman',
            imgSource: 'images/spiderman.jpg',
            role: 'Using spider sticky web',
        },
        {
            name: 'Loki',
            imgSource: 'images/loki.jpg',
            role: 'Using magic'
        },
        {
            name: 'Doctor Strange',
            imgSource: 'images/doctorstrange.jpg',
            role: 'Using magic'
        }
]


let teamElement = document.querySelector('.team')
let html = ''

data.forEach((data) => {
    html += `
    <div class="card">
    <div class="card__info">
        <div class="card__img">
            <img src="${data.imgSource}" alt="">
        </div>
        <h2>${data.name}</h2>
        <p>${data.role}</p>
    </div>

    <div class="card__social">
        <ul>
            <li><a href=""><i class='bx bxl-meta' ></i></a></li>
            <li><a href=""><i class='bx bxl-youtube' ></i></a></li>
            <li><a href=""><i class='bx bxl-tiktok' ></i></a></li>
            <li><a href=""><i class='bx bxl-github' ></i></a></li>
        </ul>
    </div>
    <button class="contact-btn">Contact me</button>
</div>
    `
}
)

teamElement.innerHTML = html
