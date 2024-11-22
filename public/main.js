const thumbUp = document.getElementsByClassName('fa-thumbs-up')
const trash = document.getElementsByClassName('fa-trash')
const thumbsDown = document.getElementsByClassName('fa-thumbs-down')

Array.from(thumbUp).forEach(element => {
    element.addEventListener('click', function(){
        const stageName = this.parentNode.parentNode.childNodes[1].innerText
        const birthName = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'stageName': stageName,
              'birthName': birthName,
              'thumbUp':thumbUp
            })
          })
          .then(response => {
            if (response.ok) return response.json()
          })
          .then(data => {
            console.log(data)
            window.location.reload(true)
          })
    })
})
Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
        const stageName = this.parentNode.parentNode.childNodes[1].innerText
        const birthName = this.parentNode.parentNode.childNodes[3].innerText
      fetch('messages', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'stageName': stageName,
          'birthName': birthName
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});

Array.from(thumbsDown).forEach(element => {
  element.addEventListener('click', function(){
      const stageName = this.parentNode.parentNode.childNodes[1].innerText
      console.log(this.parentNode.parentNode)
      const birthName = this.parentNode.parentNode.childNodes[3].innerText
      console.log(birthName)
      const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
      fetch('removeLike', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'stageName': stageName,
            'birthName': birthName,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
  })
})