/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import {AppRegistry} from 'react-native';
import App from './App';
import Chatbot from './ChatBot';
import DisressBroadcast from './DistressBroadcast';
import Broadcasting from './Broadcasting';
import TTS from './TTS';
import VoiceRecognition from './VoiceRecognition';
import PopUp from './PopUp';
import Icons from './Icons';
import Map from './Map';
import Notifications from './Notifications';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent('WelcomeScreen', () => App);
Navigation.registerComponent('Chatbot', () => Chatbot);
Navigation.registerComponent('DisressBroadcast', () => DisressBroadcast);
Navigation.registerComponent('Broadcasting', () => Broadcasting);
Navigation.registerComponent('TTS', () => TTS);
Navigation.registerComponent('VoiceRecognition', () => VoiceRecognition);
Navigation.registerComponent('PopUp', () => PopUp);
Navigation.registerComponent('Icons', () => Icons);
Navigation.registerComponent('Map', () => Map);
Navigation.registerComponent('Notifications', () => Notifications);

Navigation.setDefaultOptions({
    statusBar: {
        backgroundColor: '#000'
    },
    topBar: {
      visible: false,
      height: 0,
    },
    bottomTab: {
        visible: false,
        height: 0,
    }
});

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'WelcomeScreen'
                        }
                    }  
                ]
            }
        }
    });
});



// Navigation.events().registerAppLaunchedListener(async () => {
//     Navigation.setRoot({
//       root: {
//         bottomTabs: {
//           children: [
//             {
//               stack: {
//                 children: [
//                   {
//                     component: {
//                       name: 'WelcomeScreen'
//                     }
//                   },
//                 ]
//               }
//             },
//             {
//               stack: {
//                 children: [
//                   {
//                     component: {
//                       name: 'Chatbot'
//                     }
//                   }
//                 ]
//               }
//             },
//             {
//               stack: {
//                 children: [
//                   {
//                     component: {
//                       name: 'DisressBroadcast'
//                     }
//                   }
//                 ]
//               }
//             }
//           ]
//         }
//       }
//     });
//   });

// App.options = {
//     topBar: {
//         title: {
//             text: 'Home',
//             color: '#000'
//         },
//         background: {
//             color: '#FFF'
//         }
//     },
//     // bottomTab: {
//     //   text: 'Home'
//     // }
// }

// Chatbot.options = {
//     topBar: {
//         title: {
//             text: 'Chatbot',
//             color: 'white'
//         },
//         background: {
//             color: '#5579f1'
//         }
//     },
//     bottomTab: {
//       text: 'Chatbot'
//     }
// }

// TTS.options = {
//     topBar: {
//         title: {
//             text: 'TTS',
//             color: 'white'
//         },
//         background: {
//             color: '#5579f1'
//         }
//     }
// }

// DisressBroadcast.options = {
//     topBar: {
//         title: {
//             text: 'Disress Broadcast',
//             color: 'white'
//         },
//         background: {
//             color: '#5579f1'
//         }
//     },
//     bottomTab: {
//       text: 'Disress Broadcast'
//     }
// }