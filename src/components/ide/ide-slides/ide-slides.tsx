import React, { useState, useContext } from 'react';
import IdeSlide from './ide-slide/ide-slide'; // Import your IdeSlide component
import styles from './ide-slides.module.css'; // Import your styles object
import { CoinContext } from '../services/coinContext'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons/index';
function IdeSlides(props: { slides: any; mainCode: string; course_id: number; }) {
  const { coin, setCoin } = useContext(CoinContext)

  const slides = [
    {
      backgroundColor: '#FFD700',
      color: 'black',
      code: 'Some code for Slide 1',
      title: 'Slide 1',
      titleFont: 'Arial, sans-serif',
      content: 'Content for Slide 1',
      contentFont: 'Verdana, sans-serif',
      image: 'slide1.jpg',
    },
    {
      backgroundColor: '#FFD700',
      color: 'black',
      code: 'Some code for Slide 2',
      title: 'Slide 2',
      titleFont: 'Times New Roman, serif',
      content: 'Content for Slide 2',
      contentFont: 'Georgia, serif',
      image: 'slide2.jpg',
      solution: 'Some code for Slide 2',

    },
    {
      backgroundColor: '#FFD700',
      color: 'black',
      code: 'Some code for Slide 3',
      title: 'Slide 3',
      titleFont: 'Courier New, monospace',
      content: 'Content for Slide 3',
      contentFont: 'Courier New, monospace',
      image: 'slide3.jpg',
      solution: 'Some code for Slide 3',
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    var progress = extractProgress();
    if (((currentIndex < slides.length - 1) && (checkCode() > 50)) || (currentIndex < progress)) {
      setCurrentIndex(currentIndex + 1);
      if (currentIndex > progress) {
        setCoin((checkCode() / 10) + coin)
        var progressId = `${currentIndex + 1} ${props.course_id}`;
        sessionStorage.setItem("progress", progressId);
      }
    }
    else if ((currentIndex < slides.length - 1)) {
      alert("You should write the code correctly to go to the next slide")
    }
  };

  const extractProgress = () => {
    var progress = sessionStorage.getItem("progress");
    if (progress) {
      var progressArray = progress.split(" ");
      if (parseInt(progressArray[1]) == props.course_id) {
        var progressed = parseInt(progressArray[0]);
        //setCurrentIndex(progressed);
        return progressed
      } else return 0;
    }
    else return 0;

  }

  const checkCode = () => {
    if (slides[currentIndex].code && calculateSentencePercentage(slides[currentIndex].code, props.mainCode) > 50) {
      return calculateSentencePercentage(slides[currentIndex].code, props.mainCode)
    } else if (slides[currentIndex].solution && calculateSentencePercentage(slides[currentIndex].solution, props.mainCode) > 50) {
      return calculateSentencePercentage(slides[currentIndex].code, props.mainCode)
    }
    else {
      return 0;
    }
  };
  const calculateSentencePercentage = (sentence: string | undefined, paragraph: string | undefined): number => {
    if (!paragraph || !sentence) {
      return 100;
    }

    const paragraphLower = paragraph.toLowerCase();
    const sentenceLower = sentence.toLowerCase();

    // Remove punctuation from the sentence and split it into individual words
    const sentenceWords = sentenceLower.replace(/[.,?!]/g, "").split(" ");

    // Calculate the number of words in the sentence
    const sentenceLength = sentenceWords.length;

    // Count the number of matching words in the paragraph
    const matchingWords = sentenceWords.filter((word: any) => paragraphLower.includes(word));

    // Calculate the number of matching words
    const matchingWordCount = matchingWords.length;

    // Calculate the percentage of the sentence present in the paragraph
    const percentage = (matchingWordCount / sentenceLength) * 100;
    return percentage;
  }

  return (
    <div className={styles['courser']}>
      <div className={styles['dots-container']}>
        {slides.map((course: any, courseIndex: any) => (
          <div
            key={courseIndex}
            className={
              courseIndex <= currentIndex
                ? `${styles.dot} ${styles['completed-course']}`
                : `${styles.dot} ${styles['new-course']}`
            }
            onClick={() => goToSlide(courseIndex)}
          ></div>
        ))}
      </div>
      <div className={styles.overlay}>
        <div onClick={goToPrevious} className={styles['left-arrow']}>
          <p>❰</p>
        </div>
        <div onClick={goToNext} className={styles['right-arrow']}>
          <p>❱</p>
        </div>
      </div>
      <IdeSlide
        backgroundColor={slides[currentIndex].backgroundColor}
        code={slides[currentIndex].code}
        title={slides[currentIndex].title}
        titleFont={slides[currentIndex].titleFont}
        content={slides[currentIndex].content}
        contentFont={slides[currentIndex].contentFont}
        image={slides[currentIndex].image}
      />
    </div>
  );
}

export default IdeSlides;
