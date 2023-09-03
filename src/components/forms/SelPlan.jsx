import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataSelector } from '../../store'
import { setNextStep as setNextStepDisp } from "../../features/nextStep/nextStep-slide"
import { setData as setDataDisp } from "../../features/stageData/stageData-slide"
import { setStageInd as setStageIndReducer } from "../../features/curInd/stageInd-slide"
import { planOptions } from './data'


const SelPlan = () => {
    const FORM_INDEX = 1

    const dispatch = useDispatch()
    const nextStep = useSelector(state => state.nextStep.nextStep)
    const setNextStep = val => dispatch(setNextStepDisp(val))
    const initData = useSelector(state => getDataSelector(state, FORM_INDEX))
    const setDataGlobal = data => dispatch(setDataDisp({index: FORM_INDEX, data: data}))
    const setStageInd = curInd => dispatch(setStageIndReducer(curInd))


    useEffect(() => {
        if (nextStep) {
            setNextStep(false)
            const dataGlobal = {
                plan,
                billing
            }
            setDataGlobal(dataGlobal)
            setStageInd(FORM_INDEX + 1)
        }
        // eslint-disable-next-line
    }, [nextStep])

    const [plan, setPlan] = useState(initData.plan)

    const [billing, setBilling] = useState(initData.billing)
    const setBillingHandler = () => { setBilling(billing === 'monthly' ? 'yearly' : 'monthly') }

    return (
        <article className="sel-plan">
            <h1>Select your plan</h1>
            <p className="descr">You have the option of monthly or yearly billing</p>
            <div className="options" >
                {Object.keys(planOptions).map(key =>
                    <Option
                        key={key}
                        plan={plan}
                        setPlan={setPlan}
                        name={key}
                        price={planOptions[key]['price'][billing]}
                        priceSuffix={billing === 'monthly' ? 'mo' : 'yr'}
                        icon={planOptions[key].icon}
                        billing={billing}
                    />)}
            </div>
            <Switch billing={billing} setBillingHandler={setBillingHandler} />
        </article>
    )
}

export default SelPlan

const Option = props => {
    const { icon, name, price, priceSuffix, plan, setPlan, billing } = props
    const style = name === plan ? {borderColor: 'blue', backgroundColor: '#EFF5FF'} : {borderColor: 'gray', backgroundColor: 'white'}
    const clickHandler = () => setPlan(name)
    let className = 'option'
    if (name === 'pro') {
        className += ' no-margin'
    }
    const saleStyle = billing === 'monthly' ? {display: 'none'} : {}
    return (
        <div className={className} style={style} onClick={clickHandler}>
            <div className='imageContainer'>
                <img src={icon} alt={name} />
            </div>
            <div className='desc-wrapper'>
                <h3>{name}</h3>
                <div className="price">${price}/{priceSuffix}</div>
                <div className='sale' style={saleStyle} >2 months free</div>
            </div>
        </div>
    )
}

const Switch = props => {
    const { billing, setBillingHandler } = props
    return (
        <div className='switchContainer'>
            <div className='billing-switcher' onClick={setBillingHandler}>
                <div className={billing === 'monthly' ? 'selected' : 'unselected'}>Monthly</div>
                <div className='billing-switcher-rectangle' style={billing === 'monthly' ? {justifyContent: 'flex-start'} : {justifyContent: 'flex-end'}}>
                    <div className='billing-switcher-circle' />
                </div>
                <div className={billing === 'yearly' ? 'selected' : 'unselected'}>Yearly</div>
            </div>
        </div>
    )
}