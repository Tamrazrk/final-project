import React, { useRef } from 'react'
import { DropdownList, DropdownSelector, StyledDropdown } from './styles/Dropdown.styled'
import useToggle from '../hooks/useToggle';
import useOutsideClick from '../hooks/useOutsideClick';

export default function Dropdown({
    placeholder,
    options,
    handleChange,
    value,
}) {
  const [open, toggleOpen] = useToggle();
  const ref = useRef(null);
    
  useOutsideClick(ref, () => toggleOpen(false));

  const onSelect = (value) => {
    handleChange(value);
    toggleOpen();
  }

  return (
    <StyledDropdown ref={ref}>
        <DropdownSelector onClick={toggleOpen}>
            { value ? value : placeholder }
        </DropdownSelector>
        {open &&
        <DropdownList>
            {options.map((option, i) => 
                <div key={i} onClick={() => onSelect(option)}>{option}</div>
            )} 
        </DropdownList > }
    </StyledDropdown>
  )
}
