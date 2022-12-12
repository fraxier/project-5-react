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
    addNote: (learning_id, heading_id) => this.baseUrl + `learnings/${learning_id}/headings/${heading_id}/note/new`,
    getNote: (id) => this.baseUrl + `notes/${id}`
  }

  static railsUrls = {
    getLearnings: () => this.railsBaseUrl + 'learnings',
    getLearning: (id) => this.railsBaseUrl + `learnings/${id}`,
    getHeading: (learning_id, id) => this.railsBaseUrl + `learnings/${learning_id}/headings/${id}`,
    createLearning: () => this.railsUrls.getLearnings(),
    createNote: (learning_id, heading_id) => this.railsBaseUrl + `learnings/${learning_id}/headings/${heading_id}/notes`,
    loggedIn: () => this.railsBaseUrl + 'logged_in',
    megaSummary: () => this.railsBaseUrl + 'mega_summary',
    getTags: () => this.railsBaseUrl + 'tags',
    getNote: (id) => this.railsBaseUrl + `notes/${id}`
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