'use client';

import AcmeLogo from '@/app/ui/acme-logo';
import RegisterForm from '@/app/ui/register-form';
import withAuth from '@/app/hoc/withAuth';

function RegisterPage() {
  return (
    <main className="flex items-center justify-center">
      <div className="relative mx-auto flex w-full flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end rounded-lg bg-orange-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}
export default withAuth(RegisterPage);
