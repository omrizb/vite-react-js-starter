const { DEV, VITE_LOCAL } = import.meta.env
import { getRandomIntInclusive, makeId } from '../util.service'

import { carService as local } from './car.service.local'
import { carService as remote } from './car.service.remote'

function getEmptyCar() {
    return {
        vendor: makeId(),
        description: '',
        price: getRandomIntInclusive(1000, 9000),
        speed: getRandomIntInclusive(80, 240),
        msgs: [],
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        maxPrice: '',
        minSpeed: '',
        sortField: '',
        sortDir: '',
        // pageIdx: 0
    }
}

function getFilterBy(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}

    for (const field in defaultFilter) {
        const defaultValue = defaultFilter[field]
        const searchParamsValue = searchParams.get(field)

        if (typeof (defaultValue) === 'number') {
            filterBy[field] = searchParamsValue ? Number(searchParamsValue) : defaultValue
        } else if (typeof (defaultValue) === 'string') {
            filterBy[field] = searchParamsValue || defaultValue
        } else if (Array.isArray(defaultValue)) {
            filterBy[field] = searchParamsValue ? searchParamsValue.split(',') : defaultValue
        } else {
            filterBy[field] = defaultValue
        }

    }

    return filterBy
}

const service = VITE_LOCAL === 'true' ? local : remote
export const carService = { getEmptyCar, getDefaultFilter, getFilterBy, ...service }






























//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.carService = carService
