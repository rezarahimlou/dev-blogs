import { NextApiRequest } from "next";
import formidable from "formidable";
import dbConnect from "./dbConnect";
import Post, { PostModelSchema } from "@/models/Post";
import { PostDetail } from "@/utils/types";

interface FormidablePromise<T> {
  files: formidable.Files;
  body: T;
}

export const readFile = <T extends object>(
  req: NextApiRequest
): Promise<FormidablePromise<T>> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
      }

      for (let key in fields) {
        (fields[key] as any) = fields[key][0];
      }

      resolve({ files, body: fields as T });
    });
  });
};

export const readPostsFromDb = async (limit: number, pageNo: number) => {
  if (!limit || limit > 10) {
    throw Error("please use limit under 10 and a valid page number");
  }
  const skip = limit * pageNo;
  await dbConnect();
  const posts = await Post.find()
    .sort({ createdAt: "desc" })
    .select("-content")
    .skip(skip)
    .limit(limit);
  return posts;
};
export const formatPosts = (posts: PostModelSchema[]): PostDetail[] => {
  return posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    createdAt: post.createdAt.toString(),
    thumbnail: post.thumbnail?.url || "",
    meta: post.meta,
    tags: post.tags,
  }));
};
