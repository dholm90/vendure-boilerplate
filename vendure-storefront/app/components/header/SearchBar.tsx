import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

export function SearchBar() {
  const { t } = useTranslation();

  let initialQuery = '';
  if (typeof window === 'undefined') {
    // running in a server environment
  } else {
    // running in a browser environment
    initialQuery = new URL(window.location.href).searchParams.get('q') ?? '';
  }

  return (
    <Form method="get" action="/search" key={initialQuery} className='relative'>
      <input
        type="search"
        name="q"
        defaultValue={initialQuery}
        placeholder={t('common.search')}
        className="w-full bg-white bg-opacity-20 rounded-full py-2 px-4 pl-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-300 absolute left-3 top-1/2 transform -translate-y-1/2" />
    </Form>
  );
}
