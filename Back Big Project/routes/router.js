class Router {
    constructor() {
      this.routes = {};
    }
  
 
    addRouter(path, handler, isExtractedID = false) {
      this.routes[path] = { handler, isExtractedID };
    }
  
    handleRoute(req, res) {
      const { url } = req;
      let splitterUrl = url;
      if(this.isParameterPath(url)) {
          splitterUrl = this.getBasePath(url)
      }
  
      const route = this.routes[splitterUrl]
  
      if(!route) return false;
  
      const {handler, isExtractedID} = route
      const id = isExtractedID ? this.extractUrl(url): null
  
      handler(req, res, id)
      return true
    }
  
    isParameterPath(url) {
      const lastPartOfUrl = url.split("/").pop();
      return !isNaN(+lastPartOfUrl);
    }
  
    getBasePath(url) {
      const splitterUrl = url.split("/")
      splitterUrl.pop()
      return `${splitterUrl.join("/")}/`
    }
  
    extractUrl(url) {
      return +(url.split("/").pop())  // 3
    }
  
  }
  
  
  module.exports = Router