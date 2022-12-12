import React from 'react';

import { UpdateProfileCard } from '../components/UpdateProfileCard';
import { UserCard } from '../components/UserCard';

const ProfileInfo = ({ color }: { color: string }) => {
  return (
    <>
      <UserCard color={color} />
      <UpdateProfileCard color={color} />
    </>
  );
};

export { ProfileInfo };
