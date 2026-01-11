import PrintForm from '@/components/PrintForm';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans'>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-4 sm:py-8 px-4 sm:px-16 bg-white sm:items-start'>
        <PrintForm />
      </main>
    </div>
  );
}
