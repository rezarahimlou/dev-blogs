import InfiniteScrollPosts from '@/components/common/InfiniteScrollPosts';
import PostCard from '@/components/common/PostCard';
import AdminLayout from '@/components/layout/AdminLayout';
import { formatPosts, readPostsFromDb } from '@/lib/utils';
import { PostDetail } from '@/utils/types';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

let pageNo = 0;
const limit = 9

const Posts: NextPage<Props> = ({ posts }) => {
    const [postsToRender, setPostsToRender] = useState(posts);
    const [hasMorePosts, setHasMorePosts] = useState(true);

    const fetchMorePosts = async () => {
        console.log(";llllllllllllllllllllllllllllllllllllll")
        try {
            pageNo++
            const { data } = await axios(`/api/posts?limit=${limit}&pageNo=${pageNo}`);
            console.log(data);
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
        <AdminLayout>
            <InfiniteScrollPosts
                hasMore={hasMorePosts}
                next={fetchMorePosts}
                dataLength={postsToRender.length}
                posts={postsToRender}
                showControls />
        </AdminLayout>
    );
};

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

export default Posts;