import { useSelector, useDispatch } from "react-redux"
import { getDateInterval } from "../features/dateInterval"
import getHoursCalculate from "../utils/getHoursCalculate"

export default function HourMeter() {

  const dispatch = useDispatch()
  const interval = useSelector(state => state.dateInterval)
  const listEmployees = useSelector(state => state.listEmployees)
  

  return (
    <div>

        <h4>Date compteur d'heures</h4>

        <div className="choice-date-meter">
            <input 
            value={interval.startDate}
            onChange={e => {
              dispatch(getDateInterval(["startDate", e.target.value]))
            }}
            type="date" 
            />

            <input 
            value={interval.endDate}
            onChange={e => dispatch(getDateInterval(["endDate", e.target.value]))}
            type="date" 
            />
        </div>

    </div>
  )
}
