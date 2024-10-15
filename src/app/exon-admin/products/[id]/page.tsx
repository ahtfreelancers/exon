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
        name,
        brandName,
        lotNo,
        batchNo,
        manufactureDate,
        expirationDate,
        price,
    } = data;

    return (
        <section className="container mx-auto">
            <Link href="/products" className="flex mb-5"><ChevronLeft />Back</Link>
            <div className="bg-white rounded-md p-4 flex flex-col md:flex-row">
                <div className="mt-4 md:mt-0 text-gray-700 flex flex-col gap-2">
                    <h1><label>Name : </label >{name}</h1>
                    <p><label>Brand Name : </label >{brandName}</p>
                    <p><label>Price : </label >{price}</p>
                    <p><label>Lot No : </label >{lotNo}</p>
                    <p><label>Batch No : </label >{batchNo}</p>
                    <p><label>Manufacture Date : </label >{manufactureDate}</p>
                    <p><label>Expiration Date : </label >{expirationDate}</p>
                </div>
            </div>
        </section>
    );
};

export default MedicineDetailed;
