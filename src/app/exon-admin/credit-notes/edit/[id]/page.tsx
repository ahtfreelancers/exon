import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { getAllHospitals } from "@/actions/hospitals";
import { getAllDistributors } from "@/actions/distributor";
import CreditNotesForm from "@/components/root/credit-notes-form";
import { getAllLedgers, getCreditNote } from "@/actions/credit-notes";

interface CreditNotesEditPageProps {
    params: {
        id: string;
    };
    searchParams: {
        listType?: string;
    };
}

const CreditNotesEditPage = async ({ params, searchParams }: CreditNotesEditPageProps) => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }
    const { id } = params;
    const { listType } = searchParams;


    let paramsQuery = {
        PageNumber: 1,
        pageSize: 10,
    }

    const { data }: any = await getCreditNote(id);
    const { data: hospitals }: any = await getAllHospitals(paramsQuery)
    const { data: distributors }: any = await getAllDistributors(paramsQuery)
    const { data: invoiceList }: any = await getAllHospitals(paramsQuery)

    const { data: ledgers }: any = await getAllLedgers(params)

    console.log("ledgers::::::", data)

    return (
        <CreditNotesForm invoice={data} invoiceId={id ?? null} hospitals={hospitals?.items} distributors={distributors?.items} invoiceList={invoiceList?.items} ledgers={ledgers} listType={listType} />
    );
}

export default CreditNotesEditPage;
