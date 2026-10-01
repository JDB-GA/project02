import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { UserDetails } from './UserDetails'

interface WelcomeCardProps {
  heading: string
}

export function WelcomeCard({ heading }: WelcomeCardProps) {
  const { data: user } = useCurrentUser()

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">
          <h1>{heading}</h1>
        </CardTitle>
      </CardHeader>
      {user && (
        <CardContent>
          <UserDetails user={user} />
        </CardContent>
      )}
    </Card>
  )
}
