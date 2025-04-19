---
title: Buy me a ☕ Button (made with ❤️)
date: 2017-04-26 12:51:04
tags:
- buy-me-a-coffee
- design
- web-design
- web-dev
- web
- buy-me-a-beer
- emoji
- made-with-love
- brand-south-australia
- south-australia
- adelaide
- button
- how-to
- donorbox
- stripe
- ko-fi
---

A trend thats popping up on websites these days is the _"Buy me a Coffee ☕"_ in the footer of websites. It's basically the Web-hipster.0 (that was a Web 1.0/2.0/3.0 joke, if that wasn't clear) version of the _Donate_ button. Kind of like how everyone all of a sudden had _"Made in [city] with ❤️"_. Naturally I wanted both of these on my new website.

## Buy me a ☕

There is of-course a start-up that provides this button as a service, with an equally start-upie name, [Ko-Fi](https://ko-fi.com). The button looks like this,

<a href='https://ko-fi.com/A67812DX' target='_blank'><img height='36' style='border:0px;height:36px;text-align:center;' src='https://az743702.vo.msecnd.net/cdn/kofi2.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

It's pretty nice and appropriately Web 3.0 looking. However, I have issues with it. It's just a link to a website, and the website has allot going on.

![Screenshot of Ko-Fi profile](/content/images/2017/04/Screen-Shot-2017-04-26-at-8.50.03-pm.png)

Like, I'm not sure why there is an option to add comments as if it was a Facebook wall. Being an external link it's jarring and reduces any incentive for me to give money. I was hoping the website would be a super minimal and just a simple form to donate a few bucks. It also uses PayPal as its payment platform, and if I can avoid it I don't want to ever use PayPal again. Then it dawned on me, I was hoping it was a [Stripe](https://stripe.com) dialogue (click the button).

<form action="/your-server-side-code" method="POST" style="text-align: center;">
  <script
    src="https://checkout.stripe.com/checkout.js" class="stripe-button"
    data-key="pk_test_yK0YgEOqEQ3PijUMpSinwpKl"
    data-amount="999"
    data-name="Test Dialogue"
    data-description="The Gospel According to jden"
    data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
    data-locale="auto"
    data-currency="aud">
  </script>
</form>
<br>

This is really what I wanted when you click the "Buy Me a Coffee" button. So I looked into adding Stripe to my website, while it is pretty easy it's not as easy as it is to add say a PayPal button. There is some server-side code required and the Stripe documentation is more targeted to making an e-commence platform, I just want to take one-time payment and not store customer details. And honestly, I didn't want to add cognitive load I have to implement Stripe on my server. I will eventually probably make this button but for now I wanted a service to do this for me.

I started looking for Stripe-based-buy-me-a-coffee buttons, but sadly they don't exist. There was a few out-of-date Wordpress plugins. Instead I looked for Stripe-based donation buttons that I could adapt into a button. Eventually I found [DonorBox](https://donorbox.org/), a service designed for non-for-profits to accept donations. It ticks the right boxes, Stripe integration and has a lightbox style pop-up for donations—rather than an external link.

<script src="https://donorbox.org/widget.js" type="text/javascript"></script><iframe src="https://donorbox.org/embed/themaths-blog-buy-me-a-beer" height="685px" width="100%" style="max-width:500px; min-width:310px; margin: 0 auto; max-height:none!important" seamless="seamless" id="dbox-form-embed" name="donorbox" frameborder="0" scrolling="no"></iframe>

I've added a "Buy me a Beer 🍺" option as well, because that seems to be the new trend as well. All of the prices are in multiples of π. There is an element of customisation available for the box, I made it black and white and added emoji to the descriptions. I like it, it works well for minimal effort and is free to use until get over $999 a month in donations, which I don't see happening anytime soon (if ever).

## Made with ❤️

I also wanted to add a "Made in Adelaide with ❤️" thing to my footer. There is a nice website that makes some code for you called [MadeWithLove](http://madewithlove.in/grab-a-label/)

> Made with &hearts; in <a href="http://madewithlove.in/Adelaide/">Adelaide</a>

I wanted to make a custom one. Where I live—South Australia—has a new brand that I quite like, it's called imaginatively _[Brand South Australia](http://www.brandsouthaustralia.com.au)_. I have used their logo in many of my other projects such as posters and marketing collateral adding a small logo on a website is the next natural progression.

A little nosing around the website I found the favicon. What a nice little logo our state has.
![Brand South Australia](https://www.brandsouthaustralia.com.au/favicon-32x32.png)

Finally putting it all together we have.

> Made in <a href="http://southaustralia.com"><img src="https://www.brandsouthaustralia.com.au/favicon-32x32.png" style="-webkit-transform: translateX(0); -ms-transform: translateX(0); transform: translateX(0);display: inline-block; padding: 0; left: 0; height: 1.5em; margin-bottom: -0.25em;"></a> by <a href="http://jden.me">jden redden</a> with ❤️.

And this is what it looks like on [TheMaths.Blog](https://themaths.blog).

![TheMaths.Blog footer](/content/images/2017/04/Screen-Shot-2017-04-26-at-10.08.42-pm.png)
