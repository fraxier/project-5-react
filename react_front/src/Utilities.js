import dateFormat from 'dateformat'

export default class Utilities {
  static limitString(text, length = 150, suffix = '...') {
    const tooLong = text.length > length;
    return tooLong ? text.substr(0, length).concat(suffix) : text;
  }

  static railsBaseUrl = 'http://localhost:3000/'
  static baseUrl = 'http://localhost:3001/'

  static urls = {
    learning: (id) => this.baseUrl + `learnings/${id}`,
    learnings: () => this.baseUrl + 'learnings'
  }

  static railsUrls = {
    getLearnings: () => this.railsBaseUrl + 'learnings',
    getLearning: (id) => this.railsBaseUrl + `learnings/${id}`,
    createLearning: () => this.railsUrls.getLearnings(),
    loggedIn: () => this.railsBaseUrl + 'logged_in',
    megaSummary: () => this.railsBaseUrl + 'mega_summary',
    getTags: () => this.railsBaseUrl + 'tags'
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