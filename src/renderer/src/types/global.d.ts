import { MessageApi, DialogApi, NotificationApi, LoadingBarApi } from 'naive-ui'

declare global {
  interface Window {
    $message: MessageApi
    $dialog: DialogApi
    $notification: NotificationApi
    $loadingBar: LoadingBarApi
  }
}
