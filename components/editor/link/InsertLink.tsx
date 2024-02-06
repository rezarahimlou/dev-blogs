import Button from '@/components/common/Button';
import { FC, useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import LinkForm, { LinkOption } from './LinkForm';
import { validateUrl } from '../EditorUtils';

interface Props {
    onSubmit: (link: LinkOption) => void
}

const InsertLink: FC<Props> = ({ onSubmit }): JSX.Element => {
    const [visible, setVisible] = useState(false);
    const handleSubmit = (link: LinkOption) => {
        if (!link.url.trim()) return hideForm()
        onSubmit(link);
        hideForm();
    }

    const hideForm = () => setVisible(false);
    const showForm = () => setVisible(true);

    return (
        <div onKeyDown={({ key }) => {
            console.log(key)
            if (key === 'Escape') {
                hideForm()
            }
        }} className='relative'>
            <Button onClick={visible ? hideForm : showForm}>
                <BsLink45Deg />
            </Button>
            <div className='absolute top-full right-0 mt-4 z-50'>
                <LinkForm visible={visible} onSubmit={handleSubmit} />
            </div>
        </div>

    );
};

export default InsertLink;