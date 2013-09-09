# NetKitty

> This is pretty much completely broken right now! node's ftpd has lots of
> unimplemented parts.

Do you occasionally need to transfer files from one computer to another? Is Samba
networking a pain? Is `netcat` kind of fiddly for this sort of thing? Is
`python -m SimpleHTTPServer` annoying because you have like a million files in a
single directory and you
[can't remember what tar flag to use](http://xkcd.com/1168/) or what IP address
the host has?

Enter NetKitty! The ZeroConfig network file copying script.

## System Requirements
### A ZeroConf implementation
* OS X: You're good.
* Windows: iTunes or Bonjour.
* Linux: Avahi

You will also need Node.js.

## Usage

Change to the directory you want to share and run `netkitty serve` then run
`netkitty list` on the computer you want to copy the file to. That will give
you the name and IP address of machines on the LAN running servers.

The default port is 3331 (It looks like `MEW!`, if you squint really hard), but if
that's unavailable, it could be any port. Because Bonjour lets us do that.

You can start multiple servers on the same machine! They'll look like (for example):
`JamesGecko`, `JamesGecko (1)`, `JamesGecko (2)`, etc to other people.

Then you run `netkitty fetch "Server Name Here"`. Everything in the directory
the server is running in will be downloaded to a directory with the same name.

The `netkitty serve` command just starts an FTP server. If you can't install
netkitty on the client, you can always just connect using an FTP client.
