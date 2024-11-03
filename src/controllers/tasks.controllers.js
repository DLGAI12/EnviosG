const pool = require('../db')

const creartipoUsuario = async (req, res, next) => {
    const {
        nombre_tipo
    } = req.body
    try {
        const result = await pool.query("INSERT INTO tipousuario (nombre_tipo) VALUES ($1) RETURNING * ", [nombre_tipo]);
        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

const actualizartipoUsuario = async (req, res, next) => {
    const {
        id
    } = req.params; // Obtener el ID del permiso a actualizar
    const {
        nombre_tipo
    } = req.body; // Obtener el nuevo nombre_tipo del cuerpo de la solicitud

    try {
        const result = await pool.query(
            "UPDATE tipousuario SET nombre_tipo = $1 WHERE id_tipo_usuario = $2",
            [nombre_tipo, id]
        );

        // Verifica si se actualizó algún registro
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún tipo de usuario'
            });
        }

        // Responde con un mensaje de éxito
        res.json({
            message: 'Permiso actualizado con éxito'
        });
    } catch (error) {
        next(error); // Maneja el error
    }
};


const obtenertipoUsuario = async (req, res, next) => {
    // Cambia esto para obtener el id de req.params
    const {
        id
    } = req.params; // Ahora estás usando el parámetro de la URL

    console.log(id); // Verifica que estás recibiendo el ID correcto

    try {
        const result = await pool.query("SELECT * FROM tipousuario WHERE id_tipo_usuario = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún tipo de usuario'
            });
        }

        res.json(result.rows[0]); // Devuelve el primer resultado encontrado
    } catch (error) {
        next(error); // Maneja el error
    }
};

const obtenertipoUsuarios = async (req, res, next) => {

    try {
        const allTasks = await pool.query('select * from tipousuario')

        res.json(allTasks.rows)
    } catch (error) {

        next(error)
    }

}
const eliminartipoUsuario = async (req, res, next) => {
    const {
        id
    } = req.params; // Obtener el ID del permiso a eliminar

    try {
        const result = await pool.query(
            "DELETE FROM tipousuario WHERE id_tipo_usuario = $1",
            [id]
        );

        // Verifica si se eliminó algún registro
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún tipo de usuario para eliminar'
            });
        }

        // Responde con un mensaje de éxito
        res.json({
            message: 'Permiso eliminado con éxito'
        });
    } catch (error) {
        next(error); // Maneja el error
    }
}

//Permisos

const crearPermiso = async (req, res, next) => {
    const {
        nombre_permiso,
        descripcion
    } = req.body
    try {
        const result = await pool.query("INSERT INTO Permisos (nombre_permiso,descripcion) VALUES ($1,$2) RETURNING * ", [nombre_permiso, descripcion]);
        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

const actualizarPermiso = async (req, res, next) => {
    const {
        id
    } = req.params; // Obtener el ID del permiso a actualizar
    const {
        nombre_permiso,
        descripcion
    } = req.body; // Obtener el nuevo nombre_tipo del cuerpo de la solicitud

    try {
        const result = await pool.query(
            "UPDATE Permisos SET nombre_permiso = $1, descripcion=$2 WHERE id_permiso = $2",
            [nombre_permiso, descripcion, id]
        );

        // Verifica si se actualizó algún registro
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún tipo de usuario'
            });
        }

        // Responde con un mensaje de éxito
        res.json({
            message: 'Permiso actualizado con éxito'
        });
    } catch (error) {
        next(error); // Maneja el error
    }
};


const obtenerPermiso = async (req, res, next) => {
    // Cambia esto para obtener el id de req.params
    const {
        id
    } = req.params; // Ahora estás usando el parámetro de la URL

    console.log(id); // Verifica que estás recibiendo el ID correcto

    try {
        const result = await pool.query("SELECT * FROM Permisos WHERE id_permiso = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún tipo de usuario'
            });
        }

        res.json(result.rows[0]); // Devuelve el primer resultado encontrado
    } catch (error) {
        next(error); // Maneja el error
    }
};

const obtenerPermisos = async (req, res, next) => {

    try {
        const allTasks = await pool.query('select * from Permisos')

        res.json(allTasks.rows)
    } catch (error) {

        next(error)
    }

}
const eliminarPermiso = async (req, res, next) => {
    const {
        id
    } = req.params; // Obtener el ID del permiso a eliminar

    try {
        const result = await pool.query(
            "DELETE FROM Permisos WHERE id_permiso = $1",
            [id]
        );

        // Verifica si se eliminó algún registro
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún tipo de usuario para eliminar'
            });
        }

        // Responde con un mensaje de éxito
        res.json({
            message: 'Permiso eliminado con éxito'
        });
    } catch (error) {
        next(error); // Maneja el error
    }
}


