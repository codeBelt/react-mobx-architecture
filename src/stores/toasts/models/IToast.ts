import { ToastStatus } from '../../../constants/ToastStatus';

export default interface IToast {
  readonly type: ToastStatus;
  readonly message: string;
  readonly id: string;
}
