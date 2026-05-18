import React from 'react';
import styled from 'styled-components';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';

interface ColorPickerInputProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const PRESET_COLORS = [
  '#db4437', // Red
  '#4285f4', // Blue
  '#0f9d58', // Green
  '#f4b400', // Yellow
  '#9c27b0', // Purple
  '#3f51b5', // Indigo
  '#00bcd4', // Cyan
  '#795548' // Brown
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ColorPreview = styled.div<{ color?: string }>`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 8px;
  background-color: ${(props) => props.color || '#fff'};
  border: 2px solid var(--border-base-color);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
`;

const PresetsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 4px 0;
`;

const PresetSquare = styled.div<{ color: string; active: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 2px solid ${(props) => (props.active ? 'var(--primary-color)' : 'transparent')};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }
`;

export const ColorPickerInput: React.FC<ColorPickerInputProps> = ({ value = '', onChange, disabled }) => {
  const handleColorClick = (color: string) => {
    if (!disabled) {
      onChange?.(color);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <Container>
      <InputRow>
        <ColorPreview color={value} />
        <BaseInput
          value={value}
          onChange={handleInputChange}
          placeholder='#000000'
          size='small'
          disabled={disabled}
          style={{ flex: 1 }}
        />
      </InputRow>
      <PresetsGrid>
        {PRESET_COLORS.map((color) => (
          <PresetSquare
            key={color}
            color={color}
            active={(value || '').toLowerCase() === color.toLowerCase()}
            onClick={() => handleColorClick(color)}
          />
        ))}
      </PresetsGrid>
    </Container>
  );
};
