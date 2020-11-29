// import $t from '../../../../../locale'

export default function getState (state: string) {
  if (state === 'Confirmed') {
    return '已确认';
  }

  return state;
}
