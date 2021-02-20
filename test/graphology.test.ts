import Graph from 'graphology';

describe('Graphology graphs', () => {
  it('can be a single node, of order 1', () => {
    const graph = new Graph();
    graph.addNode(1);
    expect(graph.order).toEqual(1);
  });
  it('can have 2 nodes and 1 edge, of order 2, size 1', () => {
    const graph = new Graph();
    graph.addNode(1);
    graph.addNode(2);
    graph.addEdge(1,2);
    expect(graph.order).toEqual(2);
    expect(graph.size).toEqual(1);
  });
});
