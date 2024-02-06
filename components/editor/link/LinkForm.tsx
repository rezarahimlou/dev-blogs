import { FC, useEffect, useState } from 'react';
import { validateUrl } from '../EditorUtils';

interface Props {
    visible: boolean;
    onSubmit: (link: LinkOption) => void;
    initialState?: LinkOption;
}

export type LinkOption = {
    url: string
    openInNewTab: boolean;

}
const defaultLink = { url: "", openInNewTab: false };

const LinkForm: FC<Props> = ({ visible, onSubmit, initialState }): JSX.Element => {
    const [link, setLink] = useState<LinkOption>(defaultLink);

    const handleSubmit = () => {
        if (!link.url.trim()) {
            return;
        }
        onSubmit({ ...link, url: validateUrl(link.url) });
        resetForm();
    }

    const resetForm = () => {
        setLink({ ...defaultLink });
    }

    useEffect(() => {
        if (initialState) {
            setLink({ ...initialState })
        }
    }, [initialState])

    if (!visible) return <></>;

    return (
        <div className='rounded p-2'>
            <input
                autoFocus
                type="text"
                className='bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2 text-primary-dark dark:text-primary'
                placeholder='https://example.com'
                value={link.url}
                onChange={({ target }) => setLink({ ...link, url: target.value })} />

            <div className='flex items-center space-x-2 mt-2 bg-primary dark:bg-primary-dark shadow-sm shadow-secondary-dark'>
                <input
                    type="checkbox"
                    name=""
                    id="open-in-new-tab"
                    checked={link.openInNewTab}
                    onChange={({ target }) => setLink({ ...link, openInNewTab: target.checked })} />
                <label htmlFor="open-in-new-tab">open in new tab</label>

                <div className='flex-1 text-right'>
                    <button onClick={handleSubmit} className='bg-action p-2 py-1 text-primary rounded text-sm'>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LinkForm;