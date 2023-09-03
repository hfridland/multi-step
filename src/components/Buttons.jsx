import { useDispatch, useSelector } from "react-redux"
import { setNextStep as setNextStepDisp } from "../features/nextStep/nextStep-slide"
import { setStageInd as setStageIndReducer } from "../features/curInd/stageInd-slide"

const Buttons = props => {
    const dispatch = useDispatch()
    const setStageInd = curInd => dispatch(setStageIndReducer(curInd))
    const setNextStep = val => dispatch(setNextStepDisp(val))
    const stageInd = useSelector(state => state.stageInd);

    const goBackStyle = stageInd === 0 || stageInd === 4 ? {display: 'none'} : {}
    const nextStepStyle = stageInd === 4 ? {display: 'none'} : stageInd === 3 ? {backgroundColor: '#483EFF'} : {}

    const nextStepHandler = () => {
        setNextStep(true)
    }

    const goBackHandler = () => {
        setStageInd(stageInd - 1)
    }

    const btnNextStepCaption = stageInd === 3 ? 'Confirm' : 'Next Step'

    return (
        <>
            {stageInd < 4 && (
            <div className="buttons">
                <div className="btnGoBack" onClick={goBackHandler} style={goBackStyle} >Go Back</div>
                <div className="btnNextStepWrapper">
                    <div className="btnNextStep" onClick={nextStepHandler} style={nextStepStyle}>{btnNextStepCaption}</div>
                </div>
            </div>
            )}
        </>
    )
}

export default Buttons