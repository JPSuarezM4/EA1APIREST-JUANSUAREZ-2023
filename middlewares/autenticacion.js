const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.header('Authorization');

  // Verificar si el token está presente
  if (!token) {
    return res.status(401).json({ msg: 'Acceso no autorizado. No se proporcionó un token.' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, 'secreto'); 

    // Pasar los datos decodificados al objeto de solicitud
    req.usuario = decoded.usuario;

    // Continuar con la siguiente función de middleware
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido.' });
  }
};

module.exports = {
  verificarToken
};
