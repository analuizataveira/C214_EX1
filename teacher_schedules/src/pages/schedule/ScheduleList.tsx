import { useEffect, useState } from "react"
import { Schedule } from "../interfaces/ScheduleInterface"
import { getSchedule } from "../services/ScheduleService"



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
                            <th>{schedule.nomeDoProfessor}</th>
                            <td>{schedule.horarioDeAtendimento}</td>
                            <td>{schedule.periodo}</td>
                            <td>{schedule.sala}</td>
                            <td>{schedule.predio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}