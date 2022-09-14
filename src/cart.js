const price=document.getElementsByClassName('price')
const final = document.getElementById('precioFinal')

const borrar = document.getElementsByClassName('delete')


let precioFinal;


//precio total
const renderPrecio = () => {
    let precioFinal = 0
    for (const p of price) {
        precioFinal += Number(p.innerHTML)
    } final.innerText = `$${precioFinal}`
}
renderPrecio()


//borrar producto
for (const b of borrar) {
    b.addEventListener('click', () => {
        const prod = b.getAttribute('data-id')
        const options = {
            method: 'DELETE',
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
            
        }
        fetch(`/cart/${prod}`, options)
            .then(dat => console.log(dat))
            .catch(err => console.log(err))
    })
}
//borrar carro

function borrarCart(){
    const options = {
        method: 'DELETE',
    }
    fetch(`/cart`, options)
        .then(dat => console.log(dat))
        .catch(err => console.log(err))
      
}


//confirmar orden

function confirm(){
    const precio={precio:precioFinal}
    const options = {
        method: 'POST',
        body: JSON.stringify(precio),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }
    fetch('/order', options)
            .then(res => res.json)
            .then(dat => console.log(dat))
            .catch(err => console.log(err))
}
    
        










