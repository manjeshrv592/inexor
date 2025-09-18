import React, { useCallback } from 'react';
import { TextArea, TextInput } from '@sanity/ui';
import { StringInputProps, set, unset } from 'sanity';

interface TextWithCounterProps extends StringInputProps {
  maxLength?: number;
  fieldType?: 'string' | 'text';
}

const TextWithCounter: React.FC<TextWithCounterProps> = (props) => {
  const { elementProps, onChange, value = '', maxLength = 1000, fieldType = 'text' } = props;
  
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value;
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange]
  );

  const handleTextAreaChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.currentTarget.value;
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange]
  );

  const currentLength = value.length;
  const isOverLimit = currentLength > maxLength;

  return (
    <div>
      {fieldType === 'string' ? (
        <TextInput
          {...elementProps}
          onChange={handleInputChange}
          value={value}
          style={{
            borderColor: isOverLimit ? '#f03e2f' : undefined,
          }}
        />
      ) : (
        <TextArea
          {...elementProps}
          onChange={handleTextAreaChange}
          value={value}
          rows={6}
          style={{
            borderColor: isOverLimit ? '#f03e2f' : undefined,
          }}
        />
      )}
      <div
        style={{
          marginTop: '8px',
          fontSize: '14px',
          color: isOverLimit ? '#f03e2f' : '#6e7683',
          textAlign: 'right',
        }}
      >
        {currentLength}/{maxLength} characters
        {isOverLimit && (
          <div style={{ color: '#f03e2f', fontSize: '12px' }}>
            Exceeds maximum length by {currentLength - maxLength} characters
          </div>
        )}
      </div>
    </div>
  );
};

export default TextWithCounter;
