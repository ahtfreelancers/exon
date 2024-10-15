'use client'
import { Button } from "@/components/ui/button";

const NoAccess = () => {
    const handleBackClick = () => {

    }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg mb-6">
        Sorry, you do not have access to this page.
      </p>
      <Button onClick={handleBackClick}>
        Go Back
      </Button>
    </div>
  );
};

export default NoAccess;
