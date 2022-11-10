const socket=io.connect();

const render=(data)=>{
    const html=data.map((e)=>{
        return(`
        <div>
        <strong style="color:blue">${e.name}</strong>
        <text style="color:brown">[${e.fecha}]:</text>
        <em style="color:green">${e.text}</em>
        </div>
        `)
    }).join(` `);
    document.getElementById(`chat`).innerHTML=html
}

const form=document.getElementById(`form`)
form.addEventListener(`submit`, (e)=>{
    e.preventDefault();
    
    let fecha = new Date().toLocaleDateString()
    let hora = new Date().toLocaleTimeString()

    const message={
        name:document.getElementById(`mail`).value,
        text:document.getElementById(`text`).value,
        date:fecha +" "+ hora
    }
    
    socket.emit(`new-msg`, message);
    return false;
})


socket.on(`message`,(data)=>{
    render(data)
})