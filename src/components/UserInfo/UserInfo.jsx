import React from 'react'
// css
import classes from './UserInfo.module.css'

const UserInfo = ({ user }) => {
  const {
    userName,
    password,
    firstName,
    lastName,
    birthDate,
    email,
    Address,
    company,
    fax,
    facebookLink,
    phone,
    skills
  } = user
  console.log(user)
  return (
    <div className={classes.userInfo}>
      <div className={classes.avatarCont}>Avatar</div>
      <div className={classes.infoCont}>
        <div className={classes.sectionCont}>
          <div className={classes.sectionTitle}>Account</div>
          <div className={classes.infoList}>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>User name:</div>
              <div className={classes.infoListItemValue}>{userName}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Password:</div>
              <div className={classes.infoListItemValue}>{password}</div>
            </div>
          </div>
        </div>
        <div className={classes.sectionCont}>
          <div className={classes.sectionTitle}>Person</div>
          <div className={classes.infoList}>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>First name:</div>
              <div className={classes.infoListItemValue}>{firstName}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Last name:</div>
              <div className={classes.infoListItemValue}>{lastName}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Birth date:</div>
              <div className={classes.infoListItemValue}>{birthDate}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Email:</div>
              <div className={classes.infoListItemValue}>{email}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Address:</div>
              <div className={classes.infoListItemValue}>{Address}</div>
            </div>
          </div>
        </div>
        <div className={classes.sectionCont}>
          <div className={classes.sectionTitle}>Contacts</div>
          <div className={classes.infoList}>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Company:</div>
              <div className={classes.infoListItemValue}>{company}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Fax:</div>
              <div className={classes.infoListItemValue}>{fax}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Facebook link:</div>
              <div className={classes.infoListItemValue}>{facebookLink}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Phone#1:</div>
              <div className={classes.infoListItemValue}>{phone}</div>
            </div>
          </div>
        </div>
        <div className={classes.sectionCont}>
          <div className={classes.sectionTitle}>Capabilities</div>
          <div className={classes.infoList}>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Skills:</div>
              <div className={classes.infoListItemValue}>
                {skills?.map((item) => item.label).join(', ')}
              </div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Hobbies:</div>
              <div className={classes.infoListItemValue}>Hobbies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
