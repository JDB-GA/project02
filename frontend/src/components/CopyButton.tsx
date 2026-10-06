import { CheckIcon, CopyIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { COPY_FEEDBACK_MS } from './copy-button.constants'

interface CopyButtonProps {
  value: string
  label: string
  successMessage: string
  failureMessage: string
}

export function CopyButton({ value, label, successMessage, failureMessage }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard(COPY_FEEDBACK_MS)

  const handleCopy = async () => {
    if (await copy(value)) {
      toast.success(successMessage)
    } else {
      toast.error(failureMessage)
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={() => {
        void handleCopy()
      }}
    >
      {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
    </Button>
  )
}
