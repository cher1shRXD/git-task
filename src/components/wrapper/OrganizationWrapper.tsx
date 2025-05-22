'use client'

import { Suspense } from "react"
import Loader from "@/components/common/Loader"
import OrganizationPage from "../serverPage/OrganizationPage"

export default function OrganizationWrapper({
  organization
}: {
  organization: string
}) {
  return (
    <Suspense fallback={<Loader />}>
      <OrganizationPage organization={organization} />
    </Suspense>
  )
}
