import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LoadingButton = ({
  children,
  isLoading,
  onClick,
}: {
  children: string;
  isLoading?: boolean;
  onClick?: (event: React.FormEvent) => Promise<void>;
}) => {
  return (
    <Button disabled={isLoading} onClick={onClick}>
      {children}
      <span
        className={cn({
          'ml-2 w-5 h-5 border-2 border-white border-transparent border-b-white rounded-full inline-block animate-spin':
            isLoading,
        })}
      />
    </Button>
  );
};

export default LoadingButton;
