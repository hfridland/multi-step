import { useDispatch, useSelector } from 'react-redux'
import { planOptions, addOns } from './data'
import { getAllDataSelector } from '../../store'
import { setStageInd as setStageIndReducer } from "../../features/curInd/stageInd-slide"
import { useEffect } from 'react'
import { setNextStep as setNextStepDisp } from "../../features/nextStep/nextStep-slide"

const FinishingUp = () => {
    const FORM_INDEX = 3
    const dispatch = useDispatch()
    const setStageInd = curInd => dispatch(setStageIndReducer(curInd))
    const nextStep = useSelector(state => state.nextStep.nextStep)
    const setNextStep = val => dispatch(setNextStepDisp(val))

    const selData = useSelector(getAllDataSelector)
    const planName = selData[1].plan
    const billing = selData[1].billing
    const selAddOns = selData[2].addOns

    useEffect(() => {
        if (nextStep) {
            setNextStep(false)
            setStageInd(FORM_INDEX + 1)
        }
        // eslint-disable-next-line
    }, [nextStep])


    const plan = planOptions[planName]

    const changePlanHandler = () => setStageInd(1)

    const totalPer = billing === 'monthly' ? 'month' : 'year'
    const billingSuffix = billing === 'monthly' ? 'mo' : 'yr'

    const getTotalPrice = () =>
        addOns.filter(addOn => selAddOns.includes(addOn.name))
            .reduce((total, addOn) => total + addOn.price[billing], plan['price'][billing])

    const addOnsVisStyle = selAddOns.length === 0 ? { display: 'none'} : {}

    return (
        <article className="finishing-up">
            <h1>Finishing up</h1>
            <p className="descr">Double-check everything looks OK before confirming.</p>
            <div className='all-data-container'>
                <div className='data-container'>
                    <div className='plan-container'>
                        <Plan
                            name={planName}
                            billingDescr={billing === 'monthly' ? 'Monthly' : 'Yearly'}
                            price={plan['price'][billing]}
                            billingSuffix={billingSuffix}
                            changePlanHandler={changePlanHandler}
                        />
                    </div>
                    <div className='divider-container' style={addOnsVisStyle}>
                        <div className='divider' />
                    </div>
                    <div className='addons-container' style={addOnsVisStyle}>
                        {addOns.filter(addOn => selAddOns.includes(addOn.name)).map(addOn =>
                            <AddOn
                                name={addOn.name}
                                price={addOn.price[billing]}
                                billingSuffix={billingSuffix}
                            />
                        )}
                    </div>
                </div>
                <div className='total-container'>
                    <div className='description'>
                        Total (per {totalPer})
                    </div>
                    <div className='price-container'>
                        <div className='price'>+${getTotalPrice()}/{billingSuffix}</div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default FinishingUp

const Plan = props => {
    const { name, billingDescr, price, billingSuffix, changePlanHandler } = props
    return (
        <div className='plan-option'>
            <div className='description'>
                <div className='name'>{name} ({billingDescr})</div>
                <div className='btn-change' onClick={changePlanHandler}>Change</div>
            </div>
            <div className='price-container'>
                <div className='price'>
                    ${price}/{billingSuffix}
                </div>
            </div>
        </div>
    )
}

const AddOn = props => {
    const { name, price, billingSuffix } = props
    return (
        <div className='addon-container'>
            <div className='name'>{name}</div>
            <div className='price-container'>
                <div className='price'>+${price}/{billingSuffix}</div>
            </div>
        </div>
    )
}