import React from "react";
import { IconWrapper, InputContainer } from "./styles";
import { Search } from "lucide-react";
import type { ThemeType } from "styles/theme";
import { BaseInput } from "styles/components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  padding?: keyof ThemeType["spacing"];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string | null;
}

export const Input = React.forwardRef(
  (
    { leftIcon, rightIcon, error, ...props }: InputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;

    return (
      <InputContainer>
        {hasLeftIcon && <IconWrapper position="left">{leftIcon}</IconWrapper>}

        <BaseInput
          ref={ref}
          hasLeftIcon={hasLeftIcon}
          hasRightIcon={hasRightIcon}
          error={!!error}
          {...props}
        />

        {hasRightIcon && (
          <IconWrapper position="right">{rightIcon}</IconWrapper>
        )}
      </InputContainer>
    );
  }
);

export const SearchInput = ({ ...props }: InputProps) => {
  return (
    <Input
      leftIcon={<Search size={18} />}
      placeholder={props.placeholder}
      {...props}
    />
  );
};

Input.displayName = "Input";

SearchInput.displayName = "SearchInput";
