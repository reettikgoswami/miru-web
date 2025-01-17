/* eslint-disable no-unused-vars */

import React from "react";

import { useParams } from "react-router-dom";

import withLayout from "common/Mobile/HOC/withLayout";

import { TeamUrl } from "./TeamUrl";
import { UserInformation } from "./UserInformation";

const getTeamUrls = memberId => [
  {
    url: `/team/${memberId}/details`,
    text: "PERSONAL DETAILS",
  },
];

const MobileNav = () => {
  const { memberId } = useParams();
  const urlList = getTeamUrls(memberId);

  const mobileView = () => (
    <div>
      <UserInformation />
      <TeamUrl urlList={urlList} />
    </div>
  );

  const DisplayView = withLayout(mobileView, true, true);

  return <DisplayView />;
};

export default MobileNav;
