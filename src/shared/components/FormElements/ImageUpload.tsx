import React, { useRef, ChangeEvent, FC, useState, useEffect } from 'react';
import Button from './Button';
import { IImageUpload } from '../../../interfaces/other/ImageUpload';
import './ImageUpload.scss';

const ImageUpload: FC<IImageUpload> = ({ id, center, onInput, errorText }) => {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };
  const pickImageHandler = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  return (
    <div className="form-control">
      <input
        id={id}
        ref={filePickerRef}
        type="file"
        style={{ display: 'none' }}
        accept=".jpeg,.jpg,.png"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && 'center'}`}>
        {previewUrl && (
          <div className="image-upload__preview">
            <img src={previewUrl as string} alt="preview" />
          </div>
        )}
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{}</p>}
    </div>
  );
};

export default ImageUpload;
