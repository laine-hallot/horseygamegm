import { useState } from 'react';

import { Tabs } from './tabs';
import { AnalyzerTab } from './tab-content/genome-analyzer/genome-analyzer';
import { GenesTab } from './tab-content/gene-lookup/gene-lookup';
import { CrisprTab } from './tab-content/crisper-planner/crisper-planner';
import { MapTab } from './tab-content/helix-map/helix-map';

import styles from './App.module.css';

export const App = () => {
  const [genePreselect, setGenePreselect] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState('map');

  const handleSelectGene = (name: string) => {
    setGenePreselect(name);
    setActiveTab('genes');
  };

  const tabs = {
    map: {
      title: 'Helix Map',
      content: () => <MapTab onSelectGene={handleSelectGene} />,
    },
    genes: {
      title: 'Gene Lookup',
      content: () => <GenesTab preselect={genePreselect} />,
    },
    crispr: { title: 'CRISPR Planner', content: () => <CrisprTab /> },
    analyzer: { title: 'Genome Analyzer', content: () => <AnalyzerTab /> },
  };

  return (
    <>
      <div id="header">
        <div>
          <h1>EQUINE GENOME MAPPER</h1>
          <div className={styles.headerSubtitle}>
            POSITIONAL MODEL — 240 GENES · 20 HELICES
          </div>
        </div>
        <div className="legend">
          <span>
            <b className={styles.legendBaseA}>A</b> = Yellow
          </span>
          <span>
            <b className={styles.legendBaseT}>T</b> = Red
          </span>
          <span>
            <b className={styles.legendBaseC}>C</b> = Blue
          </span>
          <span>
            <b className={styles.legendBaseG}>G</b> = Green
          </span>
        </div>
      </div>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
};
