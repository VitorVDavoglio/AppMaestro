// var Service = require('node-windows').Service;
import Service from 'node-windows';

// Create a new service object
var svc = new Service({
  name:'ApiMaestro',
  description: 'Api para gerenciar AppMaestro',
  script: 'C:\\Users\\Administrator\\Documents\\APIs\\AppMaestro\\src'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();