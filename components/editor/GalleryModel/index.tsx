import ModalContainer, { ModalProps } from '@/components/common/ModalContainer';
import { ChangeEventHandler, FC, ReactNode, useCallback, useState } from 'react';
import Gallery from './Gallery';
import Image from 'next/image';
import ActionButton from '@/components/common/ActionButton';
import { AiOutlineCloudUpload } from 'react-icons/ai';

export interface ImageSelectionResult {
    src: string;
    altText: string;
}

interface Props extends ModalProps {
    onFileSelect: (image: File) => void;
    onSelect(result: ImageSelectionResult): void;
    images: { src: string }[];
    uploading?: boolean;
}

const GalleryModal: FC<Props> = ({ visible, images, uploading, onClose, onFileSelect, onSelect }): JSX.Element => {
    const [selectedImage, setSelectedImage] = useState('');
    const [altText, setAltText] = useState('');

    const handleClose = useCallback(() => onClose && onClose(), [onClose]);

    const handleOnImagechange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { files } = target
        if (!files) {
            return;
        }

        const file = files[0];
        if (!file.type.startsWith('image')) {
            return handleClose();
        }

        onFileSelect(file);
    }
    const handleSelection = () => {
        if (!selectedImage) return handleClose();
        onSelect({ src: selectedImage, altText });
        handleClose();
    }
    return (
        <ModalContainer visible={visible} onClose={onClose}>
            <div className='max-w-4xl p-2 bg-primary-dark dark:bg-primary rounded-md'>
                <div className='flex'>
                    <div className='basis-[75%] max-h-[450px] overflow-y-auto custom-scroll-bar'>
                        <Gallery
                            onSelect={(src) => setSelectedImage(src)}
                            images={images}
                            selectedImage={selectedImage}
                            uploading={uploading} />
                    </div>

                    <div className='basis-1/4 px-2'>
                        <div className='space-y-4'>
                            {selectedImage && (<>

                                <div>
                                    <input onChange={handleOnImagechange} hidden type="file" name="" id="image-input" />
                                    <label htmlFor="image-input">
                                        <div className='w-full border-2 border-action text-action flex items-center justify-center space-x-2 p-2 cursor-pointer rounded hover:scale-95 transition'>
                                            <AiOutlineCloudUpload />
                                            <span>Upload Image</span>
                                        </div>
                                    </label>
                                </div>
                                <textarea
                                    className='resize-none w-full bg-transparent rounded border-2 border-secondary-dark focus:ring-1 text-primary dark:text-primary-dark h-32 p-1'
                                    value={altText}
                                    onChange={({ target }) => setAltText(target.value)}
                                    name=""
                                    id=""
                                    cols={30}
                                    rows={10}
                                    placeholder='Alt text'></textarea>

                                <ActionButton onClick={handleSelection} title='Select' />

                                <div className='relative aspect-video bg-png-pattern'>
                                    <Image src={selectedImage} objectFit='contain' layout='fill' alt='' />
                                </div>
                            </>)}
                        </div>


                    </div>
                </div>
            </div>
        </ModalContainer>
    );
};

export default GalleryModal;