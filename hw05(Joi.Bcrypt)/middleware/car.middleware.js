const { responseCodesEnum } = require('../constant');
const { carMsg: { errorMsg } } = require('../messages');
const carService = require('../service/car.service');
const {
    carValidators: { createCarValidator },
    commonValidators: { mongoIdValidator }
} = require('../validators');

module.exports = {
    isCarValid: (req, res, next) => {
        try {
            const { error } = createCarValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isCarIdValid: (req, res, next) => {
        try {
            const { carId } = req.params;

            const { error } = mongoIdValidator.validate(carId);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    doesCarExist: async (req, res, next) => {
        try {
            const { preferLang = 'ua' } = req.body;
            const cars = await carService.findAllCars(req.body);

            if (cars.length) {
                throw new Error(errorMsg.CAR_EXISTS[preferLang]);
            }

            next();
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    areNoCars: async (req, res, next) => {
        try {
            const { preferLang = 'ua' } = req.body;
            const users = await carService.findAllCars(req.query);

            if (!users.length) {
                throw new Error(errorMsg.NO_CARS[preferLang]);
            }

            next();

            next();
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isNoCar: async (req, res, next) => {
        try {
            const { params: { carId }, body: { preferLang = 'ua' } } = req;
            const car = await carService.findCarById(carId);

            if (!car) {
                throw new Error(errorMsg.NO_CAR[preferLang]);
            }

            next();
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },
};
