

export default class Utilities {
  static limitString(text, length = 150, suffix = '...') {
    const tooLong = text.length > length;
    return tooLong ? text.substr(0, length).concat(suffix) : text;
  }

  static niceDate(date) {
    return date
  }

  static cardTypes = {
    MAINS: 1,
    RECENTS: 2,
    COMPLETED: 3
  }
}