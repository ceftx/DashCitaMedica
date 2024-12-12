export default function ListAppointments({
    appointments,
    onScheduleAppointment,
}) {
    return (
        <div>
            {appointments && appointments.length > 0 ? (
                <table>
                    <thead>{/* ... encabezados anteriores ... */}</thead>

                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={index}>
                                <td>{appointment.id}</td>

                                <td>{appointment.patient?.fullname}</td>

                                <td>{appointment.created_at}</td>

                                <td>
                                    {appointment.hour
                                        ? appointment.date
                                        : "Sin Asignar"}
                                </td>

                                <td>
                                    {appointment.date
                                        ? appointment.hour
                                        : "Sin Asignar"}
                                </td>

                                <td>{appointment.status}</td>

                                <td>
                                    <button
                                        onClick={() =>
                                            onScheduleAppointment(appointment)
                                        }
                                    >
                                        Agendar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No has agendado ninguna cita.</p>
            )}
        </div>
    );
}
