import Graph, {MultiGraph} from 'graphology';
import gram, {ast, ops, value} from '@gram-data/gram';

const MISSING_ID = "🤨";

const id = (p: ast.GramPath) => p.id || MISSING_ID;

interface GraphClassConstructor {
  new(): Graph;
}

/**
 * Parse gram textual format, producing a Graphology graph.
 * 
 * @param src gram text
 * @param graphConstructor defaults to MultiGraph
 */
const parse = (src:string, graphConstructor?:GraphClassConstructor) => {
  const graph = (graphConstructor !== undefined) ? new graphConstructor() : new MultiGraph();
  const seq = gram.parse(src);
  if (ast.isGramSeq(seq)) {
    const nodes = ops.nodes(seq);
    nodes.forEach( n => {
      graph.mergeNode(id(n), n.record ? value.valueOf(n.record) : {})
    });
    seq.children.map(p => ops.edges(p)).flat().forEach( e => {
      const [source, target] = e.kind === 'right'  ? [ops.head(e), ops.tail(e)] : [ops.tail(e), ops.head(e)];
      graph.mergeEdgeWithKey(id(e), id(source), id(target), e.record ? value.valueOf(e.record) : {});
    });
  }
  return graph;
}

const hasProperties = (o:any) => Object.keys(o).length > 0

const stringifyAttributes = (attributes: any) => hasProperties(attributes) ? JSON.stringify(attributes) : '';

const stringifyNode = (node:string, attributes: any) => {
  return `(${node}${stringifyAttributes(attributes)})`;
}

const stringifyEdge = (key:string, attributes:any, source:string, target:string, sourceAttributes:any, targetAttributes:any, undirected:boolean, generatedKey:boolean) => {
  const edgeAttributes = (generatedKey || hasProperties(attributes)) ? `${generatedKey ? '' : key}${stringifyAttributes(attributes)}` : '';
  const edgeString = `-${edgeAttributes}-${undirected ? '' : '>'}`;
  return `${stringifyNode(source, sourceAttributes)}${edgeString}${stringifyNode(target, targetAttributes)}`;
}

const stringify = (graph:Graph) => {
  const tokens:String[] = [];
  const stringifiedNodeKeys = new Set<string>();
  graph.forEachDirectedEdge( (key, attributes, source, target, sourceAttributes, targetAttributes, undirected, generatedKey) => {
    stringifiedNodeKeys.add(source);
    stringifiedNodeKeys.add(target);
    tokens.push(stringifyEdge(key, attributes, source, target, sourceAttributes, targetAttributes, undirected, generatedKey))
  });
  graph.forEachNode( (key, attributes) => {
    if (!stringifiedNodeKeys.has(key)) tokens.push(stringifyNode(key, attributes))
  })
  return tokens.join("\n");
}

export default {
  parse,
  stringify
}