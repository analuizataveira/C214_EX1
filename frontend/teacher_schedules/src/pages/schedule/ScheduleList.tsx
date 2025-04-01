import { useEffect, useState } from "react"
import { getSchedule } from "../../services/ScheduleService";
import { Schedule } from "../../interfaces/ScheduleInterface";


export function ScheduleList() {

    const [scheduleList, setScheduleList] = useState<Array<Schedule>>([])
    const refreshSchedule = async () => {
        await getSchedule().then((scheduleList) => {
            setScheduleList(scheduleList != null ? [...scheduleList] : [])
        });
    };


    useEffect(() => {
        refreshSchedule()
    }, []);


    return (
        <div className="overflow-x-auto mt-4">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Professor</th>
                        <th>Horário de atendimento</th>
                        <th>Período</th>
                        <th>Sala</th>
                        <th>Prédio</th>
                    </tr>
                </thead>
                <tbody>
                    {scheduleList?.map((schedule) => (
                        <tr>
                            <th>{schedule.id}</th>
                            <th>{schedule.professorName}</th>
                            <td>{schedule.serviceTime}+{schedule.dayOfService}</td>
                            <td>{schedule.period}</td>
                            <td>{schedule.room}</td>
                            <td>{schedule.building}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}