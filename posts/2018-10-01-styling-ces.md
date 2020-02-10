---
author:
  name: "Patrick O'Brien"
date: 2018-10-01
title: Styling Custom Elements
tags:
  - post
  - webcomponents
  - frontend
summary: "Custom CSS properties + Shadow DOM = <3"
---

<script src="/js/2018-10-01-styling-ces/ces.js"></script>

In a previous post, I laid out some of the basics of custom elements. If you didn't get a chance to read it and don't really understand custom elements, I'd recommend checking it out first before continuing on: [Making the Case for Custom Elements]({{< ref "./2018-09-04-ces.md" >}}). It's a quick read, and helps set the foundation for this post.

**Note:** For the demos to function, it's highly recommended you run this in a [browser that currently supports custom elements](https://caniuse.com/#feat=custom-elementsv1).

## Terminology

_You can skip this if you already know some of the basics of custom elements_

- Light DOM: The DOM your web application can manipulate (essentially all the HTML your app owns)
- Shadow DOM: The DOM within a custom element that is "protected" (so your web app cannot easily manipulate this code without some hooks)
- Slot (and slotted content): When defining a custom element's template, you can optionally provide slots to indicate where inner html will go (e.g. `<my-element><div>I will go into a slot</div></my-element>`)

## Styling the element

First, let's set up our custom element, `<foo-bar>`.

```javascript
const template = document.createElement("template");
template.innerHTML = `
    <style>
      :host {
        display: inline-block;
        margin: 0 auto;
        box-shadow: 0 0 10px rgba(128, 100, 38, 0.34);
        border-radius: 8px;
        border: 2px dashed;
        border-color: hotpink;
      }

      span {
          color: black;
          font-family: "Comic Sans MS", cursive, sans-serif;
      }
    </style>
    <span>Hello, world!</span>
    <slot></slot>
`;

class FooBarElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("foo-bar", FooBarElement);
```

<div style="border: 1px solid gray;height: 150px;display:flex;align-items:center;margin-bottom:20px;background-color:gray;">
	<foo-bar1><div>I'm the slot</div></foo-bar1>
</div>

Now, this is a pretty basic element. And rather ugly at that. I want it to have a background color! And I want the text to be a different color. And what sick freak uses Comic Sans?! That has GOT to go.

```css
<style>
    foo-bar {
        font-family: 'Open Sans';
        color: white;
        background-color: hotpink;
    }
</style>
```

<style>
    .foo-bar-class {
        font-family: 'Open Sans';
        color: white;
        background-color: hotpink;
    }
</style>
<div style="border: 1px solid gray;height: 150px;display:flex;align-items:center;margin-bottom:20px;background-color:gray;">
	<foo-bar1 class="foo-bar-class"><div>I'm the slot</div></foo-bar1>
</div>

What? Why is it still using Comic Sans?  
Thanks to the magic of Shadow DOM, the creator of foo-bar has full control over the inner styles of the element; I can only style the "light DOM" (or the HTML that I myself wrote). So that's why I can apply a background color to foo-bar, but can't change the inner span's font.  
But never fear, custom CSS properties are here!

## Custom CSS properties

First, an example:

```css
:host {
  /* ... */
  border-color: var(--foo-bar-border-color, hotpink);
}
```

Say hello to `var()`! With this new addition to the CSS spec, you can now define your own CSS properties. Have you ever seen vendor prefix properties (e.g. `-moz-box-flex`)? Browser vendors have been doing similar things for years. Now, with the magic of custom CSS properties, you can too!

In the above snippet, we're using our handy-dandy `:host { }` selector to define our border-color, but this time, instead of just setting it to `hotpink`, we're supporting a CSS property of `--foo-bar-border-color`. Now, if a consumer defines this property, our custom element will use that value. If it's not defined, however, we'll fallback to `hotpink`.

So what does this look like if we want to define it?

