import cn from 'classnames';
import React from 'react';

import Icon from './Icon';
import NavigationSlider from './NavigationSlider';
import Search from './Search';

export default class AppHeader extends React.PureComponent {
  static propTypes = {
    match: React.PropTypes.object.isRequired
  };

  state = {
    translucent: false,
    open: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const translucent = document.body.scrollTop > 5;
      if (this.state.translucent !== translucent) {
        this.setState({
          translucent
        });
      }
    });
  }

  handleNavigationSliderToggle = () => {
    if (!this.state.open) {
      this.setState({
        open: !this.state.open,
        translucent: false,
      });
    } else {
      this.setState({
        open: !this.state.open,
        translucent: document.body.scrollTop > 5,
      });
    }
  }

  handleNavigationSliderHide = () => {
    this.setState({
      open: false
    });
  }

  renderSlider = (props) => {
    return (
      <NavigationSlider
        match={this.props.match}
        open={this.state.open}
        toggle={this.handleNavigationSliderToggle}
      />
    );
  }

  render() {
    const className = cn('mb-app-header', { translucent: this.state.translucent });

    return (
      <header className={className}>
        <div className="header-left">
          <div className="header-icons">
            <Icon
              className="nav-show-btn"
              iconName="three-bars"
              onClick={this.handleNavigationSliderToggle}
            />
            <a className="mb-logo" href="/" />
          </div>
          <div
            className={cn('background', { active: this.state.open })}
            onClick={() => this.handleNavigationSliderHide()}
          />
          {this.renderSlider()}
        </div>
        <Search className="mb-header-search" placeholder="搜索" />
      </header>
    );
  }
}
