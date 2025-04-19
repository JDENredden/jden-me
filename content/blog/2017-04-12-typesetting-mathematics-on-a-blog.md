---
title: Typesetting mathematics on a blog
date: 2017-04-12 12:59:43
tags:
- maths
- mathematics
- latex
- typesetting
- maths-blog
- themaths-blog
- lametex
- plain-text
---

One thing every maths major will eventually learn is the importance of LaTeX—a mathematics type setting language. LaTeX lets you write your maths papers in plain text and then have it compiled into a beautifully typeset document.

Typesetting turns out to be a pretty complex problem to solve and is quite computationally expensive for what we think is quite simple. For years customers would complain about the typesetting in Amazon's Kindles before they re-wrote the typesetting engine in 2015.

LaTeX does not exist on the web, however there are a few other ways of writing maths on the internet.

### Plain Text

The simplest and easiest way to communicate mathematics on the internet is just using plain text. It makes for very verbose reading and is a bit of an eyesore. The following are examples of maths written with plain text.

- `sin(x)`
- `x = -b +- sqrt(b^2 - 4ac) / 2a`
- `f'(x) = lim h -> 0 ( f(x + h) - f(x) ) / h`
- `int 0 to pi/2 1/x dx = DNE`
- `[a, b) = {x in R : a <= x < b}`
- `forall n in N : n^2 > n`
- `I = [ 1, 0; 0, 1 ]`
- `sum i from 0 to n = n(n + 1)/2`
- `x + 5 = y + 2 <=> x + 3 = y`

For the most part it makes for machine readable formulae which you can write into Wolfram Alpha and Matlab, its also the the quickest way to write something down and send it to a college or a friend.

### LaMeTeX

This is a term that I have coined—it's basically an enhanced version of plain text. It is still plain text but it uses some of the symbols that are not commonly available. A whole slew of mathematics based symbols are included in the Unicode specification such as; superscripts, subscripts, integrals, plus-and-minus, constants, and a whole lot more. I went through the [Wikipedia](http://www.wikiwand.com/en/List_of_mathematical_symbols) page and added [TextExpander](https://smilesoftware.com/TextExpander) snippets for common maths symbols.

- `sin(x)`
- `x = -b ± √(b² - 4ac) / 2a`
- `f'(x) = lim h → 0 ( f(x + h) - f(x) ) / h`
- `∫ 0 to π/2 1/x dx = DNE`
- `[a, b) = {x ∈ ℝ : a ≤ x < b}`
- `∀ n ∈ ℕ : n² > n`
- `I = [ 1, 0; 0, 1 ]`
- `∑ i from 0 to n = n(n + 1)/2`
- `x + 5 = y + 2 ⇔ x + 3 = y`

You can see it slightly enhances the readability of the maths and is just as portable, every major OS has a typeface that supports these symbols and they work on webpages that don't or can't have javascript.

### LaTeX

The gold-standard when it comes to writing maths. When learning LaTeX it can look pretty crazy, but its so widely used and widely accepted that it is my preferred way of communicating maths even when its not compiled. For example, when talking to university friends we would write LaTeX over text message because it's objective and everyone understands what is being said. For the examples below we will be using LaTeX with the [`amsmath`](http://www.ams.org/publications/authors/tex/amslatex) package installed, which extends LaTeX with useful mathematical constructs.

- `\sin(x)`
- `x = -b \pm \frac{ \sqrt(b^2 - 4ac) }{2a}`
- `f'(x) = \lim_{ h \to 0 } \frac{ f(x + h) - f(x) }{h}`
- `\int_0^{ \frac{π}{2} } \frac{1}{x} dx = DNE`
- `[a, b) = \{ x \in \mathbb{R} : a \le x < b \}`
- `\forall n \in \mathbb{N} : n^2 > n`
- `I = \begin{bmatrix}
        1 & 0 \\
        0 & 1
       \end{bmatrix}`
- `\sum_0^n i = \frac{ n(n + 1) }{2}`
- `x + 5 = y + 2 \Leftrightarrow x + 3 = y`

### MathJax

[MathJax](https://www.mathjax.org) is a javascript framework that will actually typeset LaTeX input and use CSS and custom fonts to display it on webpages. For the most part you can take unmodified LaTeX code and add this snippet `<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML'></script>` and you have beautifully typeset maths on your website. The only modification you may need to do is double escape LaTeX commands—`\\{` is required for `\{`—and use `\(...\)` instead of `$...$`.

- \\[ \sin(x) \\]
- \\[ x = -b \pm \frac{ \sqrt(b^2 - 4ac) }{2a} \\]
- \\[ f'(x) = \lim_{ h \to 0 } \frac{ f(x + h) - f(x) }{h} \\]
- \\[ \int_0^{ \frac{π}{2} } \frac{1}{x} dx = DNE \\]
- \\[ [a, b) = \\{ x \in \mathbb{R} : a \le x < b \\} \\]
- \\[ \forall n \in \mathbb{N} : n^2 > n \\]
- \\[ I = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} \\]
- \\[ \sum_0^n i = \frac{ n(n + 1) }{2} \\]
- \\[ x + 5 = y + 2 \Leftrightarrow x + 3 = y \\]

### MathML

Finally, [MathML](https://www.w3.org/Math/)—meaning Maths Markup Language—is the W3C's standard for maths on the web. It is very cumbersome to use and would not like to write directly to MathML, rather I would write in LaTeX and then convert to MathML for publication. It does come with the advantage of being a web standard and does not require a javascript framework, it's supported in all major browsers. I won't include all of the of the examples, below is what is required to write \\(sin(x)\\).

    <math xmlns="http://www.w3.org/1998/Math/MathML">
    <mtable class="m-equation-square" displaystyle="true" style="display: block; margin-top: 1.0em; margin-bottom: 2.0em">
    	<mtr>
    		<mtd>
    			<mspace width="6.0em" />
    		</mtd>
    		<mtd columnalign="left">
    			<mi>sin</mi>
    			<mrow>
    				<mo form="prefix">(</mo>
    				<mi>x</mi>
    				<mo form="postfix">)</mo>
    			</mrow>
    		</mtd>
    	</mtr>
    </mtable>
    </math>

For this project I will be using MathJax, the ability to write (almost) standard LaTeX directly into blog posts and have it typeset and render with no work is easily the best way to have maths on your blog.
