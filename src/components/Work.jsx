import Form from "./Form"
import Buttons from "./Buttons"
import PersonalInfo from "./forms/PersonalInfo"
import SelPlan from "./forms/SelPlan"
import { useSelector } from "react-redux"
import PickAddOns from "./forms/PickAddOns"
import FinishingUp from "./forms/FinishingUp"
import Conclusion from "./forms/Conclusion"

const Work = () => {
    const stageInd = useSelector(state => state.stageInd);

    const forms = [
        (<PersonalInfo />),
        (<SelPlan />),
        (<PickAddOns />),
        (<FinishingUp />),
        (<Conclusion />)
    ]

    return (
        <section className="work">
            <Form form={forms[stageInd]} />
            <div className="spacer" />
            <Buttons />
        </section>
    )
}

export default Work