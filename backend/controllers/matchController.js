// Add services if needed

controllerMethods  = {}

controllerMethods.getMatches = async (req, res) => {
    res.send({success: true, data: 'matches!'});
}

module.exports = controllerMethods;