import { RootState } from '@reducers/index';
import React, { useEffect } from 'react';
import '@styles/Profile.css';
import ProfileImg from '@components/Profile/ProfileImg';
import Introduce from '@components/Profile/Introduce';
import Social from '@components/Profile/Social';
import Button from '@components/Profile/Button';
import Nickname from '@components/Profile/Nickname';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

function Profile() {
  const history = useHistory();
  const { me } = useSelector((store: RootState) => store.user);

  useEffect(() => {
    if (Object.keys(me).length === 0) {
      alert('로그인 해주세요.');
      history.push('/');
    }
  });

  return (
    <main className="profile-main">
      <section className="section1">
        <ProfileImg me={me} />
        <Introduce me={me} />
      </section>

      <section className="section2">
        <Nickname me={me} />
        <Social me={me} />
        <Button me={me} />
      </section>
    </main>
  );
}
export default Profile;
