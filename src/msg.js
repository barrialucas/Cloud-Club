const socket=io.connect();

const render=(data)=>{
    const html=data.map((e)=>{
        return(`
            <div class="col-xxl-3 caja-coment m-2 p-3" style="margin-bottom:20px; background-color:#f8f9fa">
                <strong style="color:black">${e.name}</strong><br>
                <em style="color:#343a40">${e.text}</em><br>
                <text style="color:brown">[${e.date}]</text>
            </div>
        `)
    }).join(` `);
    document.getElementById(`chat`).innerHTML=html
}

const form=document.getElementById(`form`)
form.addEventListener(`submit`, (e)=>{
    e.preventDefault();
    
    let date = new Date().toLocaleDateString()
    let hora = new Date().toLocaleTimeString()

    const message={
        name:document.getElementById(`mail`).value,
        text:document.getElementById(`text`).value,
        fecha:date +" "+ hora
    }
    
    socket.emit(`new-msg`, message);
    return false;
})


socket.on(`message`,(data)=>{
    render(data)
})