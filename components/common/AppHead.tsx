import Head from 'next/head';
import { FC } from 'react';

interface Props {
    title?: string;
    desc?: string;

}
export const APP_NAME = "Dev Blogs"
const AppHead: FC<Props> = ({title, desc}): JSX.Element => {
  return (
    <Head>
        <title>{title ? title + " | " + APP_NAME : APP_NAME}</title>
        <meta name="description" content={desc} />
    </Head>
  );
};

export default AppHead;