export default class Routes {
  io
  constructor(){ }

  setSocketInstance(io){
    this.io = io
  }

  hendler(request, response){
    response.end('Hello World')
  }
}