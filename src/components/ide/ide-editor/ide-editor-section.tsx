import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-chaos';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-clouds';
import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/theme-crimson_editor';
import 'ace-builds/src-noconflict/theme-dawn';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-dreamweaver';
import 'ace-builds/src-noconflict/theme-eclipse';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-gob';
import 'ace-builds/src-noconflict/theme-gruvbox';
import 'ace-builds/src-noconflict/theme-xcode';
import { useContext, useEffect, useRef, useState } from 'react';
import { SettingContext } from '../services/settingContext';
import styles from './ide-editor.module.css';

interface CodeState {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
}

function AceCodeEditor({
  onChange,
  mode,
}: {
  onChange: (code: string) => void;
  mode: string;
}) {

  const defaultSetting = {
    fontSize: 16,
    theme: 'dracula',
    fullScreen: false
  }
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { setting } = useContext(SettingContext) || { setting: defaultSetting, setSetting: () => { } };

  useEffect(() => {
    const editor = ace.edit(editorRef.current!);
    editor.setTheme(`ace/theme/${setting.theme}`);
    editor.getSession().setMode(`ace/mode/${mode}`);
    editor.setFontSize(setting.fontSize);

    editor.getSession().on('change', () => {
      onChange(editor.getValue());
    });

  }, [setting.theme, setting.fontSize, mode, onChange]);

  return <div ref={editorRef} style={{ height: '100%', width: '100%' }} />;
}

export default function IdeEditor({ setMainCode }: any) {
  const [activeEditor, setActiveEditor] = useState<string>('html');
  const [code, setCode] = useState<CodeState>({
    htmlCode: '',
    cssCode: '',
    jsCode: '',
  });
  const [isVertical, setIsVertical] = useState(true);


  const toggleEditor = (editor: string) => {
    setActiveEditor(editor);
  };

  const toggleVertical = () => {
    setIsVertical(!isVertical);
  }

  const updateCode = (updatedCode: any) => {
    setCode({ ...code, ...updatedCode });
  };

  useEffect(() => {
    setMainCode(codeTemplate(code));
  }, [code]);



  return (
    <>
      <div className={styles['all-editors']}>
        <div className={`${styles['editor-toggle']} ${isVertical ? styles['hide'] : ''}`}>
          <button
            onClick={() => toggleEditor('html')}
            className={activeEditor === 'html' ? styles['active'] : ''}
          >
            HTML
          </button>
          <button
            onClick={() => toggleEditor('css')}
            className={activeEditor === 'css' ? styles['active'] : ''}
          >
            CSS
          </button>
          <button
            onClick={() => toggleEditor('js')}
            className={activeEditor === 'js' ? styles['active'] : ''}
          >
            JS
          </button>
        </div>

        <div className={(activeEditor === 'html' || isVertical) ? styles['active'] : styles['hide']}>
          <div className={styles['label-container']}>
            <h4>Index.html</h4>
          </div>
          <div id="html-editor" className={styles['app-ace-editor']}>
            <AceCodeEditor
              onChange={(htmlCode) => updateCode({ htmlCode })}
              mode={'html'}
            />
          </div>
        </div>

        <div className={(activeEditor === 'css' || isVertical) ? styles['active'] : styles['hide']}>
          <div className={styles['label-container']}>
            <h4>Style.css</h4>
          </div>
          <div id="css-editor" className={styles['app-ace-editor']}>
            <AceCodeEditor
              onChange={(cssCode) => updateCode({ cssCode })}
              mode={'css'}
            />
          </div>
        </div>

        <div className={(activeEditor === 'js' || isVertical) ? styles['active'] : styles['hide']}>
          <div className={styles['label-container']}>
            <h4>Script.js</h4>
          </div>
          <div id="js-editor" className={styles['app-ace-editor']}>
            <AceCodeEditor
              onChange={(jsCode) => updateCode({ jsCode })}
              mode={'javascript'}
            />
          </div>

        </div>
        <button className={styles['vertical-button']} onClick={toggleVertical} >
          <FontAwesomeIcon className={styles['icon']} icon={faSquare} />
        </button>
      </div>
    </>
  );
}


const codeTemplate = ({ htmlCode, cssCode, jsCode }: CodeState) => {
  return `
  <html>
    <head>
      <style>
        ${cssCode || ''}
      </style>
    </head>
    <body>
      ${htmlCode || ''}
      <script>
        ${jsCode || ''}
      </script>
    </body>
  </html>
`;
};
