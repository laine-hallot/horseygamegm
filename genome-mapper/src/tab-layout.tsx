import { NavLink, Outlet } from 'react-router';

import { tabs } from './tabs';

export const TabsLayout: React.FC<{}> = () => {
  return (
    <div className="tabs-view">
      <nav>
        {tabs.map((tab) => (
          <NavLink key={tab.path} to={tab.path} className="nav-link">
            {tab.title}
          </NavLink>
        ))}
      </nav>
      <div id="app">
        <Outlet />
      </div>
    </div>
  );
};
