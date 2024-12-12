import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function SpecialtyList({ onAppointmentCreated }) {
    const [specialties, setSpecialties] = useState([]);
    const [expandedSpecialty, setExpandedSpecialty] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loadingAppointment, setLoadingAppointment] = useState({});

    const fetchSpecialties = async () => {
        try {
            const response = await axios.get("/get/Specialties");
            setSpecialties(response.data);
        } catch (error) {
            console.error("Error al cargar citas", error);
            toast.error("Error al cargar citas");
        }
    };

    const handleSpecialtyClick = (specialtyId) => {
        if (expandedSpecialty === specialtyId) {
            setExpandedSpecialty(null);
        } else {
            setExpandedSpecialty(specialtyId);
        }
    };

    const handleRequestAppointment = async (doctorId) => {
        try {
            // Iniciar estado de carga para este doctor
            setLoadingAppointment((prev) => ({
                ...prev,
                [doctorId]: true,
            }));
            // Hacer la petición para crear la cita
            const response = await axios.post("/patient/new/appointment", {
                doctor_id: doctorId,
            });
            // Mostrar mensaje de éxito
            toast.success("Cita solicitada correctamente");
            // Llamar a la función para recargar citas
            if (onAppointmentCreated) {
                onAppointmentCreated();
            }
        } catch (error) {
            // Manejar errores
            toast.error(
                error.response?.data?.message || "Error al solicitar cita"
            );
            console.error(error);
        } finally {
            // Restaurar estado de carga
            setLoadingAppointment((prev) => ({
                ...prev,
                [doctorId]: false,
            }));
        }
    };

    const filteredSpecialties = specialties.filter((specialty) =>
        specialty.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchSpecialties();
    }, []);
    return (
        <div>
            <p className="text-3xl">Especialidades</p>
            <input
                type="text"
                placeholder="Buscar especialidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 mb-4 text-black"
            />
            {filteredSpecialties && filteredSpecialties.length > 0 ? (
                filteredSpecialties.map((specialty, index) => (
                    <div key={index}>
                        <button
                            onClick={() => handleSpecialtyClick(specialty.id)}
                            style={{ cursor: "pointer" }} // Cambia el cursor al pasar sobre el título
                        >
                            {specialty.title}
                        </button>
                        {expandedSpecialty === specialty.id && (
                            <div>
                                {(() => {
                                    const availableDoctors =
                                        specialty.doctors.length > 0
                                            ? specialty.doctors.filter(
                                                  (doctor) =>
                                                      doctor.status === 1
                                              )
                                            : [];

                                    return availableDoctors.length > 0 ? (
                                        availableDoctors.map(
                                            (doctor, doctorIndex) => (
                                                <div
                                                    className="fs-3x ms-4"
                                                    key={doctorIndex}
                                                >
                                                    {doctor.fullname
                                                        ? doctor.fullname
                                                        : "Nombre no disponible"}

                                                    <button
                                                    className="rounded p-2 bg-green-500 text-white ms-2"
                                                        onClick={() =>
                                                            handleRequestAppointment(
                                                                doctor.id
                                                            )
                                                        }
                                                        disabled={
                                                            loadingAppointment[
                                                                doctor.id
                                                            ]
                                                        }
                                                    >
                                                        {loadingAppointment[
                                                            doctor.id
                                                        ]
                                                            ? "Solicitando..."
                                                            : "Solicitar Cita"}
                                                    </button>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <div>
                                            No hay doctores disponibles en esta
                                            especialidad.
                                        </div>
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div>Sin Coincidencias</div>
            )}
        </div>
    );
}
