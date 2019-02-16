import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

// Styles
import './preferences.css';

// Components
import TopBar from '../../components/TopBar';
import TopNavigationMenu from '../../components/TopNavigationMenu';

// Components (Menu Content Items)
import General from './General';
import Projects from './Projects';
import Interests from './Interests';
import Mission from './Mission';
import Contact from './Contact';

// Actions
import * as projectsActions from '../../actions/projects';
import * as menuActions from '../../actions/menu';

// Selectors
import * as projectSelectors from '../../reducers/projects';
import * as menuSelectors from '../../reducers/menu';

// Constants
const MENU_ITEMS = {
  GENERAL: 'General',
  PROJECTS: 'Projects',
  INTERESTS: 'Interests',
  MISSION: 'Mission',
  CONTACT: 'Contact',
};

// Data
const menuItems = [
  { icon: 'cookie', title: MENU_ITEMS.GENERAL },
  { icon: 'iceCream', title: MENU_ITEMS.PROJECTS },
  { icon: 'melon', title: MENU_ITEMS.INTERESTS },
  { icon: 'pieceOfCake', title: MENU_ITEMS.MISSION },
  { icon: 'sushi', title: MENU_ITEMS.CONTACT },
];

const Preferences = ({
  selectMenu,
  selectedMenu,
  selectProject,
  projectName,
}) => {
  return (
    <section id="preferences">
      <Container className="preferences-container">
        <TopBar title="Preferences" />
        <TopNavigationMenu
          menuItems={menuItems}
          selectMenu={selectMenu}
          selectedMenu={selectedMenu}
        />
        <div className="preferences-body">
          {selectedMenu === MENU_ITEMS.GENERAL && <General />}
          {selectedMenu === MENU_ITEMS.PROJECTS && (
            <Projects selectProject={selectProject} projectName={projectName} />
          )}
          {selectedMenu === MENU_ITEMS.INTERESTS && <Interests />}
          {selectedMenu === MENU_ITEMS.MISSION && <Mission />}
          {selectedMenu === MENU_ITEMS.CONTACT && <Contact />}
        </div>
      </Container>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    projectName: projectSelectors.getProjectName(state),
    selectedMenu: menuSelectors.getSelectedMenu(state),
  };
}

const actionCreators = {
  selectProject: projectsActions.selectProject,
  selectMenu: menuActions.selectMenu,
};

export default connect(
  mapStateToProps,
  actionCreators
)(Preferences);