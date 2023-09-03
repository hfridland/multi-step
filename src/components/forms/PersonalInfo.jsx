import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDataSelector } from "../../store"
import { setNextStep as setNextStepDisp } from "../../features/nextStep/nextStep-slide"
import { setData as setDataDisp } from "../../features/stageData/stageData-slide"
import { setStageInd as setStageIndReducer } from "../../features/curInd/stageInd-slide"

const PersonalInfo = () => {
    const FORM_INDEX = 0

    const dispatch = useDispatch()
    const nextStep = useSelector(state => state.nextStep.nextStep)
    const setNextStep = val => dispatch(setNextStepDisp(val))
    const setDataGlobal = data => dispatch(setDataDisp({index: FORM_INDEX, data: data}))
    const setStageInd = curInd => dispatch(setStageIndReducer(curInd))

    useEffect(() => {
        if (nextStep) {
            setNextStep(false)
            const err = { ...error }
            Object.keys(data).forEach(field => {
                err[field] = validator[field](data[field])
            })
            setError(err)
            if (!Object.keys(err).some(field => err[field] !== null)) {
                setDataGlobal(data)
                setStageInd(FORM_INDEX + 1)
            }
        }
        // eslint-disable-next-line
    }, [nextStep])

    const initData = useSelector(state => getDataSelector(state, FORM_INDEX))

    const [data, setData] = useState(initData)

    const setDataHandler = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const validator = {
        name: name => name.length === 0 ? 'This field is required' : null,
        email: email => {
            const ret = email.length === 0 ? 'This field is required' : null
            if (!ret) {
                if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) === null) {
                    return 'Wrong email format'
                }
            }
            return ret
        },
        phone: phone => {
            const ret = phone.length === 0 ? 'This field is required' : null
            if (!ret) {
                if (phone.match(/^\+\d{1} \d{3} \d{3} \d{3}$/) === null) {
                    return 'Wrong phone format'
                }
            }
            return ret
        }
    }

    const [error, setError] = useState({
        name: null,
        email: null,
        phone: null
    })

    const fieldStyle = {
        name: {borderColor: 'gray'},
        email: {borderColor: 'gray'},
        phone: {borderColor: 'gray'}
    }

    const validateFieldHandler = fieldName => {
        setError({
            ...error,
            [fieldName]: validator[fieldName](data[fieldName])
        })
        fieldStyle[fieldName] = error[fieldName] !== null ? {borderColor: 'red'} : {borderColor: 'gray'}
    }

    const [focused, setFocused] = useState('')

    const getStyleHandler = fieldName => {
        const color = focused === fieldName? 'blue' : error[fieldName] === null ? 'grey' : 'red'
        return { borderColor: color}
    }

    return (
        <article className="personal-info">
            <h1>Personal Info</h1>
            <p className="descr">Please provide your name, email addres, and phone number</p>

            <div className="field">
                <div className="texts">
                    <label htmlFor="name">Name</label>
                    {error.name && <span className="error">{error.name}</span>}
                </div>
                <input
                    className="input"
                    name="name"
                    id="name"
                    type="text"
                    placeholder="e.g. Stephen King"
                    value={data.name}
                    onChange={e => setDataHandler(e)}
                    onBlur={e => { validateFieldHandler('name'); setFocused('') }}
                    onFocus={e => setFocused('name')}
                    style={getStyleHandler('name')}
                    />
            </div>

            <div className="field">
                <div className="texts">
                    <label htmlFor="email">Email Address</label>
                    {error.email && <span className="error">{error.email}</span>}
                </div>
                <input
                    className="input"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="e.g. stephenking@lorem.com"
                    value={data.email}
                    onChange={e => setDataHandler(e)}
                    onBlur={e => { validateFieldHandler('email'); setFocused('') }}
                    onFocus={e => setFocused('email')}
                    style={getStyleHandler('email')}
                    />
            </div>

            <div className="field">
                <div className="texts">
                    <label htmlFor="phone">Phone Number</label>
                    {error.phone && <span className="error">{error.phone}</span>}
                </div>
                <input
                    className="input"
                    name="phone"
                    id="phone"
                    type="text"
                    placeholder="e.g. +1 234 567 890"
                    value={data.phone}
                    onChange={e => setDataHandler(e)}
                    onBlur={e => { validateFieldHandler('phone'); setFocused('') }}
                    onFocus={e => setFocused('phone')}
                    style={getStyleHandler('phone')}
                    />
            </div>

        </article>
    )
}

export default PersonalInfo