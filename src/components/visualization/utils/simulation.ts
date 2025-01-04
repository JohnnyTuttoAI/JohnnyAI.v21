import * as d3 from 'd3';
import { Node, Link } from '../types';

export function createSimulation(nodes: Node[], links: Link[], width: number, height: number) {
  return d3.forceSimulation<Node>(nodes)
    .force("link", d3.forceLink<Node, Link>(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(d => (d.value || 0) * 0.5));
}