---
title: Writing My Blog Site From "Scratch"
date: 2020-03-05T15:08:09.885Z
summary: >-
  Going from a blogging CMS to my own JAMStack site with Eleventy, Netlify, and
  more.
tags:
  - post
  - netlify
  - eleventy
  - JAM Stack
  - web apis
  - featured
---
A few years ago, I set out to create a blog for myself. After researching various CMSes, I stumbled on [Ghost](https://ghost.org/), a pretty great, developer friendly CMS. I found a prebuilt theme, dropped it in the system, and started writing. 

But I wasn't really enjoying it. The site wasn't really "my own". It was someone else's, wrapping around my words. And most importantly: I wasn't learning anything. I don't know if you've noticed, but the web is consistently changing in exciting ways. 

With this realization, in the holidays of 2019, I set out to build a site from scratch with an emphasis on learning new tools and Web APIs... and to make a slick looking site to boot.

## The Generator

I've dabbled in a handful of static site generators, mostly Hugo and some Gridsome (but explored a large number for a company project I was assigned). 

Recently, however, I've heard of a newer tool called [Eleventy](https://www.11ty.dev/docs/). Eleventy is a simple, "zero-config" static site generator with a large amount of flexibility and plugin support. It works with a multitude of templating languages, including EJS, Markdown, and Handlebars. This particular site is built using Nunjucks and Markdown.

Eleventy's documentation site is a good place to start if you're looking to learn more; you can also check out [this repository](https://github.com/p-ob/blog) for how I got my hands dirty.

## The Deployment and CMS Platform

If you're interested in building your own site, and are familiar with Git, you should definitely look into [Netlify](https://www.netlify.com/). Netlify is a very popular platform that hooks into your Git pipeline to auto deploy based off of branches (it'll even spin up "preview" URLs based on pull requests). 

Netlify's popularity in the JAM Stack ecosystem should be easy to notice, as they've recently [secured their Series C funding](https://www.netlify.com/blog/2020/03/04/netlify-secures-series-c-funding-to-push-forward-our-vision-for-the-web/)

## The UI Components

## The New (to me) Web Tech

PWA: web app manifest, service worker/offline mode (workbox)

CSS Grid/Subgrid