import Loader from "@/components/common/Loader"
import { PropsWithChildren, Suspense } from "react"

const OrganizationLayout = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<Loader />}>{children}</Suspense>
  )
}

export default OrganizationLayout