//Usuarios
const crearUsuario = async (req, res, next) => {
    const {
        nombre,
        id_tipo_usuario,
        direccion,
        contacto
    } = req.body
    try {
        // Verifica si el id_tipo_usuario existe en la tabla TipoUsuario
        const tipoUsuario = await pool.query("SELECT * FROM TipoUsuario WHERE id_tipo_usuario = $1", [id_tipo_usuario]);

        if (tipoUsuario.rows.length === 0) {
            return res.status(400).json({
                message: 'El tipo de usuario especificado no existe.'
            });
        }

        // Si existe, procede con la inserción
        const result = await pool.query(
            "INSERT INTO Usuarios (nombre, id_tipo_usuario, direccion, contacto) VALUES ($1, $2, $3, $4) RETURNING *",
            [nombre, id_tipo_usuario, direccion, contacto]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}


const actualizarUsuario = async (req, res, next) => {
    const {
        id_usuario
    } = req.params; // Obtener el ID del permiso a actualizar
    const {
        nombre,
        id_tipo_usuario,
        direccion,
        contacto
    } = req.body; // Obtener el nuevo nombre_tipo del cuerpo de la solicitud

    try {
        const result = await pool.query(
            "UPDATE Usuarios SET nombre = $1 ,id_tipo_usuario=$2,direccion=$3,contacto=$4 WHERE id_usuario = $5",
            [nombre, id_tipo_usuario, direccion, contacto, id_usuario]
        );

        // Verifica si se actualizó algún registro
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún tipo de usuario'
            });
        }

        // Responde con un mensaje de éxito
        res.json({
            message: 'Permiso actualizado con éxito'
        });
    } catch (error) {
        next(error); // Maneja el error
    }
};


const obtenerUsuario = async (req, res, next) => {
    // Cambia esto para obtener el id de req.params
    const {
        id
    } = req.params; // Ahora estás usando el parámetro de la URL

    console.log(id); // Verifica que estás recibiendo el ID correcto

    try {
        const result = await pool.query("SELECT * FROM Usuarios WHERE id_usuario = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún tipo de usuario'
            });
        }

        res.json(result.rows[0]); // Devuelve el primer resultado encontrado
    } catch (error) {
        next(error); // Maneja el error
    }
};

const obtenerUsuarios = async (req, res, next) => {

    try {
        const allTasks = await pool.query('select * from Usuarios')

        res.json(allTasks.rows)
    } catch (error) {

        next(error)
    }

}
const eliminarUsuario = async (req, res, next) => {
    const {
        id
    } = req.params; // Obtener el ID del permiso a eliminar

    try {
        const result = await pool.query(
            "DELETE FROM Usuarios WHERE id_usuario = $1",
            [id]
        );

        // Verifica si se eliminó algún registro
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún tipo de usuario para eliminar'
            });
        }

        // Responde con un mensaje de éxito
        res.json({
            message: 'Permiso eliminado con éxito'
        });
    } catch (error) {
        next(error); // Maneja el error
    }
}

//Pedidos

const crearPedido = async (req, res, next) => {
    const {
        nombre,
        codigo_pedido,
        id_receptor,
        id_usuario,
        estado_pedido,
        direccion_entrega,
        descripcion

    } = req.body
    try {
        // Verifica si el id_tipo_usuario existe en la tabla TipoUsuario
        const receptor = await pool.query("SELECT * FROM TipoUsuario WHERE id_tipo_usuario = $1", [id_receptor])
        const usuario = await pool.query("SELECT * FROM TipoUsuario WHERE id_tipo_usuario = $1", [id_usuario]);

        if (receptor.rows.length === 0 && usuario.rows.length === 0) {
            return res.status(400).json({
                message: 'El tipo de usuario especificado no existe.'
            });
        }

        // Si existe, procede con la inserción
        const result = await pool.query(
            "INSERT INTO Pedidos (nombre, codigo_pedido, id_receptor, id_usuario,estado_pedido,direccion_entrega,descripcion) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING *",
            [nombre, codigo_pedido, id_receptor, id_usuario, estado_pedido, direccion_entrega, descripcion]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}


const actualizarPedido = async (req, res, next) => {
    const {
        id_pedido
    } = req.params; // Obtener el ID del permiso a actualizar
    const {
        nombre,
        codigo_pedido,
        id_receptor,
        id_usuario,
        estado_pedido,
        direccion_entrega,
        descripcion
    } = req.body; // Obtener el nuevo nombre_tipo del cuerpo de la solicitud

    try {
        const result = await pool.query(
            "UPDATE Pedidos SET nombre=$1,codigo_pedido=$2, id_receptor=$3, id_usuario=$4,estado_pedido=$5,direccion_entrega=$6,descripcion=$7 WHERE id_pedido = $8",
            [nombre, codigo_pedido, id_receptor, id_usuario, estado_pedido, direccion_entrega, descripcion, id_pedido]
        );

        // Verifica si se actualizó algún registro
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún tipo de usuario'
            });
        }

        // Responde con un mensaje de éxito
        res.json({
            message: 'Permiso actualizado con éxito'
        });
    } catch (error) {
        next(error); // Maneja el error
    }
};


