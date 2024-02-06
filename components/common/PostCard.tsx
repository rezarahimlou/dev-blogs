import { PostDetail } from '@/utils/types';
import Image from 'next/image';
import { FC } from 'react';
import dateformat from 'dateformat'
import Link from 'next/link';

interface Props {
  post: PostDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?(): void;
}
const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) {
    return text;
  }
  return text.substring(0, trimBy).trim() + '...';
}

const PostCard: FC<Props> = ({ post: { title, slug, meta, tags, thumbnail, createdAt }, busy, controls = false, onDeleteClick }): JSX.Element => {
  return (
    <div className='rounded shadow-sm shadow-secondary-dark overflow-hidden bg-primary dark:bg-primary-dark flex flex-col h-full transition'>
      <div className='aspect-video relative'>
        {thumbnail ? <Image src={thumbnail} fill alt='Thumbnail' /> : <div className='w-full h-full flex items-center justify-center text-secondary-dark opacity-50 font-semibold'></div>}
      </div>

      <div className='p-2 flex-1 flex flex-col'>
        <Link href={`/${slug}`}>
          <div className='flex items-center justify-between text-sm text-primary-dark dark:text-primary'>
            <div className='flex items-center space-x-1'>
              {tags.map((t, index) => <span key={t + index}>#{t}</span>)}
            </div>
            <span>{dateformat(createdAt, 'd-mmm-yyyy')}</span>

          </div>
          <h1 className='font-semibold text-primary-dark dark:text-primary'>{trimText(title, 50)}</h1>
          <p className='text-secondary-dark'>{trimText(meta, 70)}</p>
        </Link>
        {controls && <div className='flex justify-end items-center h-8 mt-auto space-x-4 text-primary-dark dark:text-primary'>
          {busy ?
            <span className='animate-pulse'>Removing</span> :
            (<>
              <Link href={`/admin/posts/update/${slug}`} className='hover:underline transition'>Edit</Link>
              <button onClick={onDeleteClick} className='hover:underline transition'>Delete</button></>
            )}

        </div>}
      </div>
    </div>
  );
};

export default PostCard;