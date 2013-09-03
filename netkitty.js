function main() {
  arg = process.argv[2]
  switch(arg) {
    case 'list':
      list(logList);
      break;
    case 'serve':
      serve();
      break;
    case 'fetch':
      list(fetch, process.argv[3]);
      break;
    case 'help':
    default:
      help();
  }
}

function serve() {
  var portchecker = require('portchecker');
  portchecker.getFirstAvailable(3331, 3351, 'localhost', function(port, h) {
    var ftpd = require('ftp-server');
    ftpd.fsOptions.root = process.cwd();
    ftpd.listen(port);

    var mdns = require('mdns'),
        ad = mdns.createAdvertisement(mdns.tcp('ftp'), port);
    ad.start();
  });
}

function list(callback, callback_args) {
  var mdns = require('mdns')
  var browser = mdns.createBrowser(mdns.tcp('ftp'));
  var services = {}

  browser.on('serviceUp',   function(service) { services[service.name] = service });
  browser.on('serviceDown', function(service) { delete services[service.name]; });
  browser.start();

  setTimeout(function() {
    browser.stop();
    if (typeof callback != 'undefined') { callback(services, callback_args); }
  }, 1000);
}

function logList(services) {
  for (var key in services) {
    s = services[key];
    console.log("'" + s['name'] + '" \t(' + s['addresses'][0] + ':' + s['port'] + ')');
  }
}

function fetch(services, hostname) {
  if (!(hostname in services)) {
    console.log("That service does not exist on the network.");
    return;
  }
  host = services[hostname];
  console.log(services);
  console.log('jsftp'); //TODO
  var jsftp = require("jsftp");
  console.log('jsftp connection'); //TODO
  var ftp = new jsftp({
    host: host.addresses[0],
    port: host.port
  })
  console.log('download everything'); //TODO
  downloadEverything(ftp);
}

function downloadEverything(ftp, root_dir) {
  if (typeof root_dir == 'undefined') { root_dir = '/'; }
  console.log('root_dir', root_dir)
  ftp.ls(root_dir, function(err, res) {
    console.log('in ftp loop');
    res.forEach(function(file) {
      console.log('in file loop');
      console.log(file.name);
    });
  });
}

function help() {
  console.log('Usage: netkitty [list|serve|fetch|help]');
}

main()
