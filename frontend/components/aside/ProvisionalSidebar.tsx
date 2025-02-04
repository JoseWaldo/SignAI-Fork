
import React from 'react'
import {  MdArticle } from "react-icons/md";
import { SidebarData } from './aside.services';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './aside.module.css';

const ProvisionalSidebar = () => {
  const router = useRouter()
  return (
    <aside className='hidden w-64 md:flex flex-col gap-12 pt-12 pl-12 debug'>
        
        <div className='debug flex gap-4 items-center'>
          <button className='bg-white debug'>
            <MdArticle className='h-8 w-8 button-sidebar'/>
          </button>
          <span className='text-[var(--green-dark)] font-bold text-2xl'>SignAI</span>
        </div>

        <ul className='flex flex-col gap-6'>
          {SidebarData.map((item) => (
            <li key={item.title} onClick={() => router.push(item.link)}>
              <Link
                href={item.link}
                className={router.pathname === item.link ? 'debug Link-sidebar background-active' : 'debug Link-sidebar background text-[var(--grey-light)]'}> 
                {item.icon}
                <span className='text-sm'>
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
    </aside>
  )
}

export {ProvisionalSidebar};