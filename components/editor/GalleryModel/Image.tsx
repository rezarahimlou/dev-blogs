import { FC } from 'react';
import NextImage from 'next/image'
import CheckMark from '@/components/common/CheckMark';

interface Props {
    src: string;
    selected?: boolean;
    onClick?(): void;
}

const Image: FC<Props> = ({ src, onClick, selected }): JSX.Element => {
    return (
        <div onClick={onClick} className='relative rounded overflow-hidden cursor-pointer'>
            <NextImage
                src={src}
                width={200}
                height={200}
                alt='gallery'
                objectFit='cover'
                className='bg-secondary-light hover:scale-110 transition' />
            <div className='absolute top-2 left-2'>
                <CheckMark visible={selected || false}/>
            </div>
        </div>

    );
};

export default Image;