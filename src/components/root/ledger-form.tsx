"use client"

import { useTransition } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import agent from "@/app/api/axios"
import { toast } from "sonner"
import { useLoading } from "../loading-context"

const LedgerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    groupType: z.enum(["1", "2", "3"], { required_error: "Group Type is required" }),
    ledgerType: z.enum(["1", "2"], { required_error: "Ledger Type is required" }),
})

interface LedgerFormProps {
    type: number;
    ledger?: any;
}

export const LedgerForm = ({ type, ledger }: LedgerFormProps) => {
    const router = useRouter();
    const { setLoading } = useLoading()
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LedgerSchema>>({
        resolver: zodResolver(LedgerSchema),
        defaultValues: {
            name: ledger?.name || "",
            groupType: String(ledger?.groupType ?? "1") as any,
            ledgerType: String(ledger?.ledgerType ?? "1") as any,
        }
    });

    const onSubmit = async (values: z.infer<typeof LedgerSchema>) => {
        const newValues = {
            name: values.name,
            groupType: parseInt(values.groupType),
            ledgerType: parseInt(values.ledgerType),
        }

        try {
            setLoading(true)
            const response = type === 1
                ? await agent.Ledger.createLedger(newValues)
                : await agent.Ledger.updateLedger(ledger?.id, newValues)
            setLoading(false)

            if (response?.isSuccess) {
                form.reset()
                toast.success(`Ledger ${type === 1 ? "created" : "updated"} successfully`)
                router.push('/exon-admin/ledger')
            }
        } catch (error) {
            setLoading(false)
            console.error("An error occurred:", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending} placeholder="Enter Name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Group Type */}
                <FormField
                    control={form.control}
                    name="groupType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Group Type</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={isPending}
                            >
                                <FormControl>
                                    <SelectTrigger className="text-black">
                                        <SelectValue placeholder="Select Group Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                    <SelectItem value="1">Expense</SelectItem>
                                    <SelectItem value="2">Income</SelectItem>
                                    <SelectItem value="3">Discount</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Ledger Type */}
                <FormField
                    control={form.control}
                    name="ledgerType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ledger Type</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={isPending}
                            >
                                <FormControl>
                                    <SelectTrigger className="text-black">
                                        <SelectValue placeholder="Select Ledger Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                    <SelectItem value="1">Sale</SelectItem>
                                    <SelectItem value="2">Indirect Expense</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4">
                    <Button type="submit" disabled={isPending}>Save</Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => router.push("/exon-admin/ledger")}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    );
}
