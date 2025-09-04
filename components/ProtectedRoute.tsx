import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const ProtectedRoute = ({
  children,
  authentication = true
}: {
  children: React.ReactNode;
  authentication?: boolean;
}) => {
  const [loader, setLoader] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const authStatus = useSelector((state: RootState) => state.auth.authStatus);

  useEffect(() => {
    console.log(authStatus)
    if (authentication && !authStatus) {
      router.push('/auth/login');
    }
    else if (!authentication && authStatus) {
      router.push('/dashboard');
    } else {
      setLoader(false);
    }
  }, [authStatus, authentication, pathname, router]);

  return loader ? <>Loading...</> : <>{children}</>;
};

export default ProtectedRoute;