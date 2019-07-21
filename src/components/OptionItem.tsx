import React, { MouseEvent, KeyboardEvent, forwardRef } from 'react';

export interface Option {
  ariaLabel?: string,
  className?: string,
  title?: string,
  value: string,
  iconClass?: string,
}

export interface OptionGroup {
  label: string,
  groupOptions: Option[],
}

export type DropdownOption = Option | OptionGroup;

interface OptionItemProps {
  option: Option,
  optionClass: string,
  onOptionClicked: ({ nativeEvent }: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void,
};

const OptionItem = forwardRef<HTMLButtonElement, OptionItemProps>((props: OptionItemProps, ref) => {
  const {
    onOptionClicked,
    option,
    optionClass,
  } = props;

  return (
    <button
      aria-label={option.ariaLabel}
      className={optionClass}
      onClick={onOptionClicked}
      onKeyDown={onOptionClicked}
      ref={ref}
      tabIndex={-1}
      title={option.title}
      type="button"
    >
      { option.iconClass && <i className={`${option.iconClass} option-icon`} />}
      { option.value }
    </button>
  );
});

OptionItem.defaultProps = {
  optionClass: undefined,
};

export default OptionItem;
