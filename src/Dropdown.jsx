import React, { Component } from "react";
import DropdownItem from "./Components/DropdownItem";
import './styles/Dropdown.scss';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  onBlur = e => {
    const target = e.nativeEvent.relatedTarget;
    if (!target) {
      this.setState({ open: false });
      return;
    }
    const classValue = target.classList.value;
    if(classValue.indexOf('dropdown') === -1) {
      this.setState({ open: false });
    }
  }

  onDropdownClick = e => {
    !this.props.disabled && this.setState(p => ({ open: !p.open}));
  }

  onOptionClicked = e => {
    this.props.setSelected(e);
    this.setState(p => ({ open: !p.open}));
  }

  // Would have pulled this out as a seperate component in a seperate file but I can only have 10 files
  renderOptions = () => {
    return this.props.options.map(option =>{
      const selected = option.name === this.props.selectedOption;
      return <DropdownItem key={ option.name } selected={ selected } onOptionClicked={ this.onOptionClicked } option={ option } />;
    });
  }

  render() {
    const displayedValue = this.props.selectedOption || this.props.placeholder || '';
    const displayedValueClass = !!this.props.selectedOption ? 'displayed-value' : 'displayed-value grey';
    const contentClass = this.state.open ? 'dropdown-content dropdown-content-open' : 'dropdown-content';
    const arrowClass = this.state.open ? 'dropdown-arrow up' : 'dropdown-arrow down';

    return (
      <div className='dropdown' onBlur={ this.onBlur }>
        <button className='dropdown-select' onClick={ this.onDropdownClick } disabled={ this.props.disabled } aria-label={ displayedValue }>
          <div className={ displayedValueClass }>{ displayedValue }</div>
          <div className={ arrowClass } />
        </button>
        <ul className={ contentClass }>{ this.renderOptions() }</ul>
      </div>
    );
  }
}

// Dropdown.propTypes = {
//   disabled: React.PropTypes.bool,
//   options: React.PropTypes.object.isRequired,
//   placeholder: React.PropTypes.string,
//   selectedOption: React.PropTypes.string,
//   setSelected: React.PropTypes.func.isRequired,
// };

export default Dropdown;