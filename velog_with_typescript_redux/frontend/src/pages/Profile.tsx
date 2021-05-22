import React from 'react';
import '@styles/Profile.css';
import ProfileImg from '@components/Profile/ProfileImg';
import Introduce from '@components/Profile/Introduce';
import Social from '@components/Profile/Social';
import Button from '@components/Profile/Button';
import Nickname from '@components/Profile/Nickname';

function Profile() {
  return (
    <main className="profile-main">
      <section className="section1">
        <ProfileImg />
        <Introduce />
      </section>

      <section className="section2">
        <Nickname />
        <Social />
        <Button />
      </section>
    </main>
  );
}
export default Profile;
