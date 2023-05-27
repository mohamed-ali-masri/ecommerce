import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin Utilisateur',
        email: 'mohamedali.masri@polytechnicien.tn',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'med ali ',
        email: 'mohamedali.masri01@polytechnicien.tn',
        password: bcrypt.hashSync('123456', 10),

    },
    {
        name: 'med ali ',
        email: 'mohamedali.masri02@polytechnicien.tn',
        password: bcrypt.hashSync('123456', 10),

    },
]

export default users 