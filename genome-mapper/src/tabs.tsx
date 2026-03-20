import { type JSX, type PropsWithChildren } from 'react';

const Tab: React.FC<
  PropsWithChildren<{ active: boolean; onClick: () => void }>
> = ({ active, onClick, children }) => {
  return (
    <button className={active ? 'active' : ''} onClick={onClick}>
      {children}
    </button>
  );
};

export const Tabs: React.FC<{
  tabs: Record<string, { title: string; content: () => JSX.Element }>;
  activeTab: string;
  onTabChange: (id: string) => void;
}> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tabs-view">
      <nav>
        {Object.entries(tabs).map(([id, data]) => (
          <Tab
            key={id}
            active={activeTab === id}
            onClick={() => onTabChange(id)}
          >
            {data.title}
          </Tab>
        ))}
      </nav>

      <div id="app">{tabs[activeTab]!.content()}</div>
    </div>
  );
};
