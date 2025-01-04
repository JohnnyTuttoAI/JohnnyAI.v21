```tsx
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { flowData } from './data';

export default function FlowsVisualization() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  // Responsive resize handler
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // Maintain aspect ratio
        const height = Math.min(400, width * 0.6);
        setDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;
    const margin = { 
      top: 20, 
      right: 20, 
      bottom: 30, 
      left: width < 400 ? 40 : 50 // Adjust margin for small screens
    };

    // Clear previous content
    svg.selectAll("*").remove();

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(flowData, d => d.timestamp) as [Date, Date])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(flowData, d => d.value) as number])
      .range([height - margin.bottom, margin.top]);

    // Create responsive line generator
    const line = d3.line<any>()
      .x(d => xScale(d.timestamp))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Add gradient
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "flow-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", height - margin.bottom)
      .attr("x2", 0)
      .attr("y2", margin.top);

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#00F0FF")
      .attr("stop-opacity", 0.2);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#BD00FF")
      .attr("stop-opacity", 0.8);

    // Add responsive area
    const area = d3.area<any>()
      .x(d => xScale(d.timestamp))
      .y0(height - margin.bottom)
      .y1(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(flowData)
      .attr("fill", "url(#flow-gradient)")
      .attr("d", area);

    // Add line
    svg.append("path")
      .datum(flowData)
      .attr("fill", "none")
      .attr("stroke", "#00F0FF")
      .attr("stroke-width", width < 400 ? 1.5 : 2)
      .attr("d", line);

    // Add responsive axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(width < 400 ? 4 : 5)
      .tickFormat(d3.timeFormat("%b %d") as any);

    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat(d => `$${d3.format(".1s")(d)}`);

    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .attr("color", "#666")
      .selectAll("text")
      .attr("class", `font-mono text-${width < 400 ? 'xs' : 'sm'}`);

    // Add y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .attr("color", "#666")
      .selectAll("text")
      .attr("class", `font-mono text-${width < 400 ? 'xs' : 'sm'}`);

    // Add touch-friendly tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "fixed bg-black/90 border border-swiss-red/20 p-2 rounded pointer-events-none hidden")
      .style("z-index", "1000");

    const bisect = d3.bisector((d: any) => d.timestamp).left;

    // Add touch-friendly overlay
    svg.append("rect")
      .attr("class", "overlay")
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .attr("width", width)
      .attr("height", height)
      .on("touchstart mousemove", function(event) {
        event.preventDefault();
        const coords = d3.pointer(event);
        const x0 = xScale.invert(coords[0]);
        const i = bisect(flowData, x0, 1);
        const d0 = flowData[i - 1];
        const d1 = flowData[i];
        const d = x0 - d0.timestamp > d1.timestamp - x0 ? d1 : d0;

        tooltip
          .style("display", "block")
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 10}px`)
          .html(`
            <div class="font-mono text-xs">
              <div class="text-gray-400">${d3.timeFormat("%B %d, %Y")(d.timestamp)}</div>
              <div class="text-cyber-blue">$${d3.format(",.0f")(d.value)}</div>
            </div>
          `);
      })
      .on("touchend mouseout", function() {
        tooltip.style("display", "none");
      });

  }, [dimensions]);

  return (
    <div ref={containerRef} className="relative w-full">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full"
        style={{ minHeight: '300px' }}
      />
    </div>
  );
}
```