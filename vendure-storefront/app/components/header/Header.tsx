import { Link } from '@remix-run/react';
import { ShoppingBagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRootLoader } from '~/utils/use-root-loader';
import { useScrollingUp } from '~/utils/use-scrolling-up';
import { classNames } from '~/utils/class-names';
import { useTranslation } from 'react-i18next';
import { SearchBar } from './SearchBar';

export function Header({
  onCartIconClick,
  cartQuantity,
}: {
  onCartIconClick: () => void;
  cartQuantity: number;
}) {
  const data = useRootLoader();
  const isScrollingUp = useScrollingUp();
  const { t } = useTranslation();

  return (
    <header
      className={classNames(
        isScrollingUp ? 'sticky top-0 z-10 animate-dropIn' : '',
        'bg-gradient-to-r from-blue-700 to-teal-900 shadow-lg transform shadow-xl',
      )}
    >
      <div className="max-w-6xl mx-auto p-4 flex items-center space-x-4">
        <h1 className="text-white w-20">
          <Link to="/">
            <img
              src="/logo.webp"
              width={80}
              height={60}
              alt={t('common.logoAlt')}
            />
          </Link>
        </h1>
        <div className="flex space-x-4 hidden sm:block">
          {data.collections.map((collection) => (
            <Link
              className="text-sm md:text-base text-gray-200 hover:text-white"
              to={'/collections/' + collection.slug}
              prefetch="intent"
              key={collection.id}
            >
              {collection.name}
            </Link>
          ))}
        </div>
        <div className="flex-1 md:pr-8">
          {/* <div className="relative">
            <input
              type="text"
              placeholder={t('common.search')}
              className="w-full bg-white bg-opacity-20 rounded-full py-2 px-4 pl-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-300 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div> */}
          <SearchBar></SearchBar>
          
        </div>
        <div className="">
          <button
            className="relative w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1"
            onClick={onCartIconClick}
            aria-label="Open cart tray"
          >
            <ShoppingBagIcon></ShoppingBagIcon>
            {cartQuantity ? (
              <div className="absolute rounded-full -top-2 -right-2 bg-blue-500 min-w-6 min-h-6 flex items-center justify-center text-xs p-1">
                {cartQuantity}
              </div>
            ) : (
              ''
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

