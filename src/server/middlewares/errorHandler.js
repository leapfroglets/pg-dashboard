export function error(err, request, response, next){
  response.status(500).json({
    error:{
      status:'error',
      message: err
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