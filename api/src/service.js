import Service from 'node-windows';

var svc = new Service({
  name:'ApiMaestro',
  description: 'Api para gerenciar AppMaestro',
  script: 'C:\\Users\\Administrator\\Documents\\APIs\\AppMaestro\\src'
});


svc.on('install',function(){
  svc.start();
});

svc.install();