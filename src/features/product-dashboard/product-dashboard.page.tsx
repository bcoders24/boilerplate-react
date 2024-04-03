import { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '@/components/common/seo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleTabChange = (value: string) => {
    setSearchParams({ query: value });
  };
  return (
    <Fragment>
      <SEO title="Product Dashboard" description="" name="" type="webapp" />
      <div>
        Product Dashboard
        <Tabs
          defaultValue="account"
          value={searchParams.get('query') || 'account'}
          onValueChange={handleTabChange}
          className="w-[400px]"
        >
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </Fragment>
  );
};

export default ProductDashboard;