```html
<head>
  <style>
    :root {
      --foo-bar-border-color: lavender;
    }
    .green-foo-bar {
      --foo-bar-border-color: limegreen; // the cascading nature of CSS will even work as expected!
    }
  </style>
</head>
<!-- ... -->
```

Now, I know what you're thinking. This is a pretty contrived example; we could have simply done `.some-foo-bar-class { border-color: purple; }` and achieved similar results. But, what if we wanted to style something in the ShadowDOM?

## Styling the ShadowDOM

Without further ado, here's what our example would look like if we had some semblance of sanity and wanted to allow something other than Comic Sans:

```javascript
const template = document.createElement("template");
template.innerHTML = `<style>
  :host {
    display: inline-block;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(128, 100, 38, .34);
    border-radius: 8px;
    border: 2px dashed;
    border-color: hotpink
  }

  span {
    color: black;
    font-family: var(--foo-bar-span-font, "Comic Sans MS", cursive, sans-serif)
  }
</style><span>Hello,world!</span>
<slot></slot>`;

class FooBarElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("foo-bar", FooBarElement);
```

```html
<style>
  :root {
    --foo-bar-span-font: "Open Sans";
  }

  foo-bar {
    font-family: "Open Sans";
    color: white;
    background-color: hotpink;
  }
</style>
```

<style>
    :root {
        --foo-bar-span-font: 'Open Sans';
    }
    
    foo-bar2 {
        font-family: 'Open Sans';
        color: white;
        background-color: hotpink;
    }
</style>
<div style="border: 1px solid gray;height: 150px;display:flex;align-items:center;margin-bottom:20px;background-color:gray;">
    <foo-bar2><div>I'm the slot</div><p>I'm the slotted paragraph element!</p></foo-bar2>
</div>
Woo! We did it; no more pesky Comic Sans! But... can I style the LightDOM from the custom element? Why yes, curious reader, you can!

## Styling the slot

The final part of this post is to help you style your custom elements when used with slotted content. Maybe you have a multi-component element (like a table) that should render its inner HTML slightly differently based on what's passed in. With this next addition to CSS, you'll be able to do just that (with one caveat).

Introducing `::slotted()`. With this bad boy, we can now target an element that is passed in to the slot of the element. This is a selector, and requires the parentheses. Inside those parentheses, you can pass any selector you want, but you can ONLY select a parent level element in the slot. Once you get to a child element, the custom element can no longer see it. So `::slotted(div)` will match our above examples perfectly; `::slotted(button)`, however, will not match the button in the following HTML:

```html
<foo-bar>
  <div>
    I'm visible to foo-bar!
    <button>I'm invisible to foo-bar!</button>
  </div>
</foo-bar>
```

And, here's our final demo:

```javascript
const template = document.createElement("template");
template.innerHTML =
  '<style>:host{display:inline-block;margin:0 auto;box-shadow:0 0 10px rgba(128,100,38,.34);border-radius:8px;border:2px dashed;border-color:hotpink}span{color:black;font-family:var(--foo-bar-span-font,"Comic Sans MS",cursive,sans-serif)}::slotted(p){background-color:purple;color:white!important}</style><span>Hello,world!</span><slot></slot>';

class FooBarElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("foo-bar", FooBarElement);
```

<style>
    :root {
        --foo-bar-span-font: 'Open Sans';
    }
    
    foo-bar2 {
        font-family: 'Open Sans';
        color: white;
        background-color: hotpink;
    }
</style>
<div style="border: 1px solid gray;height: 150px;display:flex;align-items:center;margin-bottom:20px;background-color:gray;">
    <foo-bar3><div>I'm the slot</div><p>I'm the slotted paragraph element!</p></foo-bar3>
</div>

And that's it! That's the basics of styling your custom elements.

## Extra reading

- MDN custom CSS properties: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- MDN ::slotted() selector: https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted
- ShadyCSS (ShadowDOM + CSS polyfill for IE11): https://github.com/webcomponents/shadycss
