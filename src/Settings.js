const context = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))

export default class Settings {
  static getSetting (settingKey, defaultValue) {
    if (localStorage) {
      try {
        var setting = localStorage.getItem(context + settingKey)
        return setting ? JSON.parse(setting) : defaultValue
      } catch (e) {
        console.log('ERROR in getSetting - please check the integrity of your localStorage', e)
        return defaultValue
      }
    } else {
      return defaultValue
    }
  }

  static saveSetting (settingKey, value) {
    if (localStorage) {
      try {
        localStorage.setItem(context + settingKey, JSON.stringify(value))
      } catch (e) {
        console.log('ERROR in saveSetting - please check the integrity of your localStorage', e)
      }
    }
  }

  static clearSetting (settingKey) {
    if (localStorage) {
      try {
        localStorage.removeItem(context + settingKey)
      } catch (e) {
        console.log('ERROR in clear setting', e)
      }
    }
  }
}
