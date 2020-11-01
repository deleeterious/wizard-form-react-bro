import React, { memo, useState } from 'react';
// react-image-crop
import Cropper from 'react-easy-crop';
// prop-types
import T from 'prop-types';
// react-hook-form
import { useFormContext } from 'react-hook-form';
// assets
import { ReactComponent as AddIcon } from 'assets/icons/add.svg';
// utils
import getCroppedImg from 'utils';
// components
import AvatarImage from 'components/AvatarImage';
import ValidationError from 'components/ValidationError';
import Button from 'components/Button';
// css
import classes from './AvatarInput.module.css';

const AvatarInput = ({ refRegister, errorMessage }) => {
  const { setValue, setError, watch } = useFormContext();

  const [isCrop, setIsCrop] = useState(false);
  const [image, setImage] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixelsState, setCroppedAreaPixelsState] = useState(null);

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixelsState(croppedAreaPixels);
  };

  const handleLoadLocalFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      const fileSizeMB = file.size / 1024 / 1024;

      if (fileSizeMB > 1) {
        setError('avatarData', {
          type: 'manual',
          message: 'Image max size 1 MB',
        });
      } else {
        setImage(reader.result);
        setIsCrop(true);
      }
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleApplyCrop = async () => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixelsState);
    setValue('avatarData', croppedImage, { shouldDirty: true });
    setIsCrop(false);
  };

  const handleCloseCrop = (e) => {
    e.preventDefault(); // really need here
    setIsCrop(false);
  };

  return (
    <div className={classes.avatarContainer}>
      <AvatarImage avatar={watch('avatarData')} />

      <label htmlFor="avatar" className={classes.fileInputLabel}>
        <input
          name="avatarData"
          ref={refRegister}
          className={classes.textInput}
        />
        {isCrop && (
          <>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              classes={{ containerClassName: classes.cropperCont }}
            />

            <div className={classes.buttons}>
              <Button
                type="button"
                disabled={false}
                className={classes.closeCropButton}
                handleClick={handleCloseCrop}
              >
                Close
              </Button>

              <Button
                type="button"
                disabled={false}
                className={classes.applyCropBtn}
                handleClick={handleApplyCrop}
              >
                Apply
              </Button>
            </div>
          </>
        )}
        {!isCrop && (
          <>
            <input
              type="file"
              name="avatar"
              accept="image/png,image/jpeg,image/jpg"
              id="avatar"
              className={classes.fileInput}
              onChange={handleLoadLocalFile}
            />

            <AddIcon className={classes.addIcon} />
            <div>add avatar</div>
          </>
        )}
      </label>
      <ValidationError errorMessage={errorMessage} />
    </div>
  );
};

AvatarInput.propTypes = {
  refRegister: T.func,
  errorMessage: T.string,
};

export default memo(AvatarInput);
