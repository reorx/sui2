import * as monaco from 'monaco-editor'
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

self.MonacoEnvironment = {
	getWorker: function (workerId, label) {
		switch (label) {
			case 'json':
				return new jsonWorker()
			default:
				return new editorWorker()
		}
	},
};


const editor = monaco.editor.create(
  document.querySelector('.editor'),
  {
    language: 'json',
    lineNumbers: 'off',
    scrollBeyondLastLine: false,
    readOnly: false,
    theme: 'vs-light',
    minimap: {
      enabled: false,
    },
    wordWrap: 'on',
  })

fetch('/getData')
  .then(res => res.text())
  .then(body => {
    editor.setValue(body)
  })
