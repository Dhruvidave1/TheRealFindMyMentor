// Add services if needed

// controllerMethods = {};

export const getUsers = async (req, res) => {
	res.send({ success: true, data: 'getUsers!' });
};

export const createUser = async (req, res) => {
	res.send({ success: true, data: 'createUsers!' });
};

export const updateUser = async (req, res) => {
	res.send({ success: true, data: 'updateUser!' });
};

export const deleteUser = async (req, res) => {
	res.send({ success: true, data: 'deleteUser!' });
};

// export default controllerMethods;
