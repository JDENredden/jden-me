---
title: Hello World — deploying a Linode VPS, nginx server,  Let’s Encrypt, and a Ghost
  blog from an iPad Pro
featured: true
date: 2016-10-18 10:58:56
tags:
- sysadmin
- nginx
- linode
- lets-encrypt
- ssl
- how-to
- security
- ghost-tag
- vps
- ipad-pro
---

This post serves as my first post on this new blog as well as a (brief) technical overview of how I got here. On a whim last week I decided to move my website — [jden.me](https://jden.me) — from [NearlyFreeSpeech](https://www.nearlyfreespeech.net) to [Amazon S3](https://aws.amazon.com/s3/). My site is a very basic and only serves static pages, so S3 static hosting is completely sufficient. However, after a mishap transferring files to S3, my site was 404’ing, and after years of hearing [Marco](https://marco.org) read the Linode ad on [ATP](http://atp.fm) I decided to sign up for a [Linode VPS](https://www.linode.com/?r=6aa8bc5235b626de8006b11efa00552814f9c282) and run my own web server. Here I document my decisions (for when I inevitably break it) and overview troubleshooting I needed to do.

For those playing at home I am running static website with a [Ghost blog](https://ghost.org) on a subdomain hosted by a [Linode VPS](https://www.linode.com/?r=6aa8bc5235b626de8006b11efa00552814f9c282) running [Ubuntu](https://www.ubuntu.com/server) 14.04 LTS with [nginx](http://nginx.org) all secured with [Let’s Encrypt](https://letsencrypt.org) certificates (configured on an [iPad Pro](https://www.panic.com/prompt/)). If you want to skip all my commentary and just go straight to the gory detail of how to make it all work, skip to the [Making the pizza](#makingthepizza) section.

## Why Linode? Why a VPS?

Do I really need a VPS? Probably not. Do I want to deal with server maintenance? Probably not. Was I going to get a VPS anyway? You betcha’. The power of podcast ads are not to be overstated, the reason why they relentlessly sponsor the same podcasts every week, is not to instantly create a sale — but rather to provide a company to think of when you need a service. Need a VPS? Linode is there to help. Need a domain? [Hover](https://hover.com/COgRpA0U) is there. Need a bed? [Casper](https://casper.com/mattresses) have your back (pun intended). So when I decided to get a VPS there was no other choice. I did however briefly look around at other options, Linode is very competitive on price and come with high praise from people I trust. I thought about staying in the Amazon ecosystem and using an EC2 instance and S3, ultimately AWS is just too heavy and clunky (and frankly confusing as hell) for the stuff I’d like to do.

I want to learn how to deploy a server, how to run the full stack. At university, I studied [High Performance Computational Physics](http://www.adelaide.edu.au/degree-finder/hschp_hschp.html) and had ssh access to a [Titan](https://www.ersa.edu.au/service/hpc/) supercomputer. I found it very useful and handy to have an always on and always accessible computer. I hope to develop more websites in the future and work on new projects, this is all in the progress of providing fertile soil for those projects.

I chose the basic [2GB plan](https://www.linode.com/?r=6aa8bc5235b626de8006b11efa00552814f9c282), and used an [ATP](https://twitter.com/jden/status/782878124811784192) promo code. I am most familiar with Ubuntu and deployed an Ubuntu image to my VPS. Initially I had an Ubuntu 16.04 image, however have I subsequently had some issues (I don’t know the gory detail, but I feel like some things are different), so I’m running Ubuntu 14.04 LTS.

The Linode [DNS Manager](https://www.linode.com/docs/networking/dns/dns-manager-overview/) is simple and straight forward, my DNS is now hosted there instead of [Route 53](https://aws.amazon.com/route53/).

## To be or not to Apache

In limited experience in web development I have only ever used one kind of web server (I suspect this is true for most people), whether indirectly or directly, has been [Apache](https://httpd.apache.org). For this I had thought no different, but for reasons I cannot fully explain I decided to go with [nginx](http://nginx.org). Probably for similar reasons why I went with Linode over the more institutional AWS. I like in some sense of the word, underdogs. Moreover, I like tools designed with a specific purpose and for them to be lightweight. I don’t for a second claim to understand the nuance between Apache and nginx, but from the executive summary of their website nginx felt like the right fit for me. After configuring the websites, I think I made the right decision, the .config files speak my language.

## That sweet sweet padlock

[Let’s Encrypt](https://letsencrypt.org) is a wonderful organisation that provides an easy to use and auto-renewing SSL certificate authority, that they provide out of the goodness of their hearts (and the hearts of their endearing [sponsors](https://letsencrypt.org/sponsors/)) for free (but you should [donate](https://letsencrypt.org/donate/) to them). I’ve been following their efforts in the periphery of my life on the internet. I never really looked much into adding it to my site, for two reasons; one I did not think it was necessary for what is essentially a splash page, and two I did not know how. It looked far too complex when I realised I needed shell access (because I didn’t have it). But hey now I do, not only do I have shell access I have root access to my server. Let’s Encrypt’s certbot does not have an [auto install](https://certbot.eff.org/#ubuntutrusty-nginx) on nginx servers yet (it’s in beta), so getting it all to work required a little effort. Nothing too difficult, but for a nginx novice like me, I enlisted the help of some online [documentation](https://certbot.eff.org/#ubuntutrusty-nginx). Never the less I now have an auto-renewing SSL certificate with zero downtime. The real difficult part was making it work with a Ghost installation for this blog, which I detail below.

## Ghosts of poetic codes past

With all this digital and tech organisation (procrastinating from doing real work) I took the opportunity to reuse [blog.jden.me](https://blog.jden.me). I have not really had a formal blog in my life. I used (and sometimes still) use [Tumblr](https://tumblr.com) to host a personal blog (it’s basically Taylor Swift gifs), I’ve also used it to host a slew of other blojects (blog-projects, I just invented it) such as; [Nerd Ramblings](http://nerdramblings.tumblr.com), [Thinking Laterally](http://thinkinglaterally.tumblr.com), [One Random Piece of Wisdom at Time](http://onerandompieceofwisdomatatime.tumblr.com), [Stylish Blur](http://stylishblur.tumblr.com), [Music Buff Lyf Stories](http://musicbufflyfstories.tumblr.com), among others. They are rarely updated, only had a modicum of success. I enjoy Tumblr for its in-jokes and community and it has a set of fairly (look up [@staff jokes](https://www.tumblr.com/search/%40staff+get+your+shit+together) on Tumblr) robust blogging tools. However, if I am going to start a long-term blog, I want it to be portable and safe from policy and company changes. We’ve all been burned by a tech company that we rely on being bought out and subsequently not existing anymore.

So I went searching for a blogging platform that I could install on my shiny new (it’s probably not shiny nor new) server. I recall seeing a few of these go by over the years, but I was never in the market for a blogging platform so I sort of just ignored them. I did not want to use [Wordpress](https://wordpress.org), I don’t want to get near Wordpress with a long-stick. Wordpress’ [tagline](https://codex.wordpress.org/WordPress_Philosophy) is ‘Code is Poetry’ but that code is now a big bloated mess of a CMS (that rhymes). Enter [Ghost](https://ghost.org). Ghost is an open source blogging platform built on [node.js](http://nodejs.org). Now, I have no experience with node.js, but I hear it is all the rage with the young kids. I was skeptical about using a young (3 years old) open-source project, but I like their vibe and they have solid commercial arm, in the form of [Ghost(Pro)](https://ghost.org/pricing/) that keeps a steady [revenue stream](https://ghost.baremetrics.com) and an active open-source community that I feel safe using it. Not to mention they display a nice array of large companies using their [not-quite-one-point-O](https://ghost.org/developers/) blogging platform. Node.js is a little funny to install and get used to, but I have it running as a [service now](http://support.ghost.org/deploying-ghost/), and fingers crossed it does not go down and I don’t have to troubleshoot it.

## A post-PC world

I do not have much to say on this except that I decided to do this project on a weekend that I was away from a stable internet connection. Rather than using my MacBook Air on a ([barely better than dial up](http://www.nbnco.com.au)) internet connection I did all of this on my iPad Pro on a 4G connection using Panic’s [Transmit.app](https://www.panic.com/prompt/) sans external keyboard. An exercise in futility that actually was quite enjoyable and enlightening.

## Making the pizza

Now to put it all together. Each one of these individual steps are pretty straightforward to accomplish and all have a slew of tutorials and offical documentation online, but its when you put it all together that you start to have unintended conflicts and your exact configuration becomes harder to troubleshoot because (it feels like) no-one else is trying to do the exact same thing as you (there are, probably many infact). So here I will outline some of the issues I had putting together a static website with a Ghost blog on a subdomain hosted by a Linode VPS running Ubuntu 14.04 LTS with nginx all secured with Lets Encrypt certificates. If that is the set up you are running, you’ve come to the right place. This is not a step-by-step tutorial, there are already plenty of other resources for you to use, and I will assume you already have a ([hardened}(https://www.linode.com/docs/security/securing-your-server)) Ubuntu 14.04 LTS server with nginx installed, and have installed [Ghost](http://support.ghost.org/installing-ghost-linux/) to `/var/www/ghost/`. Also that you have `blog.jden.me` and `jden.me` (replace with your domain obviously, I will use these domain names throughout) pointed to your VPS IP address with A/AAAA DNS records.

Getting node to install on Ubuntu can be a pain, `apt-get install node` installs something else. You will need to run [this](https://nodejs.org/en/download/package-manager/) instead.

```language-bash
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
```

After I got Ghost installed I used an [init](http://support.ghost.org/deploying-ghost/) script to keep npm and Ghost running even after server restart.

Change a few things in `config.js` in the main Ghost directory. Mainly add [email](http://support.ghost.org/mail/) settings and change the production URL to your blog URL.

```language-javascript
production: {
    url: 'https://blog.jden.me',
    mail: {},
    . . .
}
```

Next I created the website directory (and blessed it the appropriate [ownership](https://www.linode.com/docs/websites/nginx/nginx-phpfastcgi-ubuntu-14-04) in `/var/www/` for jden.me In the nginx configuration `/etc/nginx/sites-available/default`, I added the following for Let’s Encrypt.

```language-nginx
server {
	. . .
	location ~ /.well-known {
		allow all;
	}
	. . .
}
```

Be sure to note the root of your website directory, and that the nginx configuration has the correct symbolic link to `/etc/nginx/sites-enabled`.

With [certbot-auto](https://certbot.eff.org/#ubuntutrusty-nginx) installed, I moved it to `/usr/sbin/local` and blessed it with executable.
sudo chmod a+x /usr/local/sbin/certbot-auto
Then run the command and follow the prompts to generate certificates.

```language-bash
certbot-auto certonly --webroot -w /var/www/example -d jden.me -d www.jden.me -w /var/www/ghost -d blog.jden.me
```

You can choose to generate a [Strong Diffie-Hellman Group](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04) for increased security (I did).

After the certificates were enabled I then deleted the `/default` configuration file and made `/etc/nginx/sites-available/jden.me` and `/etc/nginx/sites-available/blog.jden.me` files. You need to tell nginx where and how to handle the certificates

```language-nginx
server {
	listen 443 ssl;

	server_name jden.me www.jden.me;

	ssl_certificate /etc/letsencrypt/live/jden.me/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/jden.me/privkey.pem;
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	ssl_prefer_server_ciphers on;
	ssl_dhparam /etc/ssl/certs/dhparam.pem;
	ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
	ssl_session_timeout 1d;
	ssl_session_cache shared:SSL:50m;
	ssl_stapling on;
	ssl_stapling_verify on;
	add_header Strict-Transport-Security max-age=15768000;
}
```

Finally, redirect all HTTP requests to HTTPS

```language-nginx
server {
	listen 80;
	server_name jden.me www.jden.me;
	return 301 https://$host$request_uri;
}
```

The Ghost configuration is identical (changing `server_name` and directories) except for some extra special sauce to make Ghost play nice. This was the hardest part, because most documentation online does not have Ghost running on a subdomain. The following is added to `/etc/nginx/sites-available/blog.jden.me`

```language-nginx
location / {
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header Host $http_host;
	proxy_set_header X-Forwarded-Proto $scheme;
	proxy_pass http://127.0.0.1:2368;
}
```

Now restart nginx with `sudo service nginx restart` and go checkout [blog.jden.me](https://blog.jden.me) and [jden.me](https://jden.me) with those sweet padlocks.

This post is more for future-self after no-doubt destroying my VPS and having to set it up again, but if it was helpful to you, that is okay too.
