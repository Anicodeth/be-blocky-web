import { faArrowRight, faBars, faCode } from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import React, { useContext, useEffect, useState } from 'react';
import IdeEditor from '../ide-editor/ide-editor-section';
import IdePreviewWindow from '../ide-preview/ide-preview';
import IdeSlides from '../ide-slides/ide-slides';
import { NightContext } from '../services/nightContext';
import styles from './ide-body.module.css'; // Import your CSS module here


const IdePageBody: React.FC = () => {
  const [mainCode, setMainCode] = useState<string>(''); // [mainCode, setMainCode
  const [activeWindow, setActiveWindow] = useState('editor');
  const [onlyCode, setOnlyCode] = useState(false);
  const { isNight, setIsNight } = useContext(NightContext); // Replace with the actual context


  useEffect(() => {
    var val = sessionStorage.getItem("isNight") == 'true';
    setIsNight(val ? true : false)
  }, [])

  const toggleWindows = (window: any) => {
    setActiveWindow(window);
  };

  return (
    <>
      <div className={styles['window-toggle']}>
        {!onlyCode && (
          <button
            onClick={() => toggleWindows('slide')}
            className={`${activeWindow === 'slide' ? styles.active : ''} ${styles['window-toggle-button']}`}
          >
            Read
            <FontAwesomeIcon icon={faBars} className={styles['header-icon']} />
          </button>
        )}
        <button
          onClick={() => toggleWindows('editor')}
          className={`${activeWindow === 'editor' ? styles.active : ''} ${styles['window-toggle-button']}`}
        >
          Code
          <FontAwesomeIcon icon={faCode} className={styles['header-icon']} />
        </button>
        <button
          onClick={() => toggleWindows('preview')}
          className={`${activeWindow === 'preview' ? styles.active : ''} ${styles['window-toggle-button']}`}
        >
          Run
          <FontAwesomeIcon icon={faArrowRight} className={styles['header-icon']} />
        </button>
      </div>
      <div className={styles['ide-body-container']}
        style={{ backgroundColor: `${isNight ? '#1A1A1A' : 'white'}` }}
      >
        {!onlyCode && <div className={`${styles['ide-body-segment']}
                       ${activeWindow === 'slide' ? styles['reveal'] : ''}`}>
          <IdeSlides
            slides={undefined}
            mainCode={mainCode}
            course_id={1}
          />
        </div>}
        <div className={`${styles['ide-body-segment']} ${activeWindow === 'editor' ? styles['reveal'] : ''}`}>
          <IdeEditor
            setMainCode={setMainCode}
          />
        </div>
        <div className={`${styles['ide-body-segment']} ${activeWindow === 'preview' ? styles['reveal'] : ''}`}>
          <IdePreviewWindow
            mainCode={mainCode}
          />
        </div>
      </div>
    </>
  );
};

export default IdePageBody;
