# Eaze Node.js Homework

> Our Node.js code challenge for engineering applicants

## Project

1. Get the 10 [most depended on packages](https://www.npmjs.com/browse/depended) from npm.
2. For each package, download the latest tarball from the npm registry.
3. Extract the tarball into `./packages/${pkg.name}`, e.g. `./packages/lodash`.

## Setup

Start by cloning this repo. Everything you'll need to get started is already configured for you. You'll need to commit your code at least once, but probably more often. Please use whatever commit and code style you like best, but please make sure all syntax is supported by Node v4.

We've already created an `index.js` file as your entry point. Create as many additional files as you'd like.

## Testing

We've created a failing `npm test` command for you. You can add additional tests if you'd like and even bring in a tool other than [`tape`](https://github.com/substack/tape) as long as these initial tests remain and `npm test` sets correct exit codes.

Passing tests don't guarantee that your solution is perfect but a failing test definitely indicates a problem.

## Bonus

How high can you go? Set the `COUNT` environment variable when running your tests to download more than the top 10.
- We can go as high as 1000 because we are reading a list of the top 1000 packages.

## solution
This is an alternate solution to scraping the depended webpage (https://www.npmjs.com/browse/depended). It involves reading a text file generated from https://gist.github.com/anvaka/8e8fa57c7ee1350e3491#file-01-most-dependent-upon-md. The markdown file is downloaded and saved as a text file which is read line by line and each package is downloaded. This list seems like it is updated daily so it is fairy accurate. The advantage with this approach is that we can download up to 1000 packages however we are completely dependent on someone else's efforts to generate the list.

Note: This feels like a bit of a cheat because the list is already compiled and the dependencies are already calculated for us to most of the work is done.  

## dependenies
Promise
deferred
osmosis
download-npm-package
