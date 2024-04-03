import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/common/seo';

const PageNotFound = () => {
  return (
    <Fragment>
      <SEO title="404 - Not found" description="" name="" type="webapp" />
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h3 className="text-2xl font-bold mb-2">Oops! Why are you here?</h3>
          <p className="text-lg mb-4">
            We are very sorry for the inconvenience. It looks like you&apos;re trying to access a page that either has
            been deleted or never existed.
          </p>
          <Link to="/" replace className="inline-block">
            <button className="bg-primary text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
              Back To Home
            </button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default PageNotFound;
