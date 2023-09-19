"use client"
import React, { useState, useEffect } from 'react';
import IdePageBody from './ide-body/ide-body';
import IdePageHeader from './ide-header/ide-header';
import styles from './ide-page.module.css'; // Import the CSS module
import { SettingProvider } from './services/settingContext';
import { NightProvider } from './services/nightContext';
import { CoinProvider } from './services/coinContext';
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
