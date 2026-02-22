import Authenticate from '@/routes/Authenticate';
import React from 'react';

function layout({children}) {
  return (
    <Authenticate>{children}</Authenticate>
  )
}

export default layout;
