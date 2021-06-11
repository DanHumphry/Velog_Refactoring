import SettingLeftSection from '@components/Write/SettingLeftSection';
import React from 'react';
import SettingRightSection from '@components/Write/SettingRightSection';

interface Props {
  visibility: { textSection: { visibility: string }; settingSection: { visibility: string } };
  setVisibility: React.Dispatch<
    React.SetStateAction<{ textSection: { visibility: string }; settingSection: { visibility: string } }>
  >;
  inp: { title: string; content: string };
  tag: string[];
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
}

const Setting: React.VFC<Props> = ({ visibility, setVisibility, inp, tag, setTag }) => {
  return (
    <div className="thumbnail_container" style={visibility.settingSection as React.CSSProperties}>
      <div className="thumbnail_section">
        <SettingLeftSection inp={inp} />
        <div className="line_section" />
        <SettingRightSection setVisibility={setVisibility} tag={tag} setTag={setTag} />
      </div>
    </div>
  );
};
export default Setting;
