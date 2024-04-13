'use client'
import React from 'react';

import qs from 'query-string'
import { useState } from 'react';
import { SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Search = () => {
    const router = useRouter();
    const [value, setValue] = useState('');

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!value) return;

        const url = qs.stringifyUrl({
            url: '/search',
            query: { term: value }
        }, { skipEmptyString: true });
        router.push(url);
    }

    function onClear() {
        setValue('');
    }

    return (
        <form className='relative w-full lg:w-[400px] flex items-center'
            onSubmit={onSubmit}
        >
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='Search'
                className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
            />
            {value && <X className='absolute top-2.5 right-12 h-5 w-5 text-muted-foreground hover:opacity-75 transistion' />}
            <Button type='submit' size='sm' variant="secondary" className='rounded-l-none'>
                <SearchIcon className='h-5 w-5 text-muted-foreground' />
            </Button>
        </form>
    )
}