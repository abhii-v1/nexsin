import { ProviderStatusView } from "@/components/provider-status-view"

export const metadata = {
  title: "Application Status - Service Platform",
  description: "Check your service provider application status",
}

export default function ProviderStatusPage({ params }: { params: { id: string } }) {
  return <ProviderStatusView applicationId={params.id} />
}
