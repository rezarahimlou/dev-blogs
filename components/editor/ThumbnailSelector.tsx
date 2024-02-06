import classNames from 'classnames';
import { ChangeEventHandler, FC, useEffect, useState } from 'react';

interface Props {
    initialValue?: string;
    onChange(fiel: File): void;
}

const commonClass = 'border border-dashed border-secondary-dark flex items-center justify-center rounded cursor-pointer aspect-video'

const ThumbnailSelector: FC<Props> = ({initialValue, onChange}): JSX.Element => {
    const [selectedThumbnail, setSelectedThumbnail] = useState("")

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { files } }) => {
        if (!files) {
            return
        }
        const file = files[0]
        setSelectedThumbnail(URL.createObjectURL(file));
        onChange(file);
    }

    useEffect(() => {
        if(initialValue && typeof initialValue === "string" ){
            setSelectedThumbnail(initialValue)
        }

    }, [initialValue])

    return (
        <div className='w-32'>
            <input type="file" hidden accept='image/jpg, image/png, image/jpeg' id='thumbnail' onChange={handleChange} />
            <label htmlFor="thumbnail">
                {selectedThumbnail ? <img className={classNames(commonClass, "object-cover")} src={selectedThumbnail} alt="" /> : <PosterUI label='Thumbnail' />}
            </label>
        </div>
    );
};

const PosterUI: FC<{ label: string; className?: string; }> = ({ label, className }) => {
    return (
        <div className={classNames(commonClass, className)}>
            <span>{label}</span>
        </div>
    )
}
export default ThumbnailSelector;