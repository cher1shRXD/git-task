import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";
import { Suspense } from "react";

const RepositoryPage = dynamic(() => import("@/components/serverPage/RepositoryPage"), {
  ssr: true,
  loading: () => <Loader />
});

export default function RepositoryWrapper({
  organization,
  repository,
}: {
  organization: string;
  repository: string;
}) {
  return (
    <Suspense fallback={<Loader />}>
      <RepositoryPage organization={organization} repository={repository} />
    </Suspense>
  );
}
