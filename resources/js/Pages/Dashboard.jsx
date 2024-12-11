import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import DashSpecialty from "@/Pages/Common/DashSpecialty";
import DashAppoinments from "@/Pages/Common/DashAppointments";

import { Head } from "@inertiajs/react";

export default function Dashboard({
    userRole,
    appointments,
    specialties,
    data,
}) {
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
                            {data && (
                                <div className="alert alert-success">
                                    {data.message}
                                </div>
                            )}
                            {userRole === "admin" && (
                                <div>
                                    <h3>Panel de Administrador</h3>
                                    <p>
                                        Aquí puedes gestionar usuarios y citas.
                                    </p>
                                    <DashAppoinments
                                        appointments={appointments}
                                    />
                                    <DashSpecialty specialties={specialties} />
                                </div>
                            )}

                            {userRole === "doctor" && (
                                <div>
                                    <h3>Panel de Doctor</h3>

                                    <p>
                                        Aquí puedes ver tus citas y pacientes.
                                    </p>

                                    <DashAppoinments
                                        appointments={appointments}
                                    />
                                </div>
                            )}

                            {userRole === "patient" && (

                                
                                <div>
                                    <h3>Panel de Paciente</h3>
                                    <p>
                                        Aquí puedes ver tus citas y detalles de
                                        salud.
                                    </p>
                                    <DashAppoinments
                                        appointments={appointments}
                                    />
                                    <DashSpecialty specialties={specialties} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
