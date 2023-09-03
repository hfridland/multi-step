import { useEffect, useState } from 'react'
import checkmark from './images/icon-checkmark.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getDataSelector } from '../../store'
import { setNextStep as setNextStepDisp } from "../../features/nextStep/nextStep-slide"
import { setData as setDataDisp } from "../../features/stageData/stageData-slide"
import { setStageInd as setStageIndReducer } from "../../features/curInd/stageInd-slide"
import { addOns } from './data'

const PickAddOns = () => {
    const billing = useSelector(state => getDataSelector(state, 1)).billing
    const FORM_INDEX = 2
    const addOnsStored = useSelector(state => getDataSelector(state, FORM_INDEX)).addOns
    const dispatch = useDispatch()
    const nextStep = useSelector(state => state.nextStep.nextStep)
    const setNextStep = val => dispatch(setNextStepDisp(val))
    const setDataGlobal = data => dispatch(setDataDisp({index: FORM_INDEX, data: data}))
    const setStageInd = curInd => dispatch(setStageIndReducer(curInd))

    useEffect(() => {
        if (nextStep) {
            setNextStep(false)
            const dataGlobal = {
                addOns: addOns.filter(addOn => selAddOn[addOn.name]).map(addOn => addOn.name)
            }
            setDataGlobal(dataGlobal)
            setStageInd(FORM_INDEX + 1)
        }
        // eslint-disable-next-line
    }, [nextStep])

    const initAddOns = {
        'Online service': false,
        'Larger storage': false,
        'Customizable profile': false
    }
    addOnsStored.forEach(addOn => initAddOns[addOn] = true)

    const [selAddOn, setSelAddOn] = useState(initAddOns)
    const setSelAddOnHandler = (addOn, val) => {
        setSelAddOn({
            ...selAddOn,
            [addOn]: val
        })
    }

    const priceSuffix = billing === 'monthly' ? 'mo' : 'yr'

    return (
        <article className="add-ons">
            <h1>Pick add-ons</h1>
            <p className="descr">Add-ons help enhance your gaming experience.</p>
            <div className="add-ons-container">
                {addOns.map(addOn =>
                    <AddOn
                        key={addOn.name}
                        name={addOn.name}
                        description={addOn.description}
                        price={addOn.price[billing]}
                        priceSuffix={priceSuffix}
                        sel={selAddOn[addOn.name]}
                        setSelAddOnHandler={setSelAddOnHandler}
                    />)}
            </div>
        </article>
    )
}

export default PickAddOns

const AddOn = props => {
    const { name, description, price, priceSuffix, sel, setSelAddOnHandler } = props
    const clickHandler = () => setSelAddOnHandler(name, !sel)
    const selClass = sel ? 'selected' : 'unselected'
    return (
        <div className={'add-on ' + selClass} onClick={clickHandler}>
            <div className="checks">
                <div className='check'>
                    <img src={checkmark} alt='Check' />
                </div>
            </div>
            <div className='descr'>
                <h3>{name}</h3>
                <div className='description'>{description}</div>
            </div>
            <div className='price-container'>
                <div className='price'>
                    +${price}/{priceSuffix}
                </div>
            </div>

        </div>
    )
}