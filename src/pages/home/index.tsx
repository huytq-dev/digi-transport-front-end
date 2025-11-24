'use client';

// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { HomeLayout } from '@/features/home/components/shared/home-layout';
import { UserHome } from '@/features/home/components/user/user-home';
// import { authService } from '@/features/auth/auth.service';

export default function HomePage() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if user is authenticated
  //   const user = authService.getUser();
  //   const isAuth = authService.isAuthenticated();

  //   if (!user || !isAuth) {
  //     // Redirect to sign-in if not authenticated
  //     navigate('/auth/sign-in', { replace: true });
  //   }
  // }, [navigate]);

  return (
    <HomeLayout>
      <UserHome />
    </HomeLayout>
  );
}

