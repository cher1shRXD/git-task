// import Loader from "@/components/common/Loader";
import RepositoryPage from "@/components/serverPage/RepositoryPage";
// import { Suspense } from "react";

const Repository = async ({
  params,
}: {
  params: Promise<{ organization: string, repository: string }>;
}) => {
  const { organization, repository } = await params;

  return (
    // <Suspense fallback={<Loader />}>
      <RepositoryPage organization={organization} repository={repository} />
    // </Suspense>
  )
}

export default Repository;