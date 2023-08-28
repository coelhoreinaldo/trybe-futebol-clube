const HTTP_PROTOCOLS: Record<string, number> = {
  successful: 200,
  invalidData: 400,
  notFound: 404,
  conflict: 409,
  unauthorized: 401,
  unprocessableEntity: 422,
};

const mapStatusHTTP = (status:string) => HTTP_PROTOCOLS[status];

export default mapStatusHTTP;
