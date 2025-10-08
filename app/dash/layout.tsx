"use client"

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import "./dash.css"
import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/components/dash/theme';
import DashLayout from '@/components/dash/DashLayout';
import { Authenticator } from '@aws-amplify/ui-react';

//aws configure
import { Amplify } from 'aws-amplify';
import outputs from "@/amplify_outputs.json";
Amplify.configure(outputs);

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Authenticator>
          {({ signOut, user }) => (
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider theme={theme}>
                <DashLayout user={user}>
                  {children}
                </DashLayout>
              </ThemeProvider>
            </AppRouterCacheProvider>
          )} 
        </Authenticator>
      </body>
    </html>
  );
}
