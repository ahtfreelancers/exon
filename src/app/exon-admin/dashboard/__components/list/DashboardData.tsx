'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from 'react'
import { getDashboardData } from "@/actions/dashboard";
import { MoveDown, MoveUp, Recycle, Undo2 } from "lucide-react";

export default function DashboardWrapper() {
    const [data, setData]: any = useState([])
    const [todate, setToD] = useState("")
    const [fromdate, setFrom] = useState("")

    const fetchMedicines = async () => {
        try {
            const { data, isSuccess }: any = await getDashboardData();
            console.log("data", data);

            if (isSuccess) {
                setData(data);
            }
        } catch (err) {
            console.log(`Error:`, err);
        }
    };

    useEffect(() => {
        fetchMedicines()
    }, [todate, fromdate])

    return (
        <>
            <div className="flex-col bg-white">
                <div className="flex-1 space-y-4 p-8 pt-2">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold ">
                            Hello Exon Therapeutics Team <span role="img" aria-label="waving hand">👋</span>
                        </h2>
                    </div>
                    {/* <h2 className="text-xl font-bold tracking-tight">
                    </h2> */}
                    {/* Cards Section */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Dispose Count</CardTitle>
                                <Recycle className="size-5" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold mb-1">{data?.disposeCount}</div>
                                {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">In Count</CardTitle>
                                <MoveDown className="size-5" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold mb-1">{data?.inCount}</div>
                                {/* <p className="text-xs text-muted-foreground">+180.1% from last month</p> */}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Out Count</CardTitle>
                                <MoveUp className="size-5" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold mb-1">{data?.outCount}</div>
                                {/* <p className="text-xs text-muted-foreground">+19% from last month</p> */}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Return Count</CardTitle>
                                <Undo2 className="size-5" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold mb-1">
                                    {data?.returnCount}
                                </div>
                                {/* <p className="text-xs text-muted-foreground">+201 since last hour</p> */}
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </>
    )
}
