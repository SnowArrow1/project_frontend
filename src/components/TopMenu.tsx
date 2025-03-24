import Image from 'next/image';
import { getServerSession } from 'next-auth';
import {authOptions} from '../app/api/auth/[...nextauth]/authOptions';
import TopMenuItem from './TopMenuItem';
import {Link} from '@mui/material';

export default async function TopMenu() {

  const session = await getServerSession(authOptions);

  console.log("Session exists:", !!session);
  console.log("Session data:", session);

  return (
    <nav className="bg-white shadow-lg">
        <div className="flex items-center h-16 max-w-7xl mx-5">
        <div className="flex absolute left-0 justify-end items-center mx-10">
          <Link href='/'>
            <Image
            
              src="/img/logo.png" alt="Logo"
              width={48} height={48}
              className="h-12 w-auto"
              
            />
          </Link>
          <TopMenuItem title="Home Page" pageRef='/'/>
          </div>
          { 
            session? 
            <div className='flex absolute right-0 items-center px-5 text-base mx-5'>
              <TopMenuItem title="Company List" pageRef='/company'/>
              <TopMenuItem title="My Interview" pageRef='/myinterview'/>
              <TopMenuItem title="Appoint Interview" pageRef='/interview'/>
              <TopMenuItem title={`Sign-Out of ${session.user?.name}`} pageRef='/api/auth/signout'/>
            </div>
            :
              <div className='flex absolute right-0 items-center px-5 text-base mx-5'>
                <TopMenuItem title="Company List" pageRef='/company'/>
                <TopMenuItem title="Sign-In" pageRef='/login'/>
              </div>
          }
        </div>
    </nav>
  );
};