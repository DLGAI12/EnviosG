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
        correo,
        contraseña,
    } = req.body
    try {
        // Verifica si el id_tipo_usuario existe en la tabla TipoUsuario
        const tipoUsuario = await pool.query("SELECT * FROM TipoUsuario WHERE id_tipo_usuario = $1", [id_tipo_usuario]);
        const correos = await pool.query("SELECT * FROM Usuarios WHERE correo = $1", [correo]);
        if (correos.rows.length > 0) {
            return res.status(400).json({
                message: 'El correo ya existe.'
            });
        }
        if (tipoUsuario.rows.length === 0) {
            return res.status(400).json({
                message: 'El tipo de usuario especificado no existe.'
            });
        }

        // Si existe, procede con la inserción
        const result = await pool.query(
            "INSERT INTO Usuarios (nombre, id_tipo_usuario, direccion, correo, contraseña) VALUES ($1, $2, $3, $4,$5) RETURNING *",
            [nombre, id_tipo_usuario, direccion, correo, contraseña]
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
        correo
    } = req.body; // Obtener el nuevo nombre_tipo del cuerpo de la solicitud

    try {
        const result = await pool.query(
            "UPDATE Usuarios SET nombre = $1 ,id_tipo_usuario=$2,direccion=$3,correo=$4 WHERE id_usuario = $5",
            [nombre, id_tipo_usuario, direccion, correo, id_usuario]
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

const actualizarUsuarioContraseña = async (req, res, next) => {
    const {
        id_usuario
    } = req.params; // Obtener el ID del permiso a actualizar
    const {
        nombre,
        contraseña

    } = req.body; // Obtener el nuevo nombre_tipo del cuerpo de la solicitud

    try {
        const result = await pool.query(
            "UPDATE Usuarios SET nombre = $1 ,contraseña =$2 WHERE id_usuario = $3",
            [nombre, contraseña, id_usuario]
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
    //Cambi

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
    const longitud = 8;
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const claveAleatoria = Array.from({
        length: longitud
    }, () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join('');

    const {
        codigo,
        nombre_receptor,
        correo_receptor,
        id_repartidor,
        estado_pedido,
        direccion_entrega,
        descripcion,
        id_empresa
    } = req.body;

    try {
        // Verificación de existencia del código de pedido
        const codigoPedidoExistente = await pool.query("SELECT codigo_pedido FROM Pedidos WHERE codigo_pedido = $1", [codigo]);
        if (codigoPedidoExistente.rows.length > 0) {
            return res.status(400).json({
                message: 'El código de pedido ya existe.'
            });
        }

        // Verificación de existencia del correo y tipo de usuario
        const correoExistente = await pool.query("SELECT id_usuario, id_tipo_usuario FROM Usuarios WHERE correo = $1", [correo_receptor]);

        if (correoExistente.rows.length === 0) {
            // Si el correo no existe, crear el receptor con el tipo de usuario correspondiente
            const nuevoUsuario = await pool.query(
                "INSERT INTO Usuarios (nombre, id_tipo_usuario, correo, contraseña) VALUES ($1, 1, $2, $3) RETURNING id_usuario",
                [nombre_receptor, correo_receptor, claveAleatoria]
            );
            idReceptor = nuevoUsuario.rows[0].id_usuario;
        } else {
            // Si el correo existe, verificar que es un receptor (id_tipo_usuario = 1)
            if (correoExistente.rows[0].id_tipo_usuario !== 1) {
                return res.status(400).json({
                    message: 'El correo especificado no es de un receptor'
                });
            }
            idReceptor = correoExistente.rows[0].id_usuario;
        }

        // Creación del pedido
        const nuevoPedido = await pool.query(
            "INSERT INTO Pedidos (codigo_pedido, id_receptor, id_repartidor, id_empresa, estado_pedido, direccion_entrega, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [codigo, idReceptor, id_repartidor, id_empresa, estado_pedido, direccion_entrega, descripcion]
        );

        res.json({
            pedido: nuevoPedido.rows[0],
            message: "Pedido y usuario creados exitosamente, correo enviado"
        });

    } catch (error) {
        next(error);
    }
};

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
        const result = await pool.query("SELECT * FROM Pedidos WHERE id_pedido = $1", [id]);

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




const pedidosXusuario = async (req, res, next) => {
    const {
        id
    } = req.params;

    try {
        const allTasks = await pool.query('select * from Pedidos p  join Usuarios u ON p.id_receptor=u.id_usuario where p.id_receptor=$1', [id])

        res.json(allTasks.rows)
    } catch (error) {

        next(error)
    }


}

const pedidosXempresa = async (req, res, next) => {
    const {
        id
    } = req.params;

    try {
        const allTasks = await pool.query('select * from Pedidos p  join Usuarios u ON p.id_empresa=u.id_usuario where p.id_empresa=$1', [id])

        res.json(allTasks.rows)
    } catch (error) {

        next(error)
    }


}

const pedidosXrepartidor = async (req, res, next) => {
    const {
        id
    } = req.params;

    try {
        const allTasks = await pool.query('select * from Pedidos p  join Usuarios u ON p.id_repartidor=u.id_usuario where p.id_repartidor=$1', [id])

        res.json(allTasks.rows)
    } catch (error) {

        next(error)
    }

}


const mensajesXremitente = async (req, res, next) => {
    // Cambia esto para obtener el id de req.params
    const {
        id
    } = req.params; // Ahora estás usando el parámetro de la URL

    console.log(id); // Verifica que estás recibiendo el ID correcto

    try {
        const result = await pool.query("SELECT * FROM Mensajes WHERE id_remitente = $1", [id]);

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

const crearMensaje = async (req, res, next) => {
    const {

        id_pedido,
        id_remitente,
        id_destinatario,
        contenido,
    } = req.body
    try {
        // Verifica si el id_tipo_usuario existe en la tabla TipoUsuario
        const remitente = await pool.query("SELECT * FROM Usuarios WHERE id_usuario = $1", [id_remitente]);
        const destinatario = await pool.query("SELECT * FROM Usuarios WHERE id_usuario = $1", [id_destinatario]);
        const pedido = await pool.query("SELECT * FROM Pedidos WHERE id_pedido = $1", [id_pedido]);

        if (remitente.rows.length === 0 && destinatario.rows.length === 0 && pedido.rows.length === 0) {
            return res.status(400).json({
                message: 'El tipo de usuario especificado no existe.'
            });
        }

        // Si existe, procede con la inserción
        const result = await pool.query(
            "INSERT INTO Mensajes (id_pedido, id_remitente, id_destinatario, contenido) VALUES ($1, $2, $3, $4) RETURNING *",
            [id_pedido, id_remitente, id_destinatario, contenido]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}
const pedidoscodigo = async (req, res, next) => {
    // Cambia esto para obtener el id de req.params
    const {
        id
    } = req.params; // Ahora estás usando el parámetro de la URL


    try {
        const result = await pool.query("SELECT * FROM Pedidos WHERE codigo_pedido = $1", [id]);

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

const mensajesXpedido = async (req, res, next) => {
    // Cambia esto para obtener el id de req.params
    const {
        id
    } = req.params; // Ahora estás usando el parámetro de la URL

    console.log(id); // Verifica que estás recibiendo el ID correcto

    try {
        const result = await pool.query("SELECT * FROM Mensajes WHERE id_pedido= $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'No se encontró ningún tipo de usuario'
            });
        }

        res.json(result.rows); // Devuelve el primer resultado encontrado
    } catch (error) {
        next(error); // Maneja el error
    }
};

const mensajesXdestinatario = async (req, res, next) => {
    // Cambia esto para obtener el id de req.params
    const {
        id
    } = req.params; // Ahora estás usando el parámetro de la URL

    console.log(id); // Verifica que estás recibiendo el ID correcto

    try {
        const result = await pool.query("SELECT * FROM Mensajes WHERE id_destinatario = $1", [id]);

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
const verificarUsuario = async (req, res) => {
    const {
        correo,
        contraseña
    } = req.body; // Extrae los datos del cuerpo de la solicitud

    try {
        // Buscar el usuario por correo
        const result = await pool.query(
            'SELECT id_usuario, id_tipo_usuario, nombre, correo, contraseña FROM Usuarios WHERE correo = $1',
            [correo]
        );

        // Verificar si el usuario existe
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        const usuario = result.rows[0];

        // Comparar las contraseñas
        if (usuario.contraseña === contraseña) {
            return res.json({
                success: true,
                usuario: {
                    id: usuario.id_usuario,
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                    id_tipo_usuario: usuario.id_tipo_usuario
                }
            });
        } else {
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al verificar el usuario'
        });
    }
};

const obtenerNombreRepartidores = async (req, res, next) => {

    try {
        const allTasks = await pool.query('select nombre,id_usuario from Usuarios where id_tipo_usuario=2')

        res.json(allTasks.rows)
    } catch (error) {

        next(error)
    }

}

const obtenernombreUsuario = async (req, res, next) => {
    // Cambia esto para obtener el id de req.params
    const {
        id
    } = req.params; // Ahora estás usando el parámetro de la URL

    console.log(id); // Verifica que estás recibiendo el ID correcto

    try {
        const result = await pool.query("SELECT nombre FROM Usuarios WHERE id_usuario = $1", [id]);

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
const verificarPedido = async (req, res, next) => {
    // Cambia esto para obtener el id de req.params
    const {
        id,
        codigo_pedido
    } = req.body; // Ahora estás usando el parámetro de la URL

    try {
        // Consulta a la base de datos
        const result = await pool.query(
            "SELECT * FROM pedidos WHERE id_pedido= $1 and codigo_pedido = $2",
            [id, codigo_pedido]
        );

        // Devuelve true o false dependiendo de si encontró el registro
        const encontrado = result.rows.length > 0;

        // Respuesta JSON con el estado
        res.json({
            encontrado, // Devuelve true o false
            datos: encontrado ? result.rows[0] : null, // Si existe, devuelve el registro, si no, null
        });
    } catch (error) {
        next(error); // Maneja errores con middleware
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
    quitarPermiso,
    pedidosXusuario,
    pedidoscodigo,
    crearMensaje,
    mensajesXpedido,
    mensajesXdestinatario,
    mensajesXremitente,
    verificarUsuario,
    pedidosXrepartidor,
    pedidosXempresa,
    obtenerNombreRepartidores,
    obtenernombreUsuario,
    actualizarUsuarioContraseña,
    verificarPedido

}