'use strict'

const welcomeMessage = (req, res) => {
    const user = req.session.user

    if (!user) {
        return res.status(401).json({ message: 'Usuario no autenticado' })
    }

    return res.status(200).json({ message: `Bienvenido, ${user.email}! Rol: ${user.role}` })
}

export { welcomeMessage }
