import React, { ChangeEvent, useRef, useEffect, useCallback, useState }  from 'react';
import { useField } from '@unform/core';


const ImageInput = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref) {
        ref.value = '';
      },
    })
  }, [fieldName, registerField]);
  return (
    <>
      <input
        type="file"
        ref={inputRef}
        {...rest}
      />

      {error && <span style={{ color: "#f00" }}>{error}</span>}
    </>
  );
};
export default ImageInput;