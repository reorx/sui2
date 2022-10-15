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

fetch('/api/getData')
  .then(res => res.text())
  .then(body => {
    editor.setValue(body)
  })

document.querySelector('.fn-build').addEventListener('click', async (e) => {
  e.preventDefault()

  const res = await fetch('/api/updateDataFile', {
    method: 'POST',
    body: editor.getValue(),
  })
  const data = await res.json()
  if (!data.ok) {
    alert('failed to update data file')
    return
  }
  console.log('update data file success')

  const res1 = await fetch('/api/build', {
    method: 'POST',
  })
  const text = await res1.text()
  console.log(text)

  document.querySelector('#preview').contentWindow.location.reload(true);
})
