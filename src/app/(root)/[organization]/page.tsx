// import Loader from "@/components/common/Loader";
import OrganizationPage from "@/components/serverPage/OrganizationPage";
// import { Suspense } from "react";

const Organization = async ({
  params,
}: {
  params: Promise<{ organization: string }>;
}) => {
  const { organization } = await params;
  
  return (
    // <Suspense fallback={<Loader />}>
      <OrganizationPage organization={organization} />
    // </Suspense>
  )
}

export default Organization