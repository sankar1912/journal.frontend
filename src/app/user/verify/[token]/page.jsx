import React from 'react';
import Verification from '@/components/verification';
function page({params}) {
  return (
    <Verification token = {params.token}  />
    );
}

export default page;
