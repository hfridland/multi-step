import arcade from './images/icon-arcade.svg'
import advanced from './images/icon-advanced.svg'
import pro from './images/icon-pro.svg'


export const planOptions = {
    arcade: {
        icon: arcade,
        price: {
            monthly: 9,
            yearly: 90
        }
    },
    advanced: {
        icon: advanced,
        price: {
            monthly: 12,
            yearly: 120
        }
    },
    pro: {
        icon: pro,
        price: {
            monthly: 15,
            yearly: 150
        }
    }
}

export const addOns = [{
    name: 'Online service',
    description: 'Access to multiplayer games',
    price: {
        monthly: 1,
        yearly: 10
    }
}, {
    name: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    price: {
        monthly: 2,
        yearly: 20
    }
}, {
    name: 'Customizable profile',
    description: 'Custom theme on your profile',
    price: {
        monthly: 2,
        yearly: 20
    }
}
]
