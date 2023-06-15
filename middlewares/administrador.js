const verificarPermisoAdministrador = (req, res, next) => {
  // Verificar si el usuario tiene el rol de administrador
  if (req.usuario.rol === 'administrador') {
    return res.status(403).json({ msg: 'Acceso denegado. No tienes los permisos de administrador.' });
  }
  
  // Si el usuario tiene el rol de administrador, permite el acceso al siguiente middleware o controlador
  next();
};

module.exports = {
  verificarPermisoAdministrador
};
