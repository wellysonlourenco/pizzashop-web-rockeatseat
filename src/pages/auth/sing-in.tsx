import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


const singInForm = z.object({
    email: z.string().email(),
})

type SingInForm = z.infer<typeof singInForm>


export function SignIn() {
    const { register, handleSubmit, formState: { isSubmitted } } = useForm<SingInForm>();

    async function handleSignIn(data: SingInForm) {

        console.log(data);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        toast.success('Enviamos um link de autenticação para o seu e-mail!',
            {
                action: {
                    label: 'Reenviar e-mail',
                    onClick: () => handleSignIn(data),
                }
            }
        );
    }

    return (
        <>
            <Helmet title='Login' />
            <div className="p-8 ">
                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Acessar Painel</h1>
                        <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro!</p>
                    </div>


                    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
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