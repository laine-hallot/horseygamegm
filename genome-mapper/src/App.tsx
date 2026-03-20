import type { RouteObject } from 'react-router';

import type { tabs } from './tabs';

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { CrisprTab } from './tab-content/crisper-planner/crisper-planner';
import { GenesTab } from './tab-content/gene-lookup/gene-lookup';
import { AnalyzerTab } from './tab-content/genome-analyzer/genome-analyzer';
import { MapTab } from './tab-content/helix-map/helix-map';
import { TabsLayout } from './tab-layout';

import styles from './App.module.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: TabsLayout,
      children: [
        {
          index: true,
          Component: MapTab,
        },
        {
          path: 'genes',
          Component: GenesTab,
        },
        {
          path: 'crispr',
          Component: CrisprTab,
        },
        {
          path: 'analyzer',
          Component: AnalyzerTab,
        },
      ] satisfies (Omit<RouteObject, 'path'> & {
        path?: (typeof tabs)[number]['path'];
      })[],
    },
  ],
  { basename: import.meta.env.BASE_URL ?? '' },
);

export const App: React.FC<{}> = () => (
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
    <RouterProvider router={router} />
  </>
);
