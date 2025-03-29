import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { Schedule } from '../../interfaces/ScheduleInterface'
import { saveSchedule, updateSchedule } from '../../services/ScheduleService'
import { useState } from 'react'

type ScheduleFormProps = {
    id?: number;
    nomeDoProfessor?: string;
    horarioDeAtendimento?: string;
    periodo?: string;
    sala?: number;  // Alterado para number
    predio?: number;  // Alterado para number
    onSubmit: () => void;
    onCancel: () => void;
}

export function ScheduleForm(scheduleFormProps: ScheduleFormProps) {
    const [nomeDoProfessor, setNomeDoProfessor] = useState(scheduleFormProps.nomeDoProfessor || '')
    const [horarioDeAtendimento, setHorarioDeAtendimento] = useState(scheduleFormProps.horarioDeAtendimento || '')
    const [periodo, setPeriodo] = useState(scheduleFormProps.periodo || 'Noturno')
    const [sala, setSala] = useState<number>(scheduleFormProps.sala || 0)  // Definido como number
    const [predio, setPredio] = useState<number>(scheduleFormProps.predio || 1)  // Definido como number

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const schedule: Schedule = {
            id: scheduleFormProps.id ?? 0, // Fornece um valor padrão 0 se for undefined
            nomeDoProfessor,
            horarioDeAtendimento,
            periodo,
            sala,
            predio
        }
    
        try {
            if (!schedule.id) {
                await saveSchedule(schedule)
            } else {
                await updateSchedule(schedule)
            }
            scheduleFormProps.onSubmit()
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
                            <label htmlFor="nomeDoProfessor" className="block text-sm/6 font-medium text-gray-900">
                                Nome do Professor
                            </label>
                            <div className="mt-2">
                                <input
                                    id="nomeDoProfessor"
                                    name="nomeDoProfessor"
                                    type="text"
                                    value={nomeDoProfessor}
                                    onChange={(e) => setNomeDoProfessor(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="horarioDeAtendimento" className="block text-sm/6 font-medium text-gray-900">
                                Horário de Atendimento
                            </label>
                            <div className="mt-2">
                                <input
                                    id="horarioDeAtendimento"
                                    name="horarioDeAtendimento"
                                    type="text"
                                    value={horarioDeAtendimento}
                                    onChange={(e) => setHorarioDeAtendimento(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="periodo" className="block text-sm/6 font-medium text-gray-900">
                                Período
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="periodo"
                                    name="periodo"
                                    value={periodo}
                                    onChange={(e) => setPeriodo(e.target.value)}
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option value="Noturno">Noturno</option>
                                    <option value="Diurno">Diurno</option>
                                </select>
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="sala" className="block text-sm/6 font-medium text-gray-900">
                                Sala
                            </label>
                            <div className="mt-2">
                                <input
                                    id="sala"
                                    name="sala"
                                    type="number"
                                    value={sala}
                                    onChange={(e) => setSala(Number(e.target.value))}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="predio" className="block text-sm/6 font-medium text-gray-900">
                                Prédio
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="predio"
                                    name="predio"
                                    value={predio}
                                    onChange={(e) => setPredio(Number(e.target.value))}
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button 
                    type="button" 
                    onClick={scheduleFormProps.onCancel}
                    className="text-sm/6 font-semibold text-gray-900"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Salvar
                </button>
            </div>
        </form>
    )
}