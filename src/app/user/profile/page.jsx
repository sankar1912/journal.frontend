import UserProfile from '@/components/personalize/UserProfile';
import { cookies } from 'next/headers'; // ✔️ Required to pass user cookies to backend

export async function generateMetadata() {
  const cookieStore = cookies(); // 🔥 Get browser cookies on the server side
  const cookieString = cookieStore.toString(); // Format: "key=value; key2=value2"

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/getmeta`, {
      cache: 'no-store',
      headers: {
        Cookie: cookieString, // 🔥 Manually forward cookies to backend
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch metadata');
    }

    const metaData = await response.json();

    return {
      title: metaData.title,
      description: metaData.description,
      openGraph: {
        title: metaData.title,
        description: metaData.description,
        url: metaData.url,
        images: [
          {
            url: metaData.image,
            width: 800,
            height: 600,
            alt: metaData.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: metaData.title,
        description: metaData.description,
        images: [metaData.image],
      },
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      title: 'User Profile',
      description: 'User profile not found or failed to fetch metadata.',
    };
  }
}

export default function Page() {
  return (
    <>
      <UserProfile />
    </>
  );
}
