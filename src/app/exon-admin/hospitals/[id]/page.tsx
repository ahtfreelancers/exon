import { getProduct } from "@/actions/products";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface ProductDetailedPageProps {
    params: {
        id: string;
    };
}

const MedicineDetailed = async ({ params }: ProductDetailedPageProps) => {
    const { id } = params;
    const { data }: any = await getProduct(id);

    if (!data) {
        return <div>Loading...</div>;
    }

    const {
        itemNo,
        itemDescription,
        serialNumber,
        lotNumber,
        manufactureDate,
        expirationDate,
        price,
    } = data;

    return (
        <section className="container mx-auto">
            <Link href="/exon-admin/products" className="flex mb-5"><ChevronLeft />Back</Link>
            <div className="bg-white rounded-md p-4 flex flex-col md:flex-row">
                <div className="mt-4 md:mt-0 text-gray-700 flex flex-col gap-2">
                    <p><label className="font-bold">Item No : </label >{itemNo}</p>
                    <p><label className="font-bold">Item Description : </label >{itemDescription}</p>
                    <p><label className="font-bold">Serial Number : </label >{serialNumber}</p>
                    <p><label className="font-bold">Price : </label >{price}</p>
                    <p><label className="font-bold">Lot No : </label >{lotNumber}</p>
                    <p><label className="font-bold">Manufacture Date : </label >{manufactureDate}</p>
                    <p><label className="font-bold">Expiration Date : </label >{expirationDate}</p>
                </div>
            </div>
        </section>
    );
};

export default MedicineDetailed;