const obtenerPedido = async (req, res, next) => {
    // Cambia esto para obtener el id de req.params
    const {
        id
    } = req.params; // Ahora estás usando el parámetro de la URL

    console.log(id); // Verifica que estás recibiendo el ID correcto

    try {
        const result = await pool.query("SELECT * FROM Pedidos WHERE id_permisos = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún tipo de usuario'
            });
        }

        res.json(result.rows[0]); // Devuelve el primer resultado encontrado
    } catch (error) {
        next(error); // Maneja el error
    }
};

const obtenerPedidos = async (req, res, next) => {

    try {
        const allTasks = await pool.query('select * from Pedidos')

        res.json(allTasks.rows)
    } catch (error) {

        next(error)
    }

}
const eliminarPedido = async (req, res, next) => {
    const {
        id
    } = req.params; // Obtener el ID del permiso a eliminar

    try {
        const result = await pool.query(
            "DELETE FROM Usuarios WHERE id_pedido = $1",
            [id]
        );

        // Verifica si se eliminó algún registro
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún tipo de usuario para eliminar'
            });
        }

        // Responde con un mensaje de éxito
        res.json({
            message: 'Permiso eliminado con éxito'
        });
    } catch (error) {
        next(error); // Maneja el error
    }
}
//TipoUsuarioPermiso

const asignarPermiso = async (req, res, next) => {
    const {
        id_tipo_usuario,
        id_permiso
    } = req.body
    try {
        // Verifica si el id_tipo_usuario existe en la tabla TipoUsuario
        const tipo_usuario = await pool.query("SELECT * FROM tipousuario WHERE id_tipo_usuario = $1", [id_tipo_usuario])
        const usuario = await pool.query("SELECT * FROM permisos WHERE id_permiso = $2", [id_permiso]);

        if (receptor.rows.length === 0 && usuario.rows.length === 0) {
            return res.status(400).json({
                message: 'El tipo de usuario especificado no existe.'
            });
        }

        // Si existe, procede con la inserción
        const result = await pool.query(
            "INSERT INTO TipoUsuarioPermiso (id_tipo_usuario, id_permiso) VALUES ($1, $2) RETURNING *",
            [id_tipo_usuario, id_permiso]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}


const permisosxtipousuario = async (req, res, next) => {
    // Cambia esto para obtener el id de req.params
    const {
        id
    } = req.params; // Ahora estás usando el parámetro de la URL

    console.log(id); // Verifica que estás recibiendo el ID correcto

    try {
        const result = await pool.query("SELECT p.* FROM Permisos p JOIN TipoUsuarioPermiso tup ON p.id_permiso = tup.id_permiso WHERE tup.id_tipo_usuario = $1rio = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún tipo de usuario'
            });
        }

        res.json(result.rows[0]); // Devuelve el primer resultado encontrado
    } catch (error) {
        next(error); // Maneja el error
    }
};
const quitarPermiso = async (req, res, next) => {
    const {
        tipoUsuarioId,
        permisoId
    } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM TipoUsuarioPermiso WHERE id_tipo_usuario = $1 AND id_permiso = $2",
            [tipoUsuarioId, permisoId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Permiso no encontrado para este tipo de usuario'
            });
        }

        res.json({
            message: 'Permiso eliminado correctamente'
        });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    creartipoUsuario,
    obtenertipoUsuarios,
    obtenertipoUsuario,
    actualizartipoUsuario,
    eliminartipoUsuario,
    obtenerPermisos,
    crearPermiso,
    obtenerPermiso,
    actualizarPermiso,
    eliminarPermiso,
    crearUsuario,
    actualizarUsuario,
    obtenerUsuario,
    obtenerUsuarios,
    eliminarUsuario,
    crearPedido,
    actualizarPedido,
    obtenerPedido,
    obtenerPedidos,
    eliminarPedido,
    asignarPermiso,
    permisosxtipousuario,
    quitarPermiso



}