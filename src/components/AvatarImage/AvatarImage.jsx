import React, { memo } from 'react';
// prop-types
import T from 'prop-types';
// assets
import { ReactComponent as AvatarIcon } from 'assets/icons/avatar.svg';
// css
import classes from './AvatarImage.module.css';

const AvatarImage = ({ avatar, size = { width: 170, height: 170 } }) => (
  <div
    className={classes.iconContainer}
    style={{ width: size.width, height: size.height }}
  >
    {avatar ? (
      <img
        alt="avatar"
        src={avatar}
        className={classes.icon}
        height={size.height}
      />
    ) : (
      <AvatarIcon
        className={classes.icon}
        width={size.width}
        height={size.height}
      />
    )}
  </div>
);

AvatarImage.propTypes = {
  avatar: T.any,
  size: T.object,
};

export default memo(AvatarImage);
