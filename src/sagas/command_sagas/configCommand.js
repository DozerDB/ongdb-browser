import { put, select } from 'redux-saga/effects'
import frames from '../../main/frames'
import settings from '../../settings'
import { getSettings } from '../../selectors'
import { parseConfigInput } from '../../services/commandUtils'

export function * handleConfigCommand (cmd, cmdchar) {
  const strippedCmd = cmd.substr(cmdchar.length)
  const toBeSet = parseConfigInput(strippedCmd)
  if (strippedCmd === 'config' || toBeSet === false) {
    const settingsState = yield select(getSettings)
    yield put(frames.actions.add({cmd: cmd, type: 'pre', contents: JSON.stringify(settingsState, null, 2)}))
    return
  }
  yield put(settings.actions.update(toBeSet))
  const settingsState = yield select(getSettings)
  yield put(frames.actions.add({cmd: cmd, type: 'pre', contents: JSON.stringify(settingsState, null, 2)}))
}