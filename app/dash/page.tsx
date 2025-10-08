'use client'
import Button from '@mui/material/Button';
import { getCurrentUser, AuthUser } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

export default function DashPage() {
      const [user, setUser] = useState<AuthUser | null>(null);

      useEffect(() => {
        (async () => {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        })();
      }, []);
    return <div>
        {JSON.stringify(user)}
    </div>;
}
