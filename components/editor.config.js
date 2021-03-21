/** 
 * Config file for the Editor.
 */
const config = {
  mode: 'html',
  theme: 'github',
  height: '80vh',
  width: '50%',
  fontSize: 18,
  options: {
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: false,
    useWorker: false
  }
}

export const defaultNewWorkspaceValue = `
<style>
    /* Write your CSS here. */
    #root {
        background-color: #3f50b5;
        height: 100vh;
    }
    .title {
        margin-top: 25px;
        font-family: sans-serif;
        text-align: center;
        color: white;
    }
</style>

<div id="root">
  <!-- Write your HTML here. -->
  <h1 class="title">Say, hi!</h1>

  
</div>`

export default config 