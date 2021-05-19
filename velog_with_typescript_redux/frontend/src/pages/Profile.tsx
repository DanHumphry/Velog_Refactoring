import { RootState } from '@reducers/index';
import React from 'react';
import '@styles/Profile.css';
import { useSelector } from 'react-redux';
import ProfileImg from '@components/Profile/ProfileImg';
import Introduce from '@components/Profile/Introduce';
import Social from '@components/Profile/Social';
import Button from '@components/Profile/Button';

function Profile() {
  return (
    <main className="profile-main">
      <section className="section1">
        <ProfileImg />
        <Introduce />
      </section>

      <section className="section2">
        <Social />
        <Button />
      </section>
    </main>
  );
}
export default Profile;
