import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { marketData } from './data';
import { Node, Link, TokenDetails } from './types';
import { setupGradients } from './utils/gradients';
import { createSimulation } from './utils/simulation';
import TokenDetailsPanel from './TokenDetailsPanel';

export default function NetworkGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedToken, setSelectedToken] = useState<TokenDetails | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;
    
    // Setup gradients
    setupGradients(svg);

    // Create simulation
    const simulation = createSimulation(marketData.nodes, marketData.links, width, height);

    // Add zoom behavior
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });

    svg.call(zoomBehavior);

    // Create container for zoom
    const container = svg.append('g');

    // Create links
    const link = container.append("g")
      .selectAll("line")
      .data(marketData.links)
      .join("line")
      .attr("stroke", "url(#link-gradient)")
      .attr("stroke-width", d => Math.sqrt(d.value || 1));

    // Create nodes
    const node = container.append("g")
      .selectAll("circle")
      .data(marketData.nodes)
      .join("circle")
      .attr("r", d => Math.sqrt(d.value) * 2)
      .attr("fill", d => {
        switch(d.group) {
          case "major": return "#00F0FF";
          case "stable": return "#00FF9F";
          case "exchange": return "#BD00FF";
          case "meme": return "#FF0099";
          default: return "#FFFFFF";
        }
      })
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
      .on("click", (event, d) => {
        setSelectedToken({
          id: d.id,
          group: d.group,
          value: d.value,
          connections: marketData.links.filter(l => 
            l.source === d.id || l.target === d.id
          ).length
        });
      })
      .call(d3.drag<SVGCircleElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Add labels
    const label = container.append("g")
      .selectAll("text")
      .data(marketData.nodes)
      .join("text")
      .text(d => d.id)
      .attr("font-family", "var(--font-mono)")
      .attr("font-size", "12px")
      .attr("fill", "#FFFFFF")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em");

    // Add hover effects
    node.on("mouseover", function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", d => Math.sqrt(d.value) * 2.5);

      // Highlight connected links
      link.style("opacity", l => 
        l.source === d || l.target === d ? 1 : 0.1
      );
    })
    .on("mouseout", function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", d => Math.sqrt(d.value) * 2);

      link.style("opacity", 1);
    });

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as Node).x || 0)
        .attr("y1", d => (d.source as Node).y || 0)
        .attr("x2", d => (d.target as Node).x || 0)
        .attr("y2", d => (d.target as Node).y || 0);

      node
        .attr("cx", d => d.x || 0)
        .attr("cy", d => d.y || 0);

      label
        .attr("x", d => d.x || 0)
        .attr("y", d => d.y || 0);
    });

    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="w-3 h-3 rounded-full bg-cyber-blue"></span>
          <span>Major</span>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="w-3 h-3 rounded-full bg-[#00FF9F]"></span>
          <span>Stable</span>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="w-3 h-3 rounded-full bg-cyber-purple"></span>
          <span>Exchange</span>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="w-3 h-3 rounded-full bg-cyber-pink"></span>
          <span>Meme</span>
        </div>
      </div>

      <svg
        ref={svgRef}
        className="w-full h-[600px]"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
      />

      {selectedToken && (
        <TokenDetailsPanel token={selectedToken} onClose={() => setSelectedToken(null)} />
      )}
    </div>
  );
}