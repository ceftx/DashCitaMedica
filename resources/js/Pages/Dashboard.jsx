import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";

export default function Dashboard({
    userRole,
    appointment,
    specialties,
    data,
}) {
    console.log(specialties[2].doctors);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                        {data && <div className="alert alert-success">{data.message}</div>}
                            {userRole === "admin" && (
                                <div>
                                    <h3>Panel de Administrador</h3>
                                    <p>
                                        Aquí puedes gestionar usuarios y citas.
                                    </p>
                                    {/* Agrega más contenido específico para el rol de admin */}

                                    {specialties && specialties.length > 0 ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Especialidades</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {specialties.map(
                                                    (specialty, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                {
                                                                    specialty.title
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>
                                            No hay Especialidades disponibles.
                                        </p>
                                    )}
                                </div>
                            )}

                            {userRole === "doctor" && (
                                <div>
                                    <h3>Panel de Doctor</h3>

                                    <p>
                                        Aquí puedes ver tus citas y pacientes.
                                    </p>

                                    {appointment && appointment.length > 0 ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Cita</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {appointment.map(
                                                    (appt, index) => (
                                                        <tr key={index}>
                                                            <td>{appt}</td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>No hay citas disponibles.</p>
                                    )}
                                </div>
                            )}

                            {userRole === "patient" && (
                                <div>
                                    <h3>Panel de Paciente</h3>

                                    <p>
                                        Aquí puedes ver tus citas y detalles de
                                        salud.
                                    </p>

                                    {appointment && appointment.length > 0 ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Cita</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {appointment.map(
                                                    (appt, index) => (
                                                        <tr key={index}>
                                                            <td>{appt}</td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>No has agendado ninguna cita.</p>
                                    )}

                                    {specialties && specialties.length > 0 ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Especialidades</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {specialties.map(
                                                    (specialty, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                {
                                                                    specialty.title
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>
                                            No hay Especialidades disponibles.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
