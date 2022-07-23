/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-26 16:20:42
 * @LastEditors: hzf
 * @LastEditTime: 2022-07-21 19:40:04
 */
const state = reactive({
    count: 0,
  }),
  mutations = {},
  actions = {};

const modules = import.meta.globEager('./modules/*.js'),
  reg = /^\.\/modules\/(.*)\.js$/,
  space = reactive({});

Object.keys(modules).map(k => {
  space[k.replace(reg, '$1')] = modules[k].default;
});

function get(key) {
  const arr = key.split('/');
  if (arr.length == 1) {
    return $deepCopy(state[key]);
  } else {
    return $deepCopy(space[arr[0]].state[arr[1]]);
  }
}
function set(key, value) {
  const arr = key.split('/'), _value = $deepCopy(value);
  if (arr.length == 1) {
    state[key] = _value;
  } else {
    space[arr[0]].state[arr[1]] = _value;
  }
}
function commit(name, value) {
  const arr = name.split('/'), _value = $deepCopy(value),
    namespace = space[arr[0]],
    result = arr.length == 1 ? mutations[name]({ state, commit }, _value)
      : namespace.mutations[arr[1]]({
        state: namespace.state,
        commit: (_name, _value) => commit(`${ arr[0] }/${ _name }`, _value),
      }, _value);
  return $deepCopy(result);
}
async function dispatch(name, value) {
  const arr = name.split('/'), _value = $deepCopy(value),
    namespace = space[arr[0]],
    result = arr.length == 1 ? await actions[name]({ state, commit }, _value)
      : await namespace.actions[arr[1]]({
        state: namespace.state,
        commit: (_name, _value) => commit(`${ arr[0] }/${ _name }`, _value),
        dispatch: async(_name, _value) => await dispatch(`${ arr[0] }/${ _name }`, _value),
      }, _value);
  return $deepCopy(result);
}

export default {
  get,
  set,
  commit,
  dispatch,
};
