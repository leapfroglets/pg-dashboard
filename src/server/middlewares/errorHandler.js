export function error(err, request, response, next){
  response.status(err.status).json({
    error:{
      status:'error',
      message: err.message
    }
  });
}

export function notFound(request, response, next){
  response.status(404).json({
    error:{
      code:"NOT_FOUND",
      message: "Page not found."
    }
  });
}