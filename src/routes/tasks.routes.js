const {
    Router
} = require('express')
const router = Router();

const pool = require('../db')

const {
    obtenertipoUsuarios,
    creartipoUsuario,
    obtenertipoUsuario,
    actualizartipoUsuario,
    eliminartipoUsuario,
    obtenerPermisos,
    crearPermiso,
    obtenerPermiso,
    actualizarPermiso,
    eliminarPermiso,
    obtenerUsuarios,
    crearUsuario,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario,
    obtenerPedidos,
    crearPedido,
    obtenerPedido,
    actualizarPedido,
    eliminarPedido,
    asignarPermiso,
    permisosxtipousuario,
    quitarPermiso,

    crearMensaje,
    pedidosXusuario,
    pedidoscodigo,
    mensajesXremitente,
    mensajesXdestinatario,
    mensajesXpedido,
    verificarUsuario,
    pedidosXrepartidor,
    pedidosXempresa,
    obtenerNombreRepartidores,
    obtenernombreUsuario,
    actualizarUsuarioContraseña,

} = require('../controllers/tasks.controllers')

router.get('/tipousuarios',
    obtenertipoUsuario)
router.post('/tipousuarios',
    creartipoUsuario)
router.get('/tipousuarios/:id',
    obtenertipoUsuario)
router.put('/tiposusuarios/:id', actualizartipoUsuario)
router.delete('/tipousuarios/:id', eliminartipoUsuario)
router.get('/permisos', obtenerPermisos)
router.post('/permisos', crearPermiso)
router.get('/permisos/:id', obtenerPermiso)
router.put('/permisos/:id', actualizarPermiso)
router.delete('/permisos/:id', eliminarPermiso)
router.get('/usuarios', obtenerUsuarios)
router.post('/usuarios', crearUsuario)
router.get('/usuarios/:id', obtenerUsuario)
router.put('/usuarios/:id', actualizarUsuario)
router.delete('/usuarios/:id', eliminarUsuario)
//router.get('/pedidos', obtenerPedidos)
router.post('/pedidos', crearPedido)
router.get('/pedidos/:id', obtenerPedido)
router.put('/pedidos/:id', actualizarPedido)
router.delete('/pedidos/:id', eliminarPedido)
router.post('/asignarpermiso', asignarPermiso)
router.get('/permisosxtipousuario/:id', permisosxtipousuario)
router.delete('/quitarpermiso/:id', quitarPermiso)

router.get('/mensajesXremitente/:id', mensajesXremitente)
router.get('/mensajesXremitente/:id', mensajesXdestinatario)
router.get('/pedidosXusuario/:id', pedidosXusuario)
router.get('/pedidosCodigo/:id', pedidoscodigo)
router.post('/mensajes', crearMensaje)
router.get('/mensajesXpedido/:id', mensajesXpedido)
router.post('/verificarUsuario', verificarUsuario)
router.post('/login', verificarUsuario)
router.get('/pedidosXrepartidor/:id', pedidosXrepartidor)

router.get('/pedidosXempresa/:id', pedidosXempresa)
router.get('/nombreRepartidores', obtenerNombreRepartidores)
router.get('/nombreUsuario/:id', obtenernombreUsuario)
router.put('/actualizarUsuarioContraseña/:id', actualizarUsuarioContraseña)
//Actualizado el crear usuario
module.exports = router;

// fw4h0IvMUMhNLaCO contraselña de la base de datos