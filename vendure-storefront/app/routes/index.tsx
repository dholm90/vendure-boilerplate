import { useLoaderData } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';
import { CollectionCard } from '~/components/collections/CollectionCard';
import { BeakerIcon, ShoppingBagIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { LoaderArgs } from '@remix-run/server-runtime';
import { useTranslation } from 'react-i18next';

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(request, { take: 20 });
  return {
    collections,
  };
}

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const headerImage = collections[0]?.featuredAsset?.preview || '/images/aquarium-hero.jpg';

  return (
    <>
      <div className="relative">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={headerImage + '?w=1920'}
            alt="Living Aquarium hero"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-teal-900 mix-blend-multiply" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />
        <div className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
          <div className="relative bg-blue-800 bg-opacity-0 rounded-lg p-0">
            <h1 className="text-6xl text-transparent bg-clip-text font-extrabold tracking-normal lg:text-6xl bg-gradient-to-r from-blue-300 via-teal-400 to-green-300">
              Living Aquarium
            </h1>
          </div>

          <p className="mt-4 text-2xl text-white">
            Dive into a world of aquatic wonder
          </p>
          <p className="mt-4 text-gray-300 space-x-1">
            <BeakerIcon className="w-5 h-5 inline" />
            <span>Explore our collections</span>
          </p>
        </div>
      </div>

      <section
        aria-labelledby="features-heading"
        className="pt-24 sm:pt-32 xl:max-w-7xl xl:mx-auto xl:px-8"
      >
        <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="features-heading"
            className="text-3xl font-semibold tracking-tight text-gray-900 mb-8 flex justify-center"
          >
            Why Choose Living Aquarium?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
            <div className="md:flex-shrink-0 flex justify-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                <ShoppingBagIcon className="w-8 h-8" />
              </div>
            </div>
            <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
              <h3 className="text-xl font-semibold text-gray-900">Wide Selection</h3>
              <p className="mt-3 text-sm text-gray-500">
                From tropical fish to cold-water species, we offer a diverse range of aquatic life.
              </p>
            </div>
          </div>

          <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
            <div className="md:flex-shrink-0 flex justify-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                <AcademicCapIcon className="w-8 h-8" />
              </div>
            </div>
            <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
              <h3 className="text-xl font-semibold text-gray-900">Expert Advice</h3>
              <p className="mt-3 text-sm text-gray-500">
                Our knowledgeable staff is here to help you create and maintain the perfect aquarium.
              </p>
            </div>
          </div>

          <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
            <div className="md:flex-shrink-0 flex justify-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                <BeakerIcon className="w-8 h-8" />
              </div>
            </div>
            <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
              <h3 className="text-xl font-semibold text-gray-900">Quality Supplies</h3>
              <p className="mt-3 text-sm text-gray-500">
                We offer top-notch aquarium equipment and supplies to keep your underwater world thriving.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="category-heading"
        className="pt-24 sm:pt-32 xl:max-w-7xl xl:mx-auto xl:px-8"
      >
        <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-semibold tracking-tight text-gray-900"
          >
            {t('common.shopByCategory')}
          </h2>
        </div>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
              <div className="grid justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8">
                {collections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

