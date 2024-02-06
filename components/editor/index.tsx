import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { useEditor, EditorContent, getMarkRange, Range } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ToolBar from './toolBar';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import EditLink from './link/EditLink';
import Youtube from '@tiptap/extension-youtube';
import GalleryModal, { ImageSelectionResult } from './GalleryModel';
import TiptapImage from '@tiptap/extension-image';
import axios from 'axios';
import SeoForm, { SeoResult } from './SeoForm';
import ActionButton from '../common/ActionButton';
import ThumbnailSelector from './ThumbnailSelector';

export interface FinalPost extends SeoResult {
    id?: string;
    title: string;
    content: string;
    thumbnail?: File | string;
}

interface Props {
    onSubmit(post: FinalPost): void;
    initialValue?: FinalPost;
    btnTitle?: string;
    busy?: boolean;
}

const Editor: FC<Props> = ({ onSubmit, btnTitle = 'Submit', busy= false, initialValue }): JSX.Element => {
    const [selectionrange, setSelectionRange] = useState<Range>();
    const [showGallery, setShowGallery] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);
    const [images, setImages] = useState<{ src: string }[]>([]);
    const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();
    const [post, setPost] = useState<FinalPost>({
        title: '',
        content: '',
        meta: '',
        tags: '',
        slug: ''
    })

    const fetchImages = async () => {
        const { data } = await axios('/api/image');
        setImages(data.images)
    }
    const handleImageUpload = async (image: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', image);
        const { data } = await axios.post('/api/image', formData);
        setUploading(false);

        setImages([data, ...images])
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Placeholder.configure({
                placeholder: "Type somthing"
            }),
            Youtube.configure({
                width: 840,
                height: 472.5,
                HTMLAttributes: {
                    class: 'mx-auto rounded'
                }
            }),
            TiptapImage.configure({
                HTMLAttributes: {
                    class: 'mx-auto'
                }
            }),
            Link.configure({
                autolink: false,
                linkOnPaste: false,
                openOnClick: false,
                HTMLAttributes: {
                    target: ''
                }
            })],
        editorProps: {
            handleClick(view, pos, event) {
                const { state } = view;
                const selectionRange = getMarkRange(state.doc.resolve(pos), state.schema.marks.link);
                if (selectionRange) {
                    setSelectionRange(selectionRange);
                }

            },
            attributes: {
                class: 'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full'
            }
        }
    });

    useEffect(() => {
        if (editor && selectionrange) {
            editor.commands.setTextSelection(selectionrange);
        }
    }, [editor, selectionrange]);

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        if(initialValue){
            setPost({...initialValue});
            editor?.commands.setContent(initialValue.content);

            const { meta, slug, tags } = initialValue;
            setSeoInitialValue({ meta, slug, tags });
        }
    }, [initialValue, editor]);

    const handleImageSelection = (result: ImageSelectionResult) => {
        editor?.chain().focus().setImage({ src: result.src, alt: result.altText }).run();

    }

    const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        setPost({ ...post, title: target.value })
    }

    const updateSeoValue = (result: SeoResult) => {
        setPost({ ...post, ...result })
    }

    const updateThumbnail = (file: File) => {
        setPost({ ...post, thumbnail: file })
    }

    const handleSubmit = () => {
        if (!editor) return;
        onSubmit({ ...post, content: editor.getHTML() });
    }

    return (
        <>
            <div className='p-3 dark:bg-primary-dark bg-primary transition'>

                <div className='sticky top-0 z-10 dark:bg-primary-dark bg-primary'>
                    <div className='flex items-center justify-between mb-3'>
                        <ThumbnailSelector initialValue={post.thumbnail as string} onChange={updateThumbnail} />
                        <div className='inline-block'>
                            <ActionButton busy={busy} title={btnTitle} onClick={handleSubmit} />
                        </div>

                    </div>

                    <input
                        type="text"
                        className='py-2 outline-none bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl italic text-primary-dark dark:text-primary mb-3'
                        name=""
                        id=""
                        placeholder='Title'
                        onChange={updateTitle}
                        value={post.title} />
                    <ToolBar editor={editor} onOpenImageClick={() => setShowGallery(true)} />
                    <div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3' />
                </div>


                {editor && <EditLink editor={editor} />}
                <EditorContent editor={editor} className='min-h-[300px]' />
                <div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3' />
                <SeoForm
                    title={post.title}
                    onChange={updateSeoValue}
                    initialValue={seoInitialValue} />
            </div>
            <GalleryModal
                visible={showGallery}
                onClose={() => setShowGallery(false)}
                onSelect={handleImageSelection}
                images={images}
                onFileSelect={handleImageUpload}
                uploading={uploading} />
        </>


    );
};

export default Editor;