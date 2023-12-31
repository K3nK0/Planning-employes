import { addEstimatedHours } from "../features/listEmployees";

const calculMillisecondes = (events) => {
    let time = 0;
    
    if(events[0] === undefined) return 0
    events.forEach(event => {
        const start = new Date(event.start);
        const end = new Date(event.end);
        const duration = end - start;
        time += duration;
    });

    return time
}

export default function getHoursCalculate(dispatch, employee, dateInterval){

    // console.log("eventState", employee.eventsState);
    if(employee.eventsState !== undefined){
        let events = [...employee.eventsState]
        let eventsInInterval = []
        for(let i = 0; i < events.length; i++){
            if(events[i].start > dateInterval.startDate && events[i].end < dateInterval.endDate){
                eventsInInterval.push(events[i])
            };
        }

        let sortedEvents = eventsInInterval.sort((a, b) => new Date(a.start) - new Date(b.start))
        
        let listEventsSorted = []
        listEventsSorted.push(sortedEvents[0])
        
        sortedEvents.forEach(event => {
            if(listEventsSorted.length === 1){
                if(listEventsSorted[0].start !== event.start && listEventsSorted[0].end !== event.end){
                    if(listEventsSorted[0].end > event.start && new Date(listEventsSorted[0].start).getDay() === new Date(event.start).getDay() && listEventsSorted[0].end <= event.end){
                        listEventsSorted[0] = {
                            ...listEventsSorted[0],
                            end: event.end
                        }
                    } else {
                        listEventsSorted.push(event)
                    }}
            }
            else if(listEventsSorted.length > 1){
                if(listEventsSorted.slice(-1)[0].start !== event.start && listEventsSorted.slice(-1)[0].end !== event.end){
                    if(listEventsSorted.slice(-1)[0].end > event.start && new Date(listEventsSorted.slice(-1)[0].start).getDay() === new Date(event.start).getDay() && listEventsSorted.slice(-1)[0].end < event.end){
                        const updatedLastEvent = {
                            ...listEventsSorted.slice(-1)[0],
                            end: event.end
                        }
                        listEventsSorted[listEventsSorted.length - 1] = updatedLastEvent 
                    }
                    else if(listEventsSorted.slice(-1)[0].start <= event.start && listEventsSorted.slice(-1)[0].end > event.end){
                        return
                    }
                    else {
                        listEventsSorted.push(event)
                    }}
            }
        })
        
        const millisecondes = calculMillisecondes(listEventsSorted)
        dispatch(addEstimatedHours({"employeeID":employee.id, millisecondes}))
    }
}