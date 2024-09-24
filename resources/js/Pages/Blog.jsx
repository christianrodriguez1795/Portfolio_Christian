import React from 'react';
import { Head } from '@inertiajs/react';
import { Typography, Button, Card, CardContent } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Blog = ({ auth }) => {
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="text-black dark:text-white font-semibold text-xl leading-tight ">Blog</h2>}>
      <Head title="Blog" />
      <Card className='dark:bg-[#272727]'>
        <CardContent>
          <Button variant="contained" sx={{ mt: 2 }}>Add New Post</Button>
        </CardContent>
      </Card>
    </AuthenticatedLayout>
  );
};

export default Blog;
