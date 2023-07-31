"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Russo_One, Norican } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const russo_one = Russo_One({
  subsets: ["latin"],
  weight: '400'
});

const norican = Norican({
  subsets: ["latin"],
  weight: '400'
})

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className='flex justify-center min-h-screen back-home'>
        <div className='flex flex-col w-full'>
          <div className={`mt-32 text-white text-center text-6xl ${russo_one.className}`}>
            Choose your tools
          </div>
          <div className='flex flex-row gap-5 flex-wrap justify-around mt-0 sm:mt-16 md:mt-24'>
            {/* Ouss */}
            <div className='flex flex-col'>
              <div className='w-[300px] tool-item'>
                <div className={`text-white flex flex-row text-center justify-center items-end text-4xl min-h-[120px] ${norican.className}`}>
                  Resume cook
                </div>
                <Link href={'/ouss'}>
                  <Image src={'/img/man-ouss.png'} alt='ouss' width={300} height={300} />
                </Link>
                <div className='font-alkatra text-5xl text-center text-white mt-[-20px] z-10 relative'>
                  Smart Ouss
                </div>
              </div>
            </div>

            {/* Yomo */}
            <div className='flex flex-col'>
              <div className='w-[300px] tool-item'>
                <div className={`text-white flex flex-row text-center justify-center items-end text-4xl min-h-[120px] ${norican.className}`}>
                  <span>Ask your question to people you dream to speak</span>
                </div>
                <Link href={'/yomi'}>
                  <Image src={'/img/man-yomi.png'} alt='ouss' width={300} height={300} />
                </Link>
                <div className='font-alkatra text-5xl text-center text-white mt-[-20px] z-10 relative'>
                  Smart yomi
                </div>
              </div>
            </div>

            {/* Antoine */}
            <div className='flex flex-col'>
              <div className='w-[300px] tool-item'>
                <div className={`text-white flex flex-row text-center justify-center items-end text-4xl min-h-[120px] ${norican.className}`}>
                  Learn a new concept every day
                </div>
                <Link href={'/antoine'}>
                  <Image src={'/img/man-antoine.png'} alt='ouss' width={300} height={300} />
                </Link>
                <div className='font-alkatra text-5xl text-center text-white mt-[-20px] z-20 relative'>
                  Smart antoine
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
