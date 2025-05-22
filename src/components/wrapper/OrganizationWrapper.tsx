import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";
import { Suspense } from "react";
const OrganizationPage = dynamic(() => import("../serverPage/OrganizationPage"), {
  ssr: true,
  loading: () => <Loader />
});

export default function OrganizationWrapper({
  organization,
}: {
  organization: string;
}) {
  return (
    <Suspense fallback={<Loader />}>
      <OrganizationPage organization={organization} />
    </Suspense>
  );
}
