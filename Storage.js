import AsyncStorage from "@react-native-community/async-storage";

const storeData = async (key, value) => {
    try {
        if (typeof value == 'object' || typeof value == 'string') {
            if (typeof value == 'object') {
                const jsonValue = JSON.stringify(value)
                const save = await AsyncStorage.setItem(key, jsonValue);
                return save;
            } else {
                const save = await AsyncStorage.setItem(key, value);
                return save;
            }
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return e;
    }
}


const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value;
        }
        else {
            return false;
        }
    } catch(e) {
        console.log(e);
        return false;
    }
}

export { storeData, getData };