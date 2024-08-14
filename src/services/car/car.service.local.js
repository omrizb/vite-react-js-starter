
import { storageService } from '../async-storage.service'
import { utilService } from '../util.service.js'
import { userService } from '../user'

const STORAGE_KEY = 'car'

export const carService = {
    query,
    getById,
    save,
    remove,
    addCarMsg
}

// DEBUG:
// window.cs = carService

_createCars(20)

async function query(filterBy = { txt: '', price: 0 }) {
    var cars = await storageService.query(STORAGE_KEY)
    console.log('cars:', cars)
    const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        cars = cars.filter(car => regex.test(car.vendor) || regex.test(car.description))
    }
    if (minSpeed) {
        cars = cars.filter(car => car.speed <= minSpeed)
    }
    if (maxPrice) {
        cars = cars.filter(car => car.price <= maxPrice)
    }
    if (sortField === 'vendor' || sortField === 'owner') {
        cars.sort((car1, car2) =>
            car1[sortField].localeCompare(car2[sortField]) * +sortDir)
    }
    if (sortField === 'price' || sortField === 'speed') {
        cars.sort((car1, car2) =>
            (car1[sortField] - car2[sortField]) * +sortDir)
    }

    cars = cars.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return cars
}

function getById(carId) {
    return storageService.get(STORAGE_KEY, carId)
}

async function remove(carId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, carId)
}

async function save(car) {
    var savedCar
    if (car._id) {
        const carToSave = {
            _id: car._id,
            price: car.price,
            speed: car.speed,
        }
        savedCar = await storageService.put(STORAGE_KEY, carToSave)
    } else {
        const carToSave = {
            vendor: car.vendor,
            price: car.price,
            speed: car.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedCar = await storageService.post(STORAGE_KEY, carToSave)
    }
    return savedCar
}

async function addCarMsg(carId, txt) {
    // Later, this is all done by the backend
    const car = await getById(carId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    car.msgs.push(msg)
    await storageService.put(STORAGE_KEY, car)

    return msg
}

function _createCars(size) {
    let cars = utilService.loadFromStorage(STORAGE_KEY)
    if (!cars || !cars.length) {
        cars = []
        for (let i = 0; i < size; i++) {
            const txt = utilService.makeLorem(3)
            cars.push(_createCar(txt))
        }
        utilService.saveToStorage(ITEM_KEY, cars)
    }
}

function _createCar(txt) {
    const car = {
        vendor: txt,
        description: utilService.makeLorem(10),
        price: getRandomIntInclusive(1000, 9000),
        speed: getRandomIntInclusive(80, 240),
        msgs: [],
    }
    car.createdAt = car.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return car
}
