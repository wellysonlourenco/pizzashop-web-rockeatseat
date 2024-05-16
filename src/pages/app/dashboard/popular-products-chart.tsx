import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer } from 'recharts';



const data = [
    { product: 'Pizza', amount: 1200 },
    { product: 'X-Salada', amount: 800 },
    { product: 'X-tudo', amount: 900 },
    { product: 'Sorvete', amount: 1300 },
    { product: 'Pastel', amount: 2000 },
    { product: 'Lanche', amount: 1000 },
    { product: 'X-burguer', amount: 600 },
]


export function PopularProductsChart() {
    return (
        <Card className="col-span-3">
            <CardHeader className="pb-8">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">Produtos populares</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={240} >
                    <PieChart style={{ fontSize: 12 }}>
                        <Pie data={data} dataKey="amount" nameKey="product" />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}