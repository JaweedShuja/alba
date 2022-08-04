import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {navigate} from 'App/Services/NavigationService';
import Strings from 'App/Values/Strings';

const {STUDENT_STACK, CHAT_SCREEN} = Strings.Routes;

export const NotificationService = () => {
  PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      notificationHandler(notification);
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      //console.log('ACTION:', notification.action);
      console.log('onAction');
      //console.log('NOTIFICATION:', notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error('onRegistrationError');
      //console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
};

const notificationHandler = (notification) => {
  if (notification.data.lunchUrl === 'goToChatScreen') {
    navigate(STUDENT_STACK, {
      screen: CHAT_SCREEN,
      params: {
        lastMessage: {
          targetUser: [
            {
              _id: JSON.parse(notification?.data?.targetUserId),
              firstName: notification?.data?.targetUserFirstName,
              image: JSON.parse(notification?.data?.targetUserImage),
            },
          ],
        },
        _id: JSON.parse(notification?.data?.chatId),
        type: '',
        total: +notification?.data?.total,
        backListener: true,
      },
    });
  }
};
