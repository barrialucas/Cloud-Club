const price=document.getElementsByClassName('price')
const final = document.getElementById('precioFinal')
const borrar = document.getElementById('delete')
let precioFinal=0


//borrar producto
function borrarProd(){
    const prod = borrar.getAttribute('data-id')
    const options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }
    fetch(`/cart/${prod}`, options)
        .then(dat =>console.log(dat))
        .catch(err => console.log(err));
}


//borrar cart / vaciar cart
function borrarCart(){
    const options = {
        method: 'DELETE',
    }
    fetch(`/cart`, options)
        .then(dat =>console.log(dat))
        .catch(err => console.log(err));

}


//confirmar orden
async function confirm(){
    const precio={
        precio:precioFinal
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(precio),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }
    fetch('/cart/order', options)
            .then(res => res.json)
            .catch(err => console.log(err))

    borrarCart()
}

//precio total
const renderPrecio = () => {
    precioFinal = 0

    for (const p of price) {
        precioFinal += Number(p.innerHTML)
    } final.innerText = `$${precioFinal}`
}
renderPrecio()
