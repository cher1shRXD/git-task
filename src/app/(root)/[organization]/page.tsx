import OrganizationWrapper from "@/components/wrapper/OrganizationWrapper";

const Organization = async ({
  params,
}: {
  params: Promise<{ organization: string }>;
}) => {
  const { organization } = await params;
  
  return <OrganizationWrapper organization={organization} />
}

export default Organization