import { DownloadIcon, XIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { DocumentPreviewDialogProps } from './document-preview.types'
import { DocumentPreviewBody } from './DocumentPreviewBody'

export function DocumentPreviewDialog({ open, onOpenChange, title, onDownload, ...state }: DocumentPreviewDialogProps) {
  const { t } = useTranslation()
  const { blob } = state

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="pt-15 sm:max-w-3xl">
        <DialogClose asChild>
          <Button variant="ghost" size="icon-sm" className="absolute top-3 end-3" aria-label={t('close')}>
            <XIcon aria-hidden="true" />
          </Button>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">{title}</DialogDescription>
        </DialogHeader>
        <DocumentPreviewBody {...state} title={title} />
        <DialogFooter>
          <Button
            disabled={!blob}
            onClick={() => {
              if (blob) {
                onDownload(blob)
              }
            }}
          >
            <DownloadIcon data-icon="inline-start" aria-hidden="true" />
            {t('preview.download')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
