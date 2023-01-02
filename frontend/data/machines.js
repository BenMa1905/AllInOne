import axios from 'axios'

const getMachines=async(id)=> {
    const response =await axios.get(`${process.env.API_URL}/machine/search/${id}`);
    //console.log(response)
    return response
}
const createMachine = async (machine) => {
    //console.log(machine)
    const response = await axios.post(`${process.env.API_URL}/machine`, {
        name: machine.name,
        machineType: machine.machineType,
        serial: machine.serial,
        status: machine.status,
    });
    return response
}
module.exports = {
    getMachines,
    createMachine,
}
