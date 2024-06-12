import { getManagedRestaurant } from '@/api/get-managed-restaurant';
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";


const storedProfileSchema = z.object({
    name: z.string(),
    description: z.string(),
})


type StoredProfileSchema = z.infer<typeof storedProfileSchema>

export function StoreProfileDialog() {

    const { data: managedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant
    })

    console.log(managedRestaurant)

    const { register, handleSubmit } = useForm<StoredProfileSchema>({
        resolver: zodResolver(storedProfileSchema),
        values: {
          name: managedRestaurant?.name ?? '',
          description: managedRestaurant?.description ?? '',
        },
      })


    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da Loja</DialogTitle>
                <DialogDescription>Visualize e edite as informações da sua loja</DialogDescription>

            </DialogHeader>

            <form action="">
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nome da Loja
                        </Label>
                        <Input className="col-span-3" id="name" {...register('name')}/>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Descrição
                        </Label>
                        <Textarea className="col-span-3" id="description" {...register('description')} />
                    </div>

                </div>


                <DialogFooter>
                    <Button>Cancelar</Button>
                    <Button type="submit" variant="sucess">Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}