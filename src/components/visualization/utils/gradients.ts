import { Selection } from 'd3';

export function setupGradients(svg: Selection<SVGSVGElement, unknown, null, undefined>) {
  const defs = svg.append("defs");
  
  // Radial gradient for background
  const bgGradient = defs.append("radialGradient")
    .attr("id", "cyber-gradient")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("r", "50%");
    
  bgGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#00F0FF")
    .attr("stop-opacity", 0.2);
    
  bgGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#000")
    .attr("stop-opacity", 0);

  // Linear gradient for links
  const linkGradient = defs.append("linearGradient")
    .attr("id", "link-gradient")
    .attr("gradientUnits", "userSpaceOnUse");
    
  linkGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#00F0FF")
    .attr("stop-opacity", 0.2);
    
  linkGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#BD00FF")
    .attr("stop-opacity", 0.2);

  return defs;
}