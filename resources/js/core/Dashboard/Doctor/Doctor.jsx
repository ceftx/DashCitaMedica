import { useState, useEffect } from "react";

import AppointmentsTable from "./Tables/AppointmentsTable";
import Appoint_tab from "./Functions/Appoint_tab";
export default function Doctor({ doctor }) {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get("/get/Appointments");
            setAppointments(response.data);
        } catch (error) {
            console.error("Error al cargar citas", error);
            toast.error("Error al cargar citas");
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleScheduleAppointment = (appointment) => {
        setSelectedAppointment(appointment);
    };
    const handleCloseAppointmentTab = () => {
        setSelectedAppointment(null);
    };
    return (
        <div>
            <h3>Panel de Doctor</h3>
            <p>
                Status <span>{doctor.status ? "Activo" : "Desactivado"}</span>
            </p>
            <p>Aquí puedes ver tus citas y pacientes.</p>
            <AppointmentsTable appointments={appointments}
                onScheduleAppointment={handleScheduleAppointment} />
            {selectedAppointment && (
                <Appoint_tab
                    selectedAppointment={selectedAppointment}
                    onClose={handleCloseAppointmentTab}
                />
            )}
        </div>
    );
}
