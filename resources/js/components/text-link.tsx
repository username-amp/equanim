import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof Link>;

export default function TextLink({ className = '', children, ...props }: LinkProps) {
    return (
        <Link
            className={cn(
                'text-primary hover:text-primary/80 decoration-muted/30 font-bold underline underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
