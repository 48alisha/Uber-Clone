const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType
}) => {

    // basic required check
    if (
        !firstname ||
        !email ||
        !password ||
        !color ||
        !plate ||
        !capacity ||
        !vehicleType
    ) {
        throw new Error("All fields are required");
    }

    const captain = await captainModel.create({
        fullname: {
            firstname: firstname,
            lastname: lastname || ""   // prevent undefined
        },
        email: email,
        password: password,
        vehicle: {
            color: color,
            plate: plate,
            capacity: capacity,
            vehicleType: vehicleType
        }
    });

    return captain;
};
