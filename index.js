/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import {AppRegistry} from 'react-native';
// import AsyncStorage from "@react-native-community/async-storage";
// import Storage from './Storage';


import App from './App';
import Onboarding from "./Onboarding";
import Chatbot from './ChatBot';
import DisressBroadcast from './DistressBroadcast';
import Broadcasting from './Broadcasting';
import TTS from './TTS';
import VoiceRecognition from './VoiceRecognition';
import PopUp from './PopUp';
import Icons from './Icons';
import Map from './Map';
import Notifications from './Notifications';
import Weather from "./Weather";
import WeatherDetails from "./WeatherDetails";
import Profile from "./Profile";

// Headless Scripts
import WatchLocation from "./Headless/WatchLocation";

// Storage
import { getData } from "./Storage";

// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent('Onboarding', () => Onboarding);
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
Navigation.registerComponent('Weather', () => Weather);
Navigation.registerComponent('WeatherDetails', () => WeatherDetails);
Navigation.registerComponent('Profile', () => Profile);

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

let user = {};

const getUserData = getData('@userData');

if (typeof getUserData == "string") {
    user = JSON.parse(getUserData);
}

Navigation.events().registerAppLaunchedListener(() => {
    if (user.signedIn) {
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
    }
    else {
        Navigation.setRoot({
            root: {
                stack: {
                    children: [
                        {
                            component: {
                                name: 'Onboarding'
                            }
                        }  
                    ]
                }
            }
        });
    }
});


AppRegistry.registerHeadlessTask('WatchLocation', () => WatchLocation);

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