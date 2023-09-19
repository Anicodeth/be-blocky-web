import React, { useEffect, useRef } from 'react';
// Import your custom hook for code editor service
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import styles from './ide-preview.module.css'; // Import your CSS module here
const IdePreviewWindow = ({ mainCode }: any) => {
  const formattedHtmlRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {

    const iframeDocument = formattedHtmlRef.current?.contentDocument || formattedHtmlRef.current?.contentWindow?.document;
    if (iframeDocument) {
      iframeDocument.open();
      iframeDocument.write(mainCode);
    }
  }, [mainCode]);

  const openInNewTab = () => {
    const newTab = window.open('', '_blank');
    if (newTab) {
      newTab.document.write(mainCode);
    }
  };

  return (
    <div className={styles['preview-container']}>
      <iframe className={styles['preview-window']} ref={formattedHtmlRef}></iframe>
      <button className={styles['preview-button']} onClick={openInNewTab}>
        <FontAwesomeIcon className={styles['icon']} icon={faShareSquare} />
      </button>
    </div>
  );
};

export default IdePreviewWindow;

