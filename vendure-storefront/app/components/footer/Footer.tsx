import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useRootLoader } from '~/utils/use-root-loader';
import { RootLoaderData } from '~/root';

const navigation = {
  support: [
    { page: 'help', href: '#' },
    { page: 'trackOrder', href: '#' },
    { page: 'shipping', href: '#' },
    { page: 'returns', href: '#' },
  ],
  company: [
    { page: 'about', href: '#' },
    { page: 'blog', href: '#' },
    { page: 'responsibility', href: '#' },
    { page: 'press', href: '#' },
  ],
};

export default function Footer({
  collections,
}: {
  collections: RootLoaderData['collections'];
}) {
  const { t } = useTranslation();
  
  const data = useRootLoader();
  const isSignedIn = !!data.activeCustomer.activeCustomer?.id;

  return (
    <footer
      className="mt-24 border-t bg-gradient-to-r from-blue-700 to-teal-900"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        {t('footer.title')}
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-blue-300 tracking-wider uppercase">
                  {t('footer.shop')}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {collections.map((collection) => (
                    <li key={collection.id}>
                      <Link
                        className="text-base text-gray-300 hover:text-white"
                        to={'/collections/' + collection.slug}
                        prefetch="intent"
                        key={collection.id}
                      >
                        {collection.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-blue-300 tracking-wider uppercase">
                  {t('footer.support')}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.support.map(({ page, href }) => (
                    <li key={page}>
                      <a
                        href={href}
                        className="text-base text-gray-300 hover:text-white"
                      >
                        {t(`navigation.support.${page}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-blue-300 tracking-wider uppercase">
                  {t('account.company')}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.company.map(({ page, href }) => (
                    <li key={page}>
                      <a
                        href={href}
                        className="text-base text-gray-300 hover:text-white"
                      >
                        {t(`navigation.company.${page}`)}
                      </a>
                    </li>
                  ))}
                  <li>
                    <Link
                      to={isSignedIn ? '/account' : '/sign-in'}
                      className="text-base text-gray-300 hover:text-white"
                    >
                      {isSignedIn ? t('account.myAccount') : t('account.signIn')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold text-blue-300 tracking-wider uppercase">
              {t('footer.subscribeHeader')}
            </h3>
            <p className="mt-4 text-base text-gray-300">
              {t('footer.subscribeIntro')}
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                {t('account.emailAddress')}
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-white bg-opacity-20 border border-transparent rounded-md py-2 px-4 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white"
                placeholder={t('footer.emailPlaceholder')}
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-blue-500 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                >
                  {t('footer.subscribe')}
                </button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </footer>
  );
}

