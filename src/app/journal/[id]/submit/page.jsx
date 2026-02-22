import SubmitContainer from '@/components/submit/SubmitContainer';
import React from 'react';

async function page({params}) {
  return (
    <SubmitContainer id={params.id} />
  );
}

export default page;
