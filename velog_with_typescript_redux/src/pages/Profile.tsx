import { RootState } from '@reducers/index';
import React from 'react';
import '@styles/Profile.css';
import { useSelector } from 'react-redux';
import ProfileImg from '@components/Profile/ProfileImg';
import Introduce from '@components/Profile/Introduce';
import Nickname from '@components/Profile/Nickname';
import Social from '@components/Profile/Social';
import Button from '@components/Profile/Button';

function Profile() {
  const { me } = useSelector((store: RootState) => store.user);

  return (
    <main className="profile-main">
      <section className="section1">
        <ProfileImg me={me} />
        <Introduce me={me} />
      </section>

      <section className="section2">
        <Nickname me={me} />
        <Social me={me} />
        <Button />
      </section>
    </main>
  );
}
export default Profile;
