import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";

import { Head, useForm } from "@inertiajs/react";

export default function CompleteDoctor({ doctorData, specialties, locations }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        specialty: "",
        location: "",
        password: "",
        password_confirmation: "",
        type: "patient",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("completeDoctor"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Completar Datos Doctor
                </h2>
            }
        >
            <Head title="Configuraciones Doctor" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <p>Completar perfil</p>
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel
                                        htmlFor="specialty"
                                        value="specialty"
                                    />

                                    <select
                                        id="specialty"
                                        name="specialty"
                                        value={data.specialty}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("specialty", e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Seleccione una especialidad
                                        </option>

                                        {specialties.map((specialty) => (
                                            <option
                                                key={specialty.id}
                                                value={specialty.id}
                                            >
                                                {specialty.title}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError
                                        message={errors.specialty}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="location"
                                        value="location"
                                    />

                                    <select
                                        id="location"
                                        name="location"
                                        value={data.location}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("location", e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Seleccione una ubicación
                                        </option>

                                        {locations.map((location) => (
                                            <option
                                                key={location.id}
                                                value={location.id}
                                            >
                                                {location.title}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError
                                        message={errors.location}
                                        className="mt-2"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
