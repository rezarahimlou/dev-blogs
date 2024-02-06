import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import slugify from 'slugify';

export interface SeoResult {
    meta: string;
    slug: string;
    tags: string;
}

interface Props {
    title?: string;
    onChange: (result: SeoResult) => void;
    initialValue?: SeoResult;
}

const commonInput = "w-full bg-transparent outline-none border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary rounded transition p-2 text-primary-dark dark:text-primary"

const SeoForm: FC<Props> = ({ title = '', onChange, initialValue }): JSX.Element => {

    const [values, setValues] = useState({ meta: '', slug: '', tags: '' });

    const { meta, slug, tags } = values;

    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target: { name, value } }) => {
        if (name === "meta") {
            value = value.substring(0, 150);
        }
        const newValues = { ...values, [name]: value }
        setValues(newValues);
        onChange(newValues);
    }

    useEffect(() => {
        const slug = slugify(title.toLocaleLowerCase())
        const newValues = { ...values, slug };
        setValues(newValues);
        onChange(newValues);
    }, [title]);

    useEffect(() => {
        if (initialValue) {
            setValues({ ...initialValue, slug: slugify(initialValue.slug) })
        }
    }, [initialValue]);

    return (
        <div className='space-y-4'>
            <h1 className='text-primary-dark dark:text-primary text-xl font-semibold'>
                SEO Section
            </h1>
            <Input value={slug} name='slug' placeholder='slug-goes-ehere' label='Slug:' onChange={handleChange} />
            <Input value={tags} name='tags' placeholder='React, Next JS' label='Tags:' onChange={handleChange} />
            <div className='relative'>
                <textarea value={meta} className={classNames(commonInput, 'text-lg h-20 resize-none')} placeholder='Meta Description' onChange={handleChange} name={"meta"} id=""></textarea>
                <p className='absolute bottom-3 right-3 text-primary-dark dark:text-primary text-sm'>{meta.length}/150</p>
            </div>



        </div>);
};


const Input: FC<{
    name?: string;
    label?: string;
    value?: string;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ name, label, onChange, value, placeholder }) => {

    return (
        <label className='block relative'>
            <span className='absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary pl-2'>{label}</span>

            <input type="text" placeholder={placeholder} value={value} onChange={onChange} className={classNames(commonInput, 'italic pl-10')} name={name} />
        </label>
    )
}
export default SeoForm;