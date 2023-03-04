// Add services if needed


controllerMethods  = {}

controllerMethods.getUsers = async (req, res) => {
    res.send({ success: true, data: 'getUsers!' });
}

controllerMethods.createUser = async (req, res) => {
    res.send({ success: true, data: 'createUsers!' });
}

controllerMethods.updateUser = async (req, res) => {
    res.send({success: true, data: 'updateUser!'});
}

controllerMethods.deleteUser = async (req, res) => {
    res.send({success: true, data: 'deleteUser!'});
}



module.exports = controllerMethods;

