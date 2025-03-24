// Banner.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './banner.module.css';
import Image from 'next/image';
import {useSession} from 'next-auth/react';

const Banner = () => {
  const router = useRouter();
  const {data: session} = useSession();
  // if(session)console.log(session?.user.token);
  
  const bannerImages = [
    '/img/cover.jpg',
    '/img/cover2.jpg',
    '/img/cover3.jpg',
    '/img/cover4.jpg'
  ];
  
  // ใช้ useState เพื่อเก็บ index ของรูปภาพปัจจุบัน
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // ฟังก์ชันสำหรับเปลี่ยนรูปภาพเมื่อคลิก
  const handleImageClick = () => {
    // เปลี่ยนเป็นรูปถัดไป และวนกลับมาที่รูปแรกเมื่อถึงรูปสุดท้าย
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };
  
  // ฟังก์ชันสำหรับนำทางไปยังหน้า venue เมื่อคลิกปุ่ม
  const handleSelectCompanyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push('/company');
  };

  return (
    <div className={styles.banner}
    onClick={handleImageClick}
    >
      {/* ใช้ Image component ของ Next.js และเพิ่ม onClick event */}
      <div  style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image 
          src={bannerImages[currentImageIndex]}
          alt="Company Banner" 
          className={styles.bannerImage}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      <div className={styles.overlay}>
        <h1 className={styles.title}>where every career finds its path</h1>
        <p className={styles.subtitle}>
          ค้นพบโอกาสทางอาชีพที่เหมาะสมกับคุณในงาน Job Fair ของเรา
          พบกับบริษัทชั้นนำ ตำแหน่งงานที่น่าสนใจ และโอกาสในการพัฒนาความก้าวหน้าในสายอาชีพ
          เริ่มต้นเส้นทางความสำเร็จของคุณที่นี่
        </p>
      </div>
      {
        session ?
        <div className='z-30 absolute top-5 right-10 font-semibold text-white text-xl'>
          <p>Welcome back, {session.user?.name}</p>
        </div> : null
      }
      
      {/* ปุ่ม Select Venue ที่มุมขวาล่าง */}
      <button 
        onClick={handleSelectCompanyClick}
        className={styles.selectCompanyButton || "absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-300"}
      >
        Explore Company
      </button>
    </div>
  );
};

export default Banner;
