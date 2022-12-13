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
    learnings: () => this.baseUrl + 'learnings',
    heading: (id) => this.baseUrl + `headings/${id}`,
    addNote: (heading_id) => this.baseUrl + `headings/${heading_id}/note/new`,
    getNote: (id) => this.baseUrl + `notes/${id}`
  }

  static railsUrls = {
    getLearnings: () => this.railsBaseUrl + 'learnings',
    getLearning: (id) => this.railsBaseUrl + `learnings/${id}`,
    getHeading: (id) => this.railsBaseUrl + `/headings/${id}`,
    createLearning: () => this.railsUrls.getLearnings(),
    createHeading: () => this.railsBaseUrl + '/headings',
    createNote: () => this.railsBaseUrl + `notes`,
    loggedIn: () => this.railsBaseUrl + 'logged_in',
    megaSummary: () => this.railsBaseUrl + 'mega_summary',
    getTags: () => this.railsBaseUrl + 'tags',
    getNote: (id) => this.railsBaseUrl + `notes/${id}`
  }

  static niceDate(date, format = 'dddd/mm/yy') {
    return dateFormat(date, format)
  }
  static niceDateTime(date) {
    return this.niceDate(date, 'dd/mm/yy @ h:MM:ss TT')
  }

  static cardTypes = {
    MAINS: 1,
    RECENTS: 2,
    COMPLETED: 3
  }
}