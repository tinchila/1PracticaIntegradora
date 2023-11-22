'use strict'

const users = [
    {
        id: 1,
        email: 'adminCoder@coder.com',
        password: 'adminCod3r123',
        role: 'admin',
    },
    {
        id: 2,
        email: 'user@coder.com',
        password: 'user123',
        role: 'usuario',
    },
]

const login = (req, res) => {
    const { email, password } = req.body
    const user = users.find(user => user.email === email && user.password === password)

    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    req.session.user = user
    res.redirect('/products')
}

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión' })
        }
        res.redirect('/login')
    })
}

export { login, logout }
