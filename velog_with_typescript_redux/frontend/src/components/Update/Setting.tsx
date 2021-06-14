import React from 'react';
import SettingLeftSection from '@components/Update/SettingLeftSection';
import SettingRightSection from '@components/Update/SettingRightSection';
import { detailPost } from '@typings/db';

interface Props {
  visibility: { textSection: { visibility: string }; settingSection: { visibility: string } };
  setVisibility: React.Dispatch<
    React.SetStateAction<{ textSection: { visibility: string }; settingSection: { visibility: string } }>
  >;
  inp: { title: string; content: string };
  imgURL: string;
  setImgURL: React.Dispatch<React.SetStateAction<string>>;
  tag: string[];
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
  detailPost: detailPost;
}

function Setting({ visibility, setVisibility, inp, imgURL, setImgURL, tag, setTag, detailPost }: Props) {
  return (
    <div className="thumbnail_container" style={visibility.settingSection as React.CSSProperties}>
      <div className="thumbnail_section">
        <SettingLeftSection inp={inp} imgURL={imgURL} setImgURL={setImgURL} />
        <div className="line_section" />
        <SettingRightSection tag={tag} setTag={setTag} setVisibility={setVisibility} detailPost={detailPost} />
      </div>
    </div>
  );
}
export default Setting;
