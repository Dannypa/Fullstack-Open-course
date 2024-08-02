import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'


describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  const stateBeforeOperations = {good: 3, ok: 5, bad: 143}

  const checkUpdate = (actionName, expected) => {
    const action = {
      type: actionName
    }
    const state = stateBeforeOperations

    deepFreeze(state)
    deepFreeze(stateBeforeOperations)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      ...stateBeforeOperations,
      ...expected
    })
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => checkUpdate('GOOD', {good: stateBeforeOperations.good + 1}))

  test('ok is incremented', () => checkUpdate('OK', {ok: stateBeforeOperations.ok + 1}))

  test('bad is incremented', () => checkUpdate('BAD', {bad: stateBeforeOperations.bad + 1}))

  test('zero resets counters', () => checkUpdate(
      'ZERO', {good: 0, ok: 0, bad:0},
  ))
})