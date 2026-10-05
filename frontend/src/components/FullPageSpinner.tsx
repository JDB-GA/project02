import { LogoLoader } from './LogoLoader'

export function FullPageSpinner() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <LogoLoader />
    </div>
  )
}
