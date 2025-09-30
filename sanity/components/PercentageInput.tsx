import React, { useCallback } from 'react';
import { TextInput, Box, Flex, useTheme } from '@sanity/ui';
import { StringInputProps, set, unset } from 'sanity';

const PercentageInput: React.FC<StringInputProps> = (props) => {
  const { value, onChange, elementProps } = props;
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
      
      // Update the value - store just the number, % will be appended on display
      onChange(numericValue ? set(numericValue + '%') : unset());
    },
    [onChange]
  );

  // Display value without % for editing
  const displayValue = value ? value.replace('%', '') : '';

  return (
    <Flex align="stretch">
      <Box flex={1}>
        <TextInput
          {...elementProps}
          value={displayValue}
          onChange={handleChange}
          placeholder="Enter percentage"
        />
      </Box>
      <Box style={addonStyles}>
        %
      </Box>
    </Flex>
  );
};

export default PercentageInput;
