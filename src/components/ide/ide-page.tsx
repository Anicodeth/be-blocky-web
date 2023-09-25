"use client"
import React from 'react';
import IdePageBody from './ide-body/ide-body';
import IdePageHeader from './ide-header/ide-header';
import styles from './ide-page.module.css'; // Import the CSS module
import { CoinProvider } from './services/coinContext';
import { NightProvider } from './services/nightContext';
import { SettingProvider } from './services/settingContext';
const IdePage: React.FC = () => {
  return (
    <div
      className={styles['ide-page-container']}
    >
      <CoinProvider>
        <NightProvider>
          <SettingProvider>
            <IdePageHeader></IdePageHeader>
            <IdePageBody></IdePageBody>
          </SettingProvider>
        </NightProvider>
      </CoinProvider>
    </div>
  );
};

export default IdePage;
