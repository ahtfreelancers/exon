import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { getProductType } from "@/actions/product-types";
import { getInvoice } from "@/actions/invoice";
import { getAllHospitals } from "@/actions/hospitals";
import { getAllDistributors } from "@/actions/distributor";
import CreditNotesForm from "@/components/root/credit-notes-form";

interface CreditNotesEditPageProps {
    params: {
        id: string;
    };
}

const CreditNotesEditPage = async ({ params }: CreditNotesEditPageProps) => {
    const session = await auth()

    if (!session) {
        return redirect('/exon-admin')
    }
    const { id } = params;


     let paramsQuery = {
           PageNumber: 1,
           pageSize: 10
       }
   
       const { data }: any = await getInvoice(id);
       const { data: hospitals }: any = await getAllHospitals(paramsQuery)
       const { data: distributors }: any = await getAllDistributors(paramsQuery)
       const { data: invoiceList }: any = await getAllHospitals(paramsQuery)
   
   
   
       
       return (
           <CreditNotesForm invoice={data} invoiceId={id ?? null} hospitals={hospitals?.items} distributors={distributors?.items} invoiceList={invoiceList?.items}/>
       );
}

export default CreditNotesEditPage;
