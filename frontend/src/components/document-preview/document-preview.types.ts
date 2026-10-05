export interface DocumentPreviewState {
  blob: Blob | undefined
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

export interface DocumentPreviewDialogProps extends DocumentPreviewState {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  onDownload: (blob: Blob) => void
}
