import Verification from '@/components/verification';
async function  page({params}) {
  const {token} = await params;
  return (
    <Verification token={token}  />
    );
}

export default page;
