import Nota from "../models/Nota.js"


const agregarNota = async (req, res) => {
    delete req.body.id
    
    const nota = new Nota(req.body)
    nota.usuario = req.usuario._id;

    
    try {
        const notaAlmacenada = await nota.save()
        res.json(notaAlmacenada);
    } catch (error) {
        console.log(error)
    }

}

const obtenerNotas = async (req, res) => {
    const notas = await Nota.find().where('usuario').equals(req.usuario)

    res.json(notas)
}

const obtenerNota = async (req, res) => {
    const { id } = req.params
    const nota = await Nota.findById(id)

    if (!nota) {
        return res.status(404).json({ msg: 'No Encontrado' })
    }

    if (nota.usuario._id.toString() !== req.usuario._id.toString()){
        return res.json({msg: 'Accion no valida'})
    }
    
    res.json(nota)

}

const actualizarNota = async (req, res) => {
    const { id } = req.params
    const nota = await Nota.findById(id)

    if (!nota) {
        return res.status(404).json({ msg: 'No Encontrado' })
    }

    if (nota.usuario._id.toString() !== req.usuario._id.toString()) {
        return res.json({ msg: 'Accion no valida' })
    }

    // Actualizar paciente
    nota.titulo = req.body.titulo || nota.titulo;
    nota.contenido = req.body.contenido || nota.contenido;
    nota.fecha = req.body.fecha || nota.fecha;


    try {
        const notaActualizada = await nota.save();
        res.json(notaActualizada)
    } catch (error) {
        console.log(error)
    }
}

const eliminarNota = async (req, res) => {
    const { id } = req.params
    const nota = await Nota.findById(id)

    if (!nota) {
        return res.status(404).json({ msg: 'No Encontrado' })
    }

    if (nota.usuario._id.toString() !== req.usuario._id.toString()) {
        return res.json({ msg: 'Accion no valida' })
    }

    try {
        await nota.deleteOne()
        res.json({msg: 'Nota eliminada'})
    } catch (error) {
        console.log(error)
    }
}



export {
    agregarNota,
    obtenerNotas,
    obtenerNota,
    actualizarNota,
    eliminarNota
}