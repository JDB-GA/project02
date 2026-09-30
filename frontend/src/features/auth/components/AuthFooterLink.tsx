import { Link } from 'react-router'

interface AuthFooterLinkProps {
  prompt: string
  label: string
  to: string
}

export function AuthFooterLink({ prompt, label, to }: AuthFooterLinkProps) {
  return (
    <>
      {prompt}{' '}
      <Link to={to} className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
        {label}
      </Link>
    </>
  )
}
