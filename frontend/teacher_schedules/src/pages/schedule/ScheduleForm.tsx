import { useState } from 'react'
import { Schedule } from '../../interfaces/ScheduleInterface'
import { saveSchedule, updateSchedule } from '../../services/ScheduleService'

type ScheduleFormProps = {
    schedule: Schedule;
    onSubmit: () => void;
    onCancel: () => void;
}

export function ScheduleForm({ schedule, onSubmit, onCancel }: ScheduleFormProps) {
    const [nomeDoProfessor, setNomeDoProfessor] = useState(schedule.professorName || '')
    const [diaDeAtendimento, setDiaDeAtendimento] = useState(schedule.dayOfService)
    const [horario, setHorario] = useState(schedule.serviceTime) // Novo campo
    const [periodo, setPeriodo] = useState(schedule.period)
    const [sala, setSala] = useState(schedule.room || 0)
    const [predio, setPredio] = useState(schedule.building || 1)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const newSchedule: Schedule = {
            id: schedule.id || 0, // Se for um novo, o ID pode ser gerado no backend
            professorName: nomeDoProfessor,
            dayOfService: diaDeAtendimento,
            serviceTime: horario,
            period: periodo,
            room: sala,
            building: predio
        }

        try {
            if (!schedule.id) {
                await saveSchedule(newSchedule)
            } else {
                await updateSchedule(newSchedule)
            }
            onSubmit()
        } catch (error) {
            console.error('Erro ao salvar horário:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12 mt-10 ml-10 mr-10">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Informações de Atendimento</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">Formulário para criar um horário de atendimento</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="nomeDoProfessor" className="block text-sm font-medium text-gray-900">
                                Nome do Professor
                            </label>
                            <input
                                id="nomeDoProfessor"
                                name="nomeDoProfessor"
                                type="text"
                                value={nomeDoProfessor}
                                onChange={(e) => setNomeDoProfessor(e.target.value)}
                                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="horarioDeAtendimento" className="block text-sm font-medium text-gray-900">
                                Horário de Atendimento
                            </label>
                            <input
                                id="horarioDeAtendimento"
                                name="horarioDeAtendimento"
                                type="text"
                                value={diaDeAtendimento}
                                onChange={(e) => setDiaDeAtendimento(e.target.value)}
                                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="horario" className="block text-sm font-medium text-gray-900">
                                Horário
                            </label>
                            <input
                                id="horario"
                                name="horario"
                                type="text"
                                value={horario}
                                onChange={(e) => setHorario(e.target.value)}
                                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="periodo" className="block text-sm font-medium text-gray-900">
                                Período
                            </label>
                            <select
                                id="periodo"
                                name="periodo"
                                value={periodo}
                                onChange={(e) => setPeriodo(e.target.value)}
                                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900"
                            >
                                <option value="Noturno">Noturno</option>
                                <option value="Diurno">Diurno</option>
                            </select>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="sala" className="block text-sm font-medium text-gray-900">
                                Sala
                            </label>
                            <input
                                id="sala"
                                name="sala"
                                type="number"
                                value={sala}
                                onChange={(e) => setSala(Number(e.target.value))}
                                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="predio" className="block text-sm font-medium text-gray-900">
                                Prédio
                            </label>
                            <select
                                id="predio"
                                name="predio"
                                value={predio}
                                onChange={(e) => setPredio(Number(e.target.value))}
                                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900"
                            >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" onClick={onCancel} className="text-sm font-semibold text-gray-900">
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                    Salvar
                </button>
            </div>
        </form>
    )
}
