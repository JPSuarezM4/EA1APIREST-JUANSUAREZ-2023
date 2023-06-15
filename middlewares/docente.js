
// Middleware para verificar el rol de docente o administrador
const verificarRolDocente = (req, res, next) => {
    // Verificar si el usuario tiene el rol de docente o administrador
    if (req.usuario.rol !== 'docente') {
      return res.status(403).json({ msg: 'Acceso no autorizado. Solo los docentes y administradores pueden acceder a esta funcionalidad.' });
    }
  
    // Si el usuario tiene el rol de docente o administrador, continuar con la siguiente función de middleware
    next();
  };
 
  module.exports = {
    verificarRolDocente
  };