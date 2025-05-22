'use client'

import { Suspense } from "react"
import Loader from "@/components/common/Loader"
import RepositoryPage from "@/components/serverPage/RepositoryPage"

export default function RepositoryWrapper({
  organization,
  repository,
}: {
  organization: string
  repository: string
}) {
  return (
    <Suspense fallback={<Loader />}>
      <RepositoryPage organization={organization} repository={repository} />
    </Suspense>
  )
}
