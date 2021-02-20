import MakeGraph from 'graphology';
import gram from '../src';

describe('gram.stringify', () => {
  it('parse/stringify "(a)"',  () => {
    const src = "(a)";
    const graph = gram.parse(src, MakeGraph);
    expect(gram.stringify(graph)).toBe(src);
  });

  it('parse/stringify "(a) (b)"',  () => {
    const src = "(a)\n(b)";
    const graph = gram.parse(src, MakeGraph);
    expect(gram.stringify(graph)).toBe(src);
  });

  it('parse/stringify "(a)-->(b)"',  () => {
    const src = "(a)-->(b)";
    const graph = gram.parse(src, MakeGraph);
    expect(gram.stringify(graph)).toBe(src);
  });

  it('parse/stringify "(a)-->(b) (c)"',  () => {
    const src = "(a)-->(b)\n(c)";
    const graph = gram.parse(src, MakeGraph);
    expect(gram.stringify(graph)).toBe(src);
  });

  it('parse/stringify "(a)-->(b)<--(c)"',  () => {
    const src = "(a)-->(b)<--(c)";
    const expected = "(a)-->(b)\n(c)-->(b)";
    const graph = gram.parse(src, MakeGraph);
    expect(gram.stringify(graph)).toBe(expected);
  });

  // it.each`
  //   src                             | nodes   | edges
  //   ${'()'}                         | ${1}    | ${0}
  //   ${'(), ()'}                     | ${2}    | ${0}
  //   ${'(), (), ()'}                 | ${3}    | ${0}
  //   ${'(), (), (), ()'}             | ${4}    | ${0}
  // `('$src has order $nodes nodes and size $edges', ({ src, nodes, edges }) => {
  //   const graph = gram.parse(MakeGraph, src);
  //   expect(graph.order).toEqual(nodes);
  //   expect(graph.size).toEqual(edges);
  // });
  // it.each`
  //   src                                | s             | i             | b
  //   ${'(1)'}                           | ${undefined}  | ${undefined}  | ${undefined}  
  //   ${'(1:First)'}                     | ${undefined}  | ${undefined}  | ${undefined}  
  //   ${'(1:First {s:"v",i:3,b:true})'}  | ${'v'}        | ${3}          | ${true}
  // `('$src has properties {s: $s, i: $i}', ({ src, s, i, b}) => {
  //   const graph = gram.parse(MakeGraph, src);
  //   expect(graph.hasNode("1")).toBeTruthy();
  //   expect(graph.getNodeAttribute("1", "s")).toBe(s);
  //   expect(graph.getNodeAttribute("1", "i")).toBe(i);
  //   expect(graph.getNodeAttribute("1", "b")).toBe(b);
  // });

});
