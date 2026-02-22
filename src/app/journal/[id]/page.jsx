import Main from '@/components/journals/Main';
import React from 'react';

export async function generateMetadata({ params }) {
  const { id } =await params;

  try {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/journal/getmeta/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch metadata');
    }
    const data = await res.json();
    if (data.success) {
      return {
        title: data.title,
        description: data.about,
      };
    } else {
      return { title: 'Journal Not Found', description: 'No metadata available.' };
    }
  } catch (error) {
    return { title: 'Error', description: 'Failed to load metadata.' };
  }
}

export default async function Page({ params }) {
  const { id } = await params;

  return (
    <div>
        <Main id ={id}/>
    </div>
  );
}
