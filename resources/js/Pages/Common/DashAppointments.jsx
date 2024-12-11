
export default function ListAppointments({ appointments }) {
    return (
        <div>
            {appointments && appointments.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Cita</th>
                        </tr>
                    </thead>

                    <tbody>
                        {appointments.map((appt, index) => (
                            <tr key={index}>
                                <td>{appt}</td>
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
