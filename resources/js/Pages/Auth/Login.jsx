import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import {TextField} from "@mui/material";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout titre={"Connexion"}>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <div className="bg-white rounded p-2">
                        <TextField
                            label="Identifiant"
                            type="text"
                            name="login"
                            className="mt-1 block w-full"
                            autoComplete="login"
                            onChange={onHandleChange}
                        />
                    </div>
                    <InputError message={errors.login} className="mt-2" />
                </div>

                <div className="mt-4">
                    <div className="bg-white rounded p-2">
                        <TextField
                            label="Mot de passe"
                            type="password"
                            name="password"
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={onHandleChange}
                        />
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />
                        <span className="ml-2 text-sm text-white">Se souvenir de moi</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-white hover:text-gray-200 rounded-md"
                        >
                            Mot de passe oublié?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" processing={processing}>
                        Connexion
                    </PrimaryButton>
                </div>
            </form>

            <div className={"flex justify-center w-full mt-10"}>
                <Link
                    href={route('register')}
                    className=" text-lg underline text-sm text-white hover:text-gray-200 rounded-md focus:ring-indigo-500"
                >
                    S'inscrire
                </Link>
            </div>
        </GuestLayout>
    );
}
