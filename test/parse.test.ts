import MakeGraph from 'graphology';
import gram from '../src';


describe('gram.parse nodes', () => {
  it('"()", graph order 1',  () => {
    const src = "()";
    const graph = gram.parse(src, MakeGraph);
    expect(graph.order).toEqual(1);
  });
  it('"(),()", graph order 2',  () => {
    const src = "(),()";
    const graph = gram.parse(src, MakeGraph);
    expect(graph.order).toEqual(2);
  });
  it.each`
    src                             | nodes   | edges
    ${'()'}                         | ${1}    | ${0}
    ${'(), ()'}                     | ${2}    | ${0}
    ${'(), (), ()'}                 | ${3}    | ${0}
    ${'(), (), (), ()'}             | ${4}    | ${0}
  `('$src has order $nodes nodes and size $edges', ({ src, nodes, edges }) => {
    const graph = gram.parse(src, MakeGraph);
    expect(graph.order).toEqual(nodes);
    expect(graph.size).toEqual(edges);
  });
  it.each`
    src                                | s             | i             | b
    ${'(1)'}                           | ${undefined}  | ${undefined}  | ${undefined}  
    ${'(1:First)'}                     | ${undefined}  | ${undefined}  | ${undefined}  
    ${'(1:First {s:"v",i:3,b:true})'}  | ${'v'}        | ${3}          | ${true}
  `('$src has properties {s: $s, i: $i}', ({ src, s, i, b}) => {
    const graph = gram.parse(src, MakeGraph);
    expect(graph.hasNode("1")).toBeTruthy();
    expect(graph.getNodeAttribute("1", "s")).toBe(s);
    expect(graph.getNodeAttribute("1", "i")).toBe(i);
    expect(graph.getNodeAttribute("1", "b")).toBe(b);
  });

});


describe('gram.parse edges', () => {
  it('"()", graph size 0',  () => {
    const src = "()";
    const graph = gram.parse(src, MakeGraph);
    expect(graph.size).toEqual(0);
  });
  it('"()-->()", graph size 1',  () => {
    const src = "()-->()";
    const graph = gram.parse(src, MakeGraph);
    expect(graph.size).toEqual(1);
  });
  it('"(a)-->(b)<--(c)", graph size 2',  () => {
    const src = "(a)-->(b)<--(c)";
    const graph = gram.parse(src, MakeGraph);
    expect(graph.size).toEqual(2);
  });
  it.each`
    src                             | nodes   | edges
    ${'()'}                         | ${1}    | ${0}
    ${'()-->()'}                    | ${2}    | ${1}
    ${'()-->(), ()'}                | ${3}    | ${1}
    ${'()-->()<--()'}               | ${3}    | ${2}
    ${'()-->(), ()-->()'}           | ${4}    | ${2}
    ${'()-->()--()-->()'}           | ${4}    | ${3}
  `('$src has order $nodes nodes and size $edges', ({ src, nodes, edges }) => {
    const graph = gram.parse(src, MakeGraph);
    expect(graph.order).toEqual(nodes);
    expect(graph.size).toEqual(edges);
  });
  it.each`
    src                                      | s             | i             | b
    ${'()-[r]->()'}                          | ${undefined}  | ${undefined}  | ${undefined}  
    ${'()-[r:First]-()'}                     | ${undefined}  | ${undefined}  | ${undefined}  
    ${'()-[r:First {s:"v",i:3,b:true}]-()'}  | ${'v'}        | ${3}          | ${true}
  `('$src has properties {s: $s, i: $i}', ({ src, s, i, b}) => {
    const graph = gram.parse(src, MakeGraph);
    // @ts-ignore
    expect(graph.hasEdge("r")).toBeTruthy();
    expect(graph.getEdgeAttribute("r", "s")).toBe(s);
    expect(graph.getEdgeAttribute("r", "i")).toBe(i);
    expect(graph.getEdgeAttribute("r", "b")).toBe(b);
  });

});
