import RepositoryWrapper from "@/components/wrapper/RepositoryWrapper";


const Repository = async ({
  params,
}: {
  params: Promise<{ organization: string, repository: string }>;
}) => {
  const { organization, repository } = await params;

  return <RepositoryWrapper organization={organization} repository={repository} />
}

export default Repository;