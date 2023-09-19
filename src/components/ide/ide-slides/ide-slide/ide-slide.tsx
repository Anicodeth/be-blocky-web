import React from 'react';
import styles from './ide-slide.module.css';

function IdeSlide(props: { backgroundColor: any, title: any; titleFont: any; content: any; contentFont: any; code: any; image: any; }) {
  const {
    backgroundColor,
    title,
    titleFont,
    content,
    contentFont,
    code,
    image,
  } = props;

  return (
    <div className={styles['course']} style={{ backgroundColor: backgroundColor }}>
      <div className={styles['main-content']}>
        <h1 className={styles['content-title']} style={{ fontFamily: titleFont }}>
          {title}
        </h1>
        <div className={styles['main-content']}>
          <div className={styles['text-content']} style={{ fontFamily: contentFont }}>
            <p>{content}</p>
          </div>
          {code && <div className={styles['code-content']}>{code}</div>}
        </div>
        <div className={styles['image-container']}>
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default IdeSlide;
