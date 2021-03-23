module.exports = {
  name: 'Eval',
  section: 'Plasorex',

  subtitle (data) {
    return `${data.invite}`
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'Eval response'])
  },

  fields: ['code', 'storage', 'varName'],

  html (isEvent, data) {
    return `
    <div>
    <p>
    Developed by <strong>Plasorex</strong>.
    </p>
    <div style="padding-top: 8px;">
      Eval command:<br>
      <textarea class="round" id="code" rows="1" placeholder="Type your command here" style="width: 99%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
    </div><br>
  </div>
  <div style="padding-top: 8px;">
    <div style="float: left; width: 35%;">
      Store In:<br>
      <select id="storage" class="round">
        ${data.variables[1]}
      </select>
    </div>
    <div id="varNameContainer" style="float: right; width: 60%;">
      Variable Name:<br>
      <input id="varName" class="round" type="text">
    </div>
  </div>`
    },

  init () {},

  action (cache) {
    const data = cache.actions[cache.index]
    const code = this.evalMessage(data.code, cache)
    const response = this.eval(data.code)
    
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)

    if (response) {
      this.storeValue(response, storage, varName, cache)
    }
    this.callNextAction(cache)
  },

  mod () {}
}
