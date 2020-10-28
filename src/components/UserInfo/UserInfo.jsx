import React from 'react';
// prop-types
import T from 'prop-types';
// constants
import {
  ACCOUNT_FORM_STAGE,
  PROFILE_FORM_STAGE,
  CONTACTS_FORM_STAGE,
  CAPABILITIES_FORM_STAGE,
} from 'constants.js';
// utils
import { parseDate } from 'utils';
// components
import AvatarImage from 'components/AvatarImage';
import SectionInfoList from 'components/SectionInfoList/SectionInfoList';
import SectionInfoTitle from 'components/SectionInfoTitle/SectionInfoTitle';
// css
import classes from './UserInfo.module.css';

const UserInfo = ({ user }) => {
  const {
    userName,
    avatarData,
    password,
    firstName,
    lastName,
    birthDate,
    email,
    address,
    company,
    fax,
    facebookLink,
    phones,
    skills,
    hobbies,
    id,
  } = user;

  const facebookLinkRender = (value) =>
    value ? (
      <a className={classes.link} href={value}>
        {value}
      </a>
    ) : (
      'N/A'
    );

  const phonesRender = (value) => {
    return value?.map((phone, i) => {
      if (phone?.value)
        return (
          <div className={classes.infoListItem} key={i}>
            <div className={classes.infoListItemTitle}>Phone#{i + 1}:</div>
            <div className={classes.infoListItemValue}>{phone.value}</div>
          </div>
        );
    });
  };

  const skillsRender = (value) => value?.map((item) => item.label).join(', ');

  const hobbiesRender = (value) =>
    value?.filter((item) => item).length
      ? value
          ?.filter((item) => item)
          .map((item, i) => (
            <p className={classes.hobbiesItem} key={i}>
              {item}
            </p>
          ))
      : 'N/A';

  return (
    <div className={classes.userInfo}>
      <div className={classes.avatarCont}>
        <AvatarImage avatar={avatarData} />
      </div>
      <div className={classes.infoCont}>
        <div className={classes.sectionCont}>
          <SectionInfoTitle id={id} formStage={ACCOUNT_FORM_STAGE}>
            Account
          </SectionInfoTitle>

          <SectionInfoList
            data={[
              { label: 'User name', value: userName },
              { label: 'Password', value: password },
            ]}
          />
        </div>
        <div className={classes.sectionCont}>
          <SectionInfoTitle id={id} formStage={PROFILE_FORM_STAGE}>
            Person
          </SectionInfoTitle>

          <SectionInfoList
            data={[
              { label: 'First name', value: firstName },
              { label: 'Last name', value: lastName },
              { label: 'Birth date', value: parseDate(birthDate) },
              { label: 'Email', value: email },
              { label: 'Address', value: address || 'N/A' },
            ]}
          />
        </div>
        <div className={classes.sectionCont}>
          <SectionInfoTitle id={id} formStage={CONTACTS_FORM_STAGE}>
            Contacts
          </SectionInfoTitle>

          <SectionInfoList
            data={[
              { label: 'Company', value: company },
              { label: 'Fax', value: fax || 'N/A' },
              {
                label: 'Facebook link',
                value: facebookLinkRender(facebookLink),
              },
              { label: 'Phones', render: phonesRender(phones) },
            ]}
          />
        </div>
        <div className={classes.sectionCont}>
          <SectionInfoTitle id={id} formStage={CAPABILITIES_FORM_STAGE}>
            Capabilities
          </SectionInfoTitle>

          <SectionInfoList
            data={[
              { label: 'Skills', value: skillsRender(skills) },
              { label: 'Hobbies', value: hobbiesRender(hobbies) },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  user: T.shape({
    userName: T.string,
    avatarData: T.string,
    password: T.string,
    firstName: T.string,
    lastName: T.string,
    birthDate: T.oneOfType([T.object, T.string]),
    email: T.string,
    address: T.string,
    company: T.string,
    fax: T.string,
    facebookLink: T.string,
    phones: T.arrayOf(T.string),
    skills: T.arrayOf(T.object),
    hobbies: T.array,
    id: T.number,
  }),
};

export default UserInfo;
