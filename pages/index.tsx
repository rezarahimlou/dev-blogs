import Image from 'next/image'
import { Inter } from 'next/font/google'
import DefaultLayout from '@/components/layout/DefaultLayout'
import { PostDetail } from '@/utils/types'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { formatPosts, readPostsFromDb } from '@/lib/utils'
import InfiniteScrollPosts from '@/components/common/InfiniteScrollPosts'
import { useState } from 'react'
import axios from 'axios'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
let pageNo = 0;
const limit = 9

const Home: NextPage<Props> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const isAdmin = false;

  const fetchMorePosts = async () => {
    try {
      pageNo++
      const { data } = await axios(`/api/posts?limit=${limit}&pageNo=${pageNo}`);
      setPostsToRender([...postsToRender, ...data.posts]);
      if (data.posts.length < limit) {
        setHasMorePosts(false);
      }
    } catch (error) {
      setHasMorePosts(false);
      console.log(error)
    }

  }

  return (
    <DefaultLayout>
      <div className="pb-20">
        <InfiniteScrollPosts
          hasMore={hasMorePosts}
          next={fetchMorePosts}
          dataLength={postsToRender.length}
          posts={postsToRender}
          showControls={isAdmin} />
      </div>

    </DefaultLayout>
  )
}

interface ServerSideResponse {
  posts: PostDetail[];
}

export const getServerSideProps: GetServerSideProps<ServerSideResponse> = async (context) => {
  try {
    const posts = await readPostsFromDb(limit, pageNo);

    const formattedPosts = formatPosts(posts);
    return {
      props: { posts: formattedPosts }
    }
  } catch (error) {
    return { notFound: true }
  }
}

export default Home;