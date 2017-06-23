import { Session } from 'meteor/session';
import { defaults } from './config';

let instanceCounter = 0;
export default class InstanceState
{
  instanceId;
  persistentStorage;
  constructor(options = {}) {
    this.instanceId = instanceCounter++;
    this.persistentStorage = options.persistentStorage || null;
  }

  _sessionKey(stateKey) {
    return defaults.statePrefix + this.instanceId + '_' + stateKey;
  }

  _getPersistentState() {
    const state = this.persistentStorage.getItem(defaults.persistentStateKey);
    return state ? JSON.parse(state)[this.instanceId] : {};
  }

  _getPersistent(stateKey) {
    const state = this._getPersistentState();
    if (!state[this.instanceId]) state[this.instanceId] = {};
    return state[this.instanceId][stateKey];
  }

  _setPersistent(stateKey, value) {
    const state = this._getPersistentState();
    const newState = state || {};
    if (!state[this.instanceId]) newState[this.instanceId] = {};
    newState[this.instanceId][stateKey] = value;
    return this;
  }

  get(stateKey) {
    const sessionKey = this._sessionKey(stateKey);
    const sessionVal = Session.get(sessionKey);
    if (!sessionVal && this.persistentStorage) {
      const persistentVal = this._getPersistent(stateKey);
      Session.set(sessionKey, persistentVal);
    }
    return Session.get(sessionKey);
  }

  set(stateKey, value) {
    if (this.persistentStorage) this._setPersistent(stateKey, value);
    Session.set(this._sessionKey(stateKey), value);
    return this;
  }
}