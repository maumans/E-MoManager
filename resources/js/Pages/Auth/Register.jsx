import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import {TextField} from "@mui/material";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
        prenom: '',
        login: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout titre="Inscription">
            <Head title="Register" />

            <form onSubmit={submit}>

                <div>

                    <div className="bg-white rounded p-2">
                        <TextField
                            label="Prenom"
                            type="text"
                            name="prenom"
                            className="mt-1 block w-full"
                            autoComplete="prenom"
                            onChange={onHandleChange}
                            required
                        />
                    </div>
                    <InputError message={errors.prenom} className="mt-2" />
                </div>

                <div className="mt-4">

                    <div className="bg-white rounded p-2">
                        <TextField
                            label="Nom"
                            type="text"
                            name="nom"
                            className="mt-1 block w-full"
                            autoComplete="nom"
                            onChange={onHandleChange}
                            required
                        />
                    </div>

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">

                    <div className="bg-white rounded p-2">
                        <TextField
                            label="Login"
                            type="text"
                            name="login"
                            className="mt-1 block w-full"
                            autoComplete="login"
                            onChange={onHandleChange}
                            required
                        />
                    </div>

                    <InputError message={errors.login} className="mt-2" />
                </div>

                <div className="mt-4">

                    <div className="bg-white rounded p-2">
                        <TextField
                            label="E-mail"
                            type="text"
                            name="email"
                            className="mt-1 block w-full"
                            autoComplete="email"
                            onChange={onHandleChange}
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">

                    <div className="bg-white rounded p-2">
                        <TextField
                            label="Mot de passe"
                            type="password"
                            name="password"
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={onHandleChange}
                            required
                        />
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">

                    <div className="bg-white rounded p-2">
                        <TextField
                            label="Confirmer mot de passe"
                            type="password"
                            name="password_confirmation"
                            className="mt-1 block w-full"
                            autoComplete="password"
                            onChange={onHandleChange}
                            required
                        />
                    </div>

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-white hover:text-gray-200 rounded-md"
                    >
                        Déjà enregistré?
                    </Link>

                    <PrimaryButton className="ml-4" processing={processing}>
                        S'inscrire
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
