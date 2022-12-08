import dateFormat from 'dateformat'

export default class Utilities {
  static limitString(text, length = 150, suffix = '...') {
    const tooLong = text.length > length;
    return tooLong ? text.substr(0, length).concat(suffix) : text;
  }

  static railsUrl = 'http://localhost:3000/'

  static urls = {
    getLearnings: () => this.railsUrl + 'learnings',
    getLearning: (id) => this.railsUrl + `learnings/${id}`,
    loggedIn: () => this.railsUrl + 'logged_in'
  }

  static niceDate(date, format = 'dd-mm-yy') {
    return dateFormat(date, format)
  }

  static cardTypes = {
    MAINS: 1,
    RECENTS: 2,
    COMPLETED: 3
  }
}