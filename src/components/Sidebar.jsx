import { useSelector } from "react-redux"

const Sidebar = () => {
    const stageInd = useSelector(state => state.stageInd)
    // console.log(stageInd)

    const data = [{
            num: 1,
            title: 'YOUR INFO'
        }, {
            num: 2,
            title: 'SELECT PLAN'
        }, {
            num: 3,
            title: 'ADD-ONS'
        }, {
            num: 4,
            title: 'SUMMARY'
        }
    ]

    const selNum = stageInd < 4 ? stageInd + 1 : 4

    return (
        <aside className="sidebar">
            <div className="step-descrs">
                {data.map(step => <StepDescr key={step.num} num={step.num} title={step.title} sel={step.num === selNum} />)}
            </div>
        </aside>
    )
}

export default Sidebar

const StepDescr = props => {
    const { num, title, sel } = props
    return (
        <div className={"step-descr " + (sel && 'selected')}>
            <div className="number">{num}</div>
            <div className="descr-wrapper">
                <div className="step-number">STEP {num}</div>
                <div className="step-title">{title}</div>
            </div>
        </div>
    )
}