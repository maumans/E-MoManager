import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        nom: user.nom,
        prenom: user.prenom,
        login: user.login,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Information du profil</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Mettre au jour vos infos
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel for="prenom" value="Prenom" />

                    <TextInput
                        id="prenom"
                        className="mt-1 block w-full"
                        value={data.prenom}
                        handleChange={(e) => setData('prenom', e.target.value)}
                        required
                        autofocus
                        autocomplete="prenom"
                    />

                    <InputError className="mt-2" message={errors.prenom} />
                </div>

                <div>
                    <InputLabel for="nom" value="Nom" />

                    <TextInput
                        id="nom"
                        className="mt-1 block w-full"
                        value={data.nom}
                        handleChange={(e) => setData('nom', e.target.value)}
                        required
                        autofocus
                        autocomplete="nom"
                    />

                    <InputError className="mt-2" message={errors.nom} />
                </div>

                <div>
                    <InputLabel for="login" value="Login" />

                    <TextInput
                        id="login"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.login}
                        handleChange={(e) => setData('login', e.target.value)}
                        required
                        autocomplete="login"
                    />

                    <InputError className="mt-2" message={errors.login} />
                </div>

                <div>
                    <InputLabel for="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        handleChange={(e) => setData('email', e.target.value)}
                        required
                        autocomplete="email"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Votre adresse mail est non verifié.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cliquez ici pour renvoyer l'email de verification
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                Le nouveau lien de verification a été envoyé à votre adresse mail
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton processing={processing}>Enregistrer</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Enregistré</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
