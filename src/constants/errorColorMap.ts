import ToastStatusEnum from './ToastStatusEnum';
import { SemanticCOLORS } from 'semantic-ui-react';

export const errorColorMap: Record<ToastStatusEnum, SemanticCOLORS> = {
  [ToastStatusEnum.Error]: 'red',
  [ToastStatusEnum.Warning]: 'orange',
  [ToastStatusEnum.Success]: 'green',
};
