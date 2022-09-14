//home

function getRoot(req, res) {
    res.render("home")//error
}
//info
function info(req, res) {
    res.json({
    "Argumentos de entrada": process.argv,
    "Nombre de la plataforma": process.platform,
    "Versión de node": process.version,
    "Memoria total reservada": process.memoryUsage(),
    "Path de ejecución": process.execPath,
    "Process ID": process.pid,
    "Carpeta del proyecto": process.cwd()
    })
}

module.exports ={getRoot,info}