import { ReactNode } from 'react';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      {children}
    </div>
  );
}

