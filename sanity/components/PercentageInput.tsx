import React, { useCallback } from 'react';
import { TextInput, Box, Flex, useTheme } from '@sanity/ui';
import { StringInputProps, set, unset } from 'sanity';

interface PercentageInputProps extends StringInputProps {
  maxLength?: number;
}

const PercentageInput: React.FC<PercentageInputProps> = (props) => {
  const { value, onChange, elementProps, maxLength = 10 } = props;
  const theme = useTheme();
  
  // Get colors from Sanity's theme for light/dark mode support
  const isDarkMode = theme.sanity.color.dark;
  
  const addonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 12px',
    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#f1f3f6',
    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#c6cbd1'}`,
    borderLeft: 'none',
    fontSize: '14px',
    color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : '#6e7683',
    minWidth: '40px',
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.currentTarget.value;
      
      // Remove any existing % signs and non-numeric characters except decimal point
      const numericValue = inputValue.replace(/[^0-9.]/g, '');
      
      // Apply character limit (excluding the % sign)
      const limitedValue = numericValue.slice(0, maxLength);
      
      // Update the value - store just the number, % will be appended on display
      onChange(limitedValue ? set(limitedValue + '%') : unset());
    },
    [onChange, maxLength]
  );

  // Display value without % for editing
  const displayValue = value ? value.replace('%', '') : '';
  const currentLength = displayValue.length;
  const isOverLimit = currentLength > maxLength;

  return (
    <div>
      <Flex align="stretch">
        <Box flex={1}>
          <TextInput
            {...elementProps}
            value={displayValue}
            onChange={handleChange}
            placeholder="Enter percentage"
            style={{
              borderColor: isOverLimit ? '#f03e2f' : undefined,
            }}
          />
        </Box>
        <Box style={addonStyles}>
          %
        </Box>
      </Flex>
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

export default PercentageInput;
