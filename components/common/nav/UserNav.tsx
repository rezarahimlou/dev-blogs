import Link from 'next/link';
import { FC } from 'react';
import Logo from '../Logo';
import { APP_NAME } from '../AppHead';
import { HiLightBulb } from "react-icons/hi";
import { GithubAuthButton } from '@/components/button';
import ProfileHead from '../ProfileHead';
import DropdownOptions, { dropdownOptions } from '../DropdownOptions';
interface Props { }

const UserNav: FC<Props> = (props): JSX.Element => {
  const dropdownOptions: dropdownOptions = [
    { label: "Dashboard", onClick() { } },
    { label: "Logout", onClick() { } },
  ]
  return (
    <div className='flex items-center justify-between bg-primary-dark p-3'>
      <Link href={"/"} className='flex space-x-2 text-highlight-dark'>
        <Logo className='fill-highlight-dark' />
        <span className='text-xl font-semibold'>{APP_NAME}</span>
      </Link>

      <div className='flex items-center space-x-5'>
        <button className='dark:text-secondary-dark text-secondary-light'>
          <HiLightBulb size={34} />
        </button>

        {/* <GithubAuthButton lightOnly/> */}

        <DropdownOptions head={<ProfileHead lightOnly nameInitial='N' />} options={dropdownOptions} />
      </div>
    </div>
  );
};

export default UserNav;