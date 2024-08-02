import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'


describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  const checkUpdate = (actionName, expected, initial=initialState) => {
    const action = {
      type: actionName
    }
    const state = initial

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      ...initialState,
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

  test('good is incremented', () => checkUpdate('GOOD', {good: 1}))

  test('ok is incremented', () => checkUpdate('OK', {ok: 1}))

  test('bad is incremented', () => checkUpdate('BAD', {bad: 1}))

  test('zero resets counters', () => checkUpdate(
      'ZERO', {good: 0, ok: 0, bad:0}, {good: 3, ok: 5, bad: 143}
  ))
})