---
title: Dynamically numbered headings with CSS
date: 2017-04-26 09:14:58
tags:
- css
- web
- web-dev
- web-design
- latex
- how-to
- numbered
- mathematics
- maths
- theorem
---

When designing this maths blog I wanted it to have the look and feel of a real academic mathematics paper. I have talked previously about the standardised use of [LaTeX]() in maths and how to include literal mathematical expressions on a website, but what about the rest of the paper? MathJax does not typeset anything outside the maths mode delimiters `\( ... \)`, LaTeX is much more than just maths.

I wanted to have numbered headings, numbered theorems, lemmas, definitions etc. This is something LaTeX does automatically for you. You could of course name the headings and theorems manually, but what happens when you need to make structural changes to your document? Or if you have to break a theorem into two lemmas? You then have to go back and re-number everything in your document. I went searching for a LaTeX layout equivalent online and didn't find anything. So let's take a look on how we can do this with CSS.

## Let's do it

I wanted to impose some requirements to make it feel like writing in LaTeX, below are elements required for a minimum viable product.

- Automatically number headings at least 3 levels deep
- Optionally have the headers un-numbered.
- Automatically number theorems, lemmas, definitions, and similar in a continuous counter under 'Section' headings.
- Optionally have the theorems, lemmas, definitions, and similar un-numbered.
- Only use CSS and no Javascript.
- Not require `<ul>` or `<or>`.
- Follow the style and layout of `amsart` in LaTeX.

## CSS Counters

Since CSS3 there has been these things called CSS counters they're basically a way to programmatically make custom ordered lists except without `<ol>`, but you can use it to override `<ol>` as well.

Pulling from the W3Schools [website](https://www.w3schools.com/css/css_counters.asp), to work with CSS counters we will use the following properties:

- `counter-reset` - Creates or resets a counter
- `counter-increment` - Increments a counter value
- `content` - Inserts generated content
- `counter()` or `counters()` function - Adds the value of a counter to an element

I've decided to have everything default to being un-numbered and only when you add the class `numbered` to the element do you get numbers. For simplicity I have the same class name `numbered` for everything that can be numbered. Which will add some complexity to the code, but will result in simplicity over time when writing.

`<h1>` is reserved for the page title, so we start with `<h2>` which serves as a LaTeX 'Section', with `<h3>` a 'Sub-section', and `<h4>` a Sub-sub-section. With numbering as follows:

    1. Section
    1.1. Sub-section
    1.1.1 Sub-sub-section

To do this we have three counters that we name `h1`, `h2`, and `h3` and reset the `h2` counter in the body and reset the rest in a nested fashion. The basic code is:

```language-css
body {
	counter-reset: h2;
}

h2.numbered {
	counter-reset: h3;
}

h3.numbered {
	counter-reset: h4;
}

h2.numbered:before {
	counter-increment: h2;
        content: counter(h2) ".\002002";
}

h3.numbered:before {
	counter-increment: h3;
        content: counter(h2) "." counter(h3) ".\002002";
	font-weight: normal;
}

h4.numbered:before {
	counter-increment: h4;
        content: counter(h2) "." counter(h3) "." counter(h4) ".\002002";
	font-style: normal;
}
```

We are using the white-space character of a en-dash to be semantically correct, which in CSS encoding is `\002002`.

The usage of this in the HTML would be:

```language-html
<h2 class="numbered">This is a numbered section</h2>
<h3 class="numbered">This is a numbered sub-section</h3>
<h3>This is an un-numbered sub-section</h3>
<h4 class="numbered">This is a numbered sub-sub-section</h4>
```

which renders like:
{% image "/img/2017/04/Screen-Shot-2017-04-26-at-8.31.56-pm.png", "Dynamically numbered headings example" %}

For completeness the LaTeX style CSS for headers is:

```language-css
h2, h3, h4 {
    font-family: "Computer Modern Serif", serif;
	font-size: 12pt;
	font-weight: normal;
	margin: 0.5em 0;
}

h2 {
	font-variant: small-caps;
	text-align: center;
	font-weight: normal;
}

h3 {
	font-weight: bold;
}

h4 {
	font-style: italic;
}
```

In a later post I will describe how we do the same but with theorems and lemmas.
