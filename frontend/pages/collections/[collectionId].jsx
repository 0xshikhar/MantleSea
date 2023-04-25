import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

const Collections = () => {
  const router = useRouter();
  const { collectionId } = router.query;
  console.log(router.query)
  console.log(collectionId)
  return (
    <div className='bg-white'>
      <Link href="/">
        {collectionId}
      </Link>
    </div>
  )
}

export default Collections