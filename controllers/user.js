const user = {}

user.usuariosGet = (req, res) => {
    // Parametos de url despues de ?
    const params = req.query;
    console.log(params);

    res.status(200).json({
        ok: true,
        message: 'success get'
    })  
}

user.usuariosPost = (req, res) => {
    console.log(req.body);
    res.status(200).json({
        ok: true,
        message: 'success post'
    })  
}

user.usuariosPut = (req, res) => {
    const { id } = req.params
    console.log(id);
    res.status(200).json({
        ok: true,
        message: 'success put'
    })  
}

user.usuariosDelete = (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'success delete'
    })  
}

module.exports = user