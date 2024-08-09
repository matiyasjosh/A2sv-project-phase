import React from 'react'
import Link from 'next/link'
import { Margarine, Indie_Flower } from 'next/font/google'
import { getSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const margarine = Margarine({
  weight: ['400'],
  subsets:['latin'],
});

const indie = Indie_Flower({
  weight: ['400'],
  subsets: ['latin'],
});

const AppBar = async () => {
  const session = await getSession();
  console.log(session);

  return (
    <div className='flex justify-between mb-3'>
      <Link href={"/"} className={`${margarine.className} text-4xl ml-10 my-4`}>JobAle</Link>

      <div className='mt-4 mr-5'>
        { !session ? (
            <>
              <Link href={"/auth/login"} className={`${indie.className} text-xl bg-gray-300 mr-2  px-5 py-2  rounded-xl hover:bg-indigo-900 hover:text-white`}>Sign in</Link>
              <Link href={"/auth/signUp"} className={`${indie.className} text-xl text-white bg-indigo-800  px-5 py-2 rounded-xl hover:text-black hover:bg-gray-300`}>Sign up</Link>
            </>
        ) : (
          <Link href={"/"} className={`${indie.className} text-xl text-white bg-indigo-900 mr-5 px-5 py-2 m-3 rounded-xl`} onClick={() => signOut}>Sign out</Link>
        )
        }
      </div>
    </div>
  )
}

export default AppBar