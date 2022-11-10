function add(){
    const array = document.getElementsByClassName('adds')
    for (const b of array) {

            const datos = {
                title: b.getAttribute('data-title'),
                desc:b.getAttribute('data-desc'),
                img: b.getAttribute('data-img'),
                price: b.getAttribute('data-price'),
                id: b.getAttribute('data-id')
        
            }
            const options = {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }
            fetch('/cart', options)
                .then(dat => console.log(dat))
                .catch(err => console.log(err))
        
    }
}
