import { useState } from "react";

export default function ListSpecialty({ specialties }) {
    const [expandedSpecialty, setExpandedSpecialty] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSpecialtyClick = (specialtyId) => {
        if (expandedSpecialty === specialtyId) {
            setExpandedSpecialty(null);
        } else {
            setExpandedSpecialty(specialtyId);
        }
    };

    const filteredSpecialties = specialties.filter((specialty) =>
        specialty.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            <tr>
                                <td colSpan="2">
                                    {specialty.doctors.length > 0 ? (
                                        specialty.doctors.map(
                                            (doctor, doctorIndex) => (
                                                <div
                                                    className="fs-3x bg-indigo-500"
                                                    key={doctorIndex}
                                                >
                                                    {doctor.fullname
                                                        ? doctor.fullname
                                                        : "Nombre no disponible"}
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <div>No hay doctores disponibles</div>
                                    )}
                                </td>
                            </tr>
                        )}
                    </div>
                ))
            ) : (
                <div>Sin Coincidencias</div>
            )}
        </div>
    );
}
