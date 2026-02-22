// components/BreadcrumbsNav.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Breadcrumbs, Typography, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

export default function BreadcrumbsNav() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(seg => seg);

  return (
    <Stack spacing={2} sx={{  p: 2 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" color='primary'/>
         <Typography color='primary'>Home</Typography>
        </Link>

        {segments.map((seg, idx) => {
          const href = '/' + segments.slice(0, idx + 1).join('/');
          const label = decodeURIComponent(seg).charAt(0).toUpperCase() + seg.slice(1);

          return idx === segments.length - 1 ? (
            <Typography color="primary" key={href}>
              {label}
            </Typography>
          ) : (
            <Link key={href} href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Stack>
  );
}
