import { getDistributor } from "@/actions/distributor";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface HospitalDetailedPageProps {
    params: {
        id: string;
    };
}

const HospitalDetailed = async ({ params }: HospitalDetailedPageProps) => {
    const { id } = params;
    const { data }: any = await getDistributor(id);

    if (!data) {
        return <div>Loading...</div>;
    }

    const {
        name,
        gstNumber,
        phoneNumber,
        panNumber,
        address
    } = data;

    return (
        <section className="container mx-auto">
            <Link href="/exon-admin/distributors" className="flex mb-5"><ChevronLeft />Back</Link>
            <div className="bg-white rounded-md p-4 flex flex-col md:flex-row">
                <div className="mt-4 md:mt-0 text-gray-700 flex flex-col gap-2">
                    <p><label className="font-bold">Name : </label >{name}</p>
                    <p><label className="font-bold">GST Number : </label >{gstNumber}</p>
                    <p><label className="font-bold">Phone Number : </label >{phoneNumber}</p>
                    <p><label className="font-bold">Pan Number : </label >{panNumber}</p>
                    <p><label className="font-bold">Address 1 : </label >{address?.address1}</p>
                    <p><label className="font-bold">Address 2 : </label >{address?.address2}</p>
                    <p><label className="font-bold">City : </label >{address?.city}</p>
                    <p><label className="font-bold">State : </label >{address?.state}</p>
                    <p><label className="font-bold">Pincode : </label >{address?.pinCode}</p>
                </div>
            </div>
        </section>
    );
};

export default HospitalDetailed;
