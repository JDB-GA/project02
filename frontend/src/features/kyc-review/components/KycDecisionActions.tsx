import { useKycDecision } from '../hooks/useKycDecision'
import { ApproveKycDialog } from './ApproveKycDialog'
import { RejectKycDialog } from './RejectKycDialog'

interface KycDecisionActionsProps {
  applicationId: string
  applicantName: string
}

export function KycDecisionActions({ applicationId, applicantName }: KycDecisionActionsProps) {
  const { approve, reject } = useKycDecision(applicationId)

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <RejectKycDialog reject={reject} />
      <ApproveKycDialog applicantName={applicantName} approve={approve} />
    </div>
  )
}
