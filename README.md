# Graphology Gram

[Gram](https://gram-data.github.io/gram-js/) parser & writer for [graphology](https://graphology.github.io/).

## Installation

```bash
npm install @gram-data/graphology-gram
```

## How to gram

```ts
import MakeGraph from 'graphology';
import gram from '@gram-data/graphology-gram';

const src = "(a)-->(b)<--(c)";

// Parse the gram src
var graph = gram.parse(MakeGraph, src);

var serializedGraph = gram.stringify(graph);
```