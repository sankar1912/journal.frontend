import ManageSubmissions from '@/components/journals/ManageSubmissions';
import React from 'react';

async function page({params}) {
  const {id}= await params
  return <ManageSubmissions id={id}/>
}

export default page;
