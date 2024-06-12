import { singIn } from "@/api/sing-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";


const singInForm = z.object({
    email: z.string().email(),
})

type SingInForm = z.infer<typeof singInForm>


export function SingIn() {
    const [searchParams] = useSearchParams();


    const { register, handleSubmit, formState: { isSubmitted } } = useForm<SingInForm>({
        defaultValues: {
            email: searchParams.get('email') ?? ''
        }
    });

    const { mutateAsync: authenticate } = useMutation({
        mutationFn: singIn,
    })


    async function handleSingIn(data: SingInForm) {

        try {

            await authenticate({email: data.email});

            toast.success('Enviamos um link de autenticação para o seu e-mail!',
                {
                    action: {
                        label: 'Reenviar e-mail',
                        onClick: () => handleSingIn(data),
                    }
                }
            );
        } catch {
            toast.error('Ocorreu um erro ao enviar o e-mail de autenticação, tente novamente mais tarde.');
        }

    }

    return (
        <>
            <Helmet title='Login' />
            <div className="p-8 ">

                <Button variant="ghost" asChild className="absolute right-8 top-8">
                    <Link to="/sing-up">Novo Estabelecimento</Link>
                </Button>


                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Acessar Painel</h1>
                        <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro!</p>
                    </div>


                    <form onSubmit={handleSubmit(handleSingIn)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu E-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>
                        <Button disabled={isSubmitted} className="w-full" type="submit"> Acessar painel </Button>
                    </form>
                </div>
            </div>
        </>
    );
}