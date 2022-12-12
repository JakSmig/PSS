import { message } from 'antd';

const openNotification = (text: string) => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  message.success(text, 5);
};

const openErrorNotification = (text: string) => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  message.error(text, 5);
};

export { openErrorNotification, openNotification };
