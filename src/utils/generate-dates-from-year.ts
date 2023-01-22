import dayjs from "dayjs";
export function generateRangeFromYear(){
    const firstDayofYear = dayjs().startOf('year')
    const today = new Date()

    const dates = []
    let compareDate = firstDayofYear
    
    while(compareDate.isBefore(today)){
        dates.push(compareDate.toDate())
        compareDate = compareDate.add(1,"day")
    }

    return dates
}