var trash = document.getElementsByClassName("fa-trash");
var done = document.getElementsByClassName("fa-check");


Array.from(trash).forEach(function(element) {
      element.addEventListener("click", function(){
        const name = this.parentNode.parentNode.childNodes[3].innerText
        const location = this.parentNode.parentNode.childNodes[7].innerText
        const date = this.parentNode.parentNode.childNodes[11].innerText
        const cell= this.parentNode.parentNode.childNodes[15].innerText
        const msg = this.parentNode.parentNode.childNodes[19].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'location': location,
            'date': date,
            'cell': cell,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

Array.from(done).forEach(function(element) {
  element.addEventListener('click', function(e){
    e.preventDefault()
    const name = this.parentNode.parentNode.childNodes[3].innerText
    const location = this.parentNode.parentNode.childNodes[7].innerText
    const date = this.parentNode.parentNode.childNodes[11].innerText
    const cell= this.parentNode.parentNode.childNodes[15].innerText
    const msg = this.parentNode.parentNode.childNodes[19].innerText
    const complete = e.target.classList.contains('strike') ? true : false  
    fetch('complete', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'location': location,
        'date': date,
        'cell': cell,
        'msg': msg,
        'complete': complete
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
   });
});