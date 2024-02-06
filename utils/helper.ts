import { FinalPost } from "@/components/editor";

export const generateFormData = (post: FinalPost) => {
    const formData = new FormData();
      for (let key in post) {
        const value = ((post as any)[key] as string);
        if (key === "tags" && value.trim()) {
          const tags = (value as string).split(',').map((tag: string) => tag.trim());
          formData.append(key, JSON.stringify(tags));
        } else {
          formData.append(key, value)
        }
    }
    return formData;
} 