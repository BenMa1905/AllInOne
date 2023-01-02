import axios from "axios";

const login = async (rut) => {
    const response = await axios.post(`${process.env.API_URL}/user/login`, { rut });
    return response
}

const createUser = async (user) => {
    const response = await axios.post(`${process.env.API_URL}/user`, {
        name: user.name,
        rut: user.rut,
        email: user.email,
        birthdate: user.birthdate,
        address: user.address,
        telephone: user.telephone,
        role: user.role,
    });
    return response
}

const deleteUser = async (id) => {
    const response = await axios.delete(`${process.env.API_URL}/user/delete/${user._id}`, { id
    });
    return response
}

const updateUser = async (user) => {
    const response = await axios.put(`${process.env.API_URL}/user/update/${user._id}`, {
        name: user.name,
        rut: user.rut,
        email: user.email,
        birthdate: user.birthdate,
        address: user.address,
        telephone: user.telephone,
        role: user.role,
    });
    return response
}

const logout = async () => {
    const response = await axios.get(`${process.env.API_URL}/logout`);
    return response;
};

const getUsers = async () => {
    const response = await axios.get(`${process.env.API_URL}/users`)
    const [setUsers] = useState([])
    setUsers(response.data)
}

const getUser=async(id)=> {
    const response =await axios.get(`${process.env.API_URL}/user/search/${id}`);
    return response
}

const verifyToken = async (token) => {
    // console.log(token)
    const response = await axios.get(`${process.env.API_URL}/user/verifyToken`, { headers: { cookie: token } });
    return response
}


module.exports = {
    createUser,
    deleteUser,
    updateUser,
    login,
    logout,
    getUsers,
    getUser,
    verifyToken
};
