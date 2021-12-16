var users = [
    {
        id : 0,
        name : 'Viet'
    },
    {
        id: 1,
        name: 'Adam'
    },
    {
        id : 2,
        name : 'Zemo'
    },
    {
        id: 3, 
        name : 'Steve'
    }

]

var comments = [
    {
        id: 0,
        userID: 1,
        content: 'Haloooooo'
    },
    {
        id: 2,
        userID: 0,
        content: 'Nice to see you'
    },
    {
        id: 3, 
        userID: 3,
        content: 'Long time no see'
    }
]

function getComments() {
    return new Promise(resolve => {
        resolve(comments)
})
}


function getUsersByIds(userIds) {
    return new Promise (resolve => {
        var result = users.filter(user => userIds.includes(user.id))
        resolve(result)
    })
}

getComments()
        .then((comments => {
            var userIDs = comments.map(comments => comments.userID)
            return getUsersByIds(userIDs)
                            .then(users => {
                                return {
                                    user: users,
                                    comment: comments
                                }
                            })
        }))
        .then(data => {
            var commentBlock = document.getElementById('comment-block')
            var html = ''

            data.comment.forEach(comment => {
                var user = data.user.find(user => user.id === comment.userID)
                html += `<li>${user.name} : ${comment.content}</li>`
                // console.log(html)
            });
            commentBlock.innerHTML = html
        })    




