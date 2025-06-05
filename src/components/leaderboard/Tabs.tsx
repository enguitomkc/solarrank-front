export interface LeaderboardTabsProps {
  title: string;
  value: string;
}

function LeaderboardTabs({
  selected,
  setSelected,
  tabs,
}: {
  selected: string;
  setSelected: (value: string) => void;
  tabs: LeaderboardTabsProps[];
}) {
  return (
    <div className="flex space-x-1 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setSelected(tab.value)}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            selected === tab.value
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.title}
          {selected === tab.value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}

export default LeaderboardTabs;
