import classNames from 'classnames';
import { FC, useCallback } from 'react';
import { AiFillGithub } from 'react-icons/ai';

interface Props {
    lightOnly?: boolean;
    onClick?(): void;
}
const commonClasses = 'flex items-center justify-center space-x-1 px-3 py-2 rounded hover:scale-[0.97] transition duration-100';

export const GithubAuthButton: FC<Props> = ({ lightOnly = false, onClick }): JSX.Element => {
    const getStyle = useCallback(() => {
        if (lightOnly) {
            return "text-primary-dark bg-primary"
        }
        return "dark:text-primary-dark bg-primary-dark dark:bg-primary text-primary";
    }, [lightOnly])
    return (
        <button onClick={onClick} className={classNames(getStyle(), commonClasses)}>
            <span>Continue with</span>
            <AiFillGithub size={24}/>
        </button>
    );
};
