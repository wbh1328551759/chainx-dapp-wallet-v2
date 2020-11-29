// import $t from '../../../../../locale'

export default function (txstate: any) {
  switch (txstate) {
    case 'NormalCancel':
      return '已取消';
    case 'Applying':
      return '申请中';
    case 'Confirmed':
      return '已确认';
    case 'Signing':
      return '签名中';
    default:
      return txstate;
  }
}
