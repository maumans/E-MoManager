import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/inertia-react';
import {TextField} from "@mui/material";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>

                <div>

                    <div className="bg-white rounded p-2">
                        <TextField
                            label="E-mail"
                            type="text"
                            name="email"
                            className="mt-1 block w-full"
                            autoComplete="username"
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
                    <PrimaryButton className="ml-4" processing={processing}>
                        Réinitialiser le mot de passe
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
