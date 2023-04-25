import React from 'react'
import { useRouter } from 'next/router'

export const Collections = () => {
  const router = useRouter();
  const { collectionId } = router.query;
  console.log(router.query)
  console.log(collectionId)
  return (
    <div>{collectionId}</div>
  )
}
