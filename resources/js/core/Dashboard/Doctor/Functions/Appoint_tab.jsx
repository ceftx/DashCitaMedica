import { useState } from "react";

import Datepicker from "tailwind-datepicker-react";
import { toast } from "react-toastify";
import { router } from "@inertiajs/react";

export default function Appoint_tab({
    selectedAppointment,
    onClose,
    onUpdate,
}) {
    const [show, setShow] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);

    const [selectedTime, setSelectedTime] = useState("");

    // Configuración del datepicker (mantén la configuración anterior)

    const options = {
        // ... (configuración previa)

        defaultDate: selectedAppointment?.date
            ? new Date(selectedAppointment.date)
            : new Date(),
        defaultDate: selectedAppointment?.date
            ? new Date(selectedAppointment.date)
            : new Date(),
    };

    const handleChange = (selectedDate) => {
        setSelectedDate(selectedDate);
    };

    const handleClose = (state) => {
        setShow(state);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleSubmit = () => {
        // Validar que se haya seleccionado fecha y hora

        if (!selectedDate || !selectedTime) {
            toast.error("Por favor, selecciona fecha y hora");
            return;
        }

        // Formatear la fecha

        const formattedDate = selectedDate.toISOString().split("T")[0];

        // Enviar datos al backend para actualizar la cita

        router.put(
            `/appointments/${selectedAppointment.id}/schedule`,
            {
                date: formattedDate,

                hour: selectedTime,
            },
            {
                onSuccess: () => {
                    toast.success("Cita agendada exitosamente");
                    onUpdate();
                    onClose(); // Cerrar el modal o resetear la selección
                },

                onError: (errors) => {
                    console.error("Error al agendar cita:", errors);
                },
            }
        );
    };

    // Si no hay cita seleccionada, no mostrar nada

    if (!selectedAppointment) return null;

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">
                Agendar Cita #{selectedAppointment.id}
            </h2>

            <div className="mb-4">
                <label className="block mb-2">Paciente:</label>

                <p>{selectedAppointment.patient?.fullname}</p>
            </div>

            <div className="mb-4">
                <Datepicker
                    options={options}
                    onChange={handleChange}
                    show={show}
                    setShow={handleClose}
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Hora:</label>

                <select
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="w-full border rounded p-2"
                >
                    <option value="">Selecciona una hora</option>

                    <option value="09:00">09:00 AM</option>

                    <option value="10:00">10:00 AM</option>

                    <option value="11:00">11:00 AM</option>

                    <option value="14:00">02:00 PM</option>

                    <option value="15:00">03:00 PM</option>

                    <option value="16:00">04:00 PM</option>
                </select>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Guardar Cita
                </button>

                <button
                    onClick={onClose}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
