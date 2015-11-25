import environment from '../environment';


export function allow (req, res, next) {
  var domains = environment.config.allowedDomains;
  if (domains && domains.indexOf(req.headers.origin) != -1) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'content-type, x-requested-with, authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
}


export function handleOptions (req, res) {
  var domains = environment.config.allowedDomains;
  if (domains && domains.indexOf(req.headers.origin) != -1) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  }
  res.status(200).end();
}
