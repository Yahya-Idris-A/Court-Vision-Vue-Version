<template>
  <div id="basketballCourt"></div>
</template>

<script setup>
import { onMounted } from "vue";

const props = defineProps({
  width: Number,
  height: Number,
});

function drawBasketballCourt() {
  const width = props.width;
  const height = props.height;

  const lineColor = "#FFFFFF";
  const courtColor = "#F2A93B";
  const svgNS = "http://www.w3.org/2000/svg";

  const scaleX = width / 28.65;
  const scaleY = height / 15.24;

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const courtBackground = document.createElementNS(svgNS, "rect");
  courtBackground.setAttribute("x", 0);
  courtBackground.setAttribute("y", 0);
  courtBackground.setAttribute("width", width);
  courtBackground.setAttribute("height", height);
  courtBackground.setAttribute("fill", courtColor);
  svg.appendChild(courtBackground);

  // Garis sideline dan baseline
  const outline = document.createElementNS(svgNS, "rect");
  outline.setAttribute("x", 0);
  outline.setAttribute("y", 0);
  outline.setAttribute("width", width);
  outline.setAttribute("height", height);
  outline.setAttribute("stroke", lineColor);
  outline.setAttribute("stroke-width", 2);
  outline.setAttribute("fill", "none");
  svg.appendChild(outline);

  // Garis tengah
  const centerLine = document.createElementNS(svgNS, "line");
  centerLine.setAttribute("x1", width / 2);
  centerLine.setAttribute("y1", 0);
  centerLine.setAttribute("x2", width / 2);
  centerLine.setAttribute("y2", height);
  centerLine.setAttribute("stroke", lineColor);
  centerLine.setAttribute("stroke-width", 2);
  svg.appendChild(centerLine);

  // Lingkaran tengah (3.66m radius)
  const centerCircle = document.createElementNS(svgNS, "circle");
  centerCircle.setAttribute("cx", width / 2);
  centerCircle.setAttribute("cy", height / 2);
  centerCircle.setAttribute("r", 1.83 * scaleX);
  centerCircle.setAttribute("stroke", lineColor);
  centerCircle.setAttribute("stroke-width", 2);
  centerCircle.setAttribute("fill", "none");
  svg.appendChild(centerCircle);

  // Three-point line kiri (garis horizontal 1.575m + lengkungan 6.75m radius)
  const left3PointLine1 = document.createElementNS(svgNS, "line");
  left3PointLine1.setAttribute("x1", 0);
  left3PointLine1.setAttribute("y1", height / 2 - 6.75 * scaleY);
  left3PointLine1.setAttribute("x2", 1.575 * scaleX);
  left3PointLine1.setAttribute("y2", height / 2 - 6.75 * scaleY);
  left3PointLine1.setAttribute("stroke", lineColor);
  left3PointLine1.setAttribute("stroke-width", 2);
  svg.appendChild(left3PointLine1);

  const left3PointLine2 = document.createElementNS(svgNS, "line");
  left3PointLine2.setAttribute("x1", 0);
  left3PointLine2.setAttribute("y1", height / 2 + 6.75 * scaleY);
  left3PointLine2.setAttribute("x2", 1.575 * scaleX);
  left3PointLine2.setAttribute("y2", height / 2 + 6.75 * scaleY);
  left3PointLine2.setAttribute("stroke", lineColor);
  left3PointLine2.setAttribute("stroke-width", 2);
  svg.appendChild(left3PointLine2);

  const left3PointArc = document.createElementNS(svgNS, "path");
  left3PointArc.setAttribute(
    "d",
    `M ${1.575 * scaleX} ${height / 2 - 6.75 * scaleY} A ${6.75 * scaleX} ${
      6.75 * scaleY
    } 0 0 1 ${1.575 * scaleX} ${height / 2 + 6.75 * scaleY}`
  );
  left3PointArc.setAttribute("stroke", lineColor);
  left3PointArc.setAttribute("stroke-width", 2);
  left3PointArc.setAttribute("fill", "none");
  svg.appendChild(left3PointArc);

  // Three-point line kanan
  const right3PointLine1 = document.createElementNS(svgNS, "line");
  right3PointLine1.setAttribute("x1", width);
  right3PointLine1.setAttribute("y1", height / 2 - 6.75 * scaleY);
  right3PointLine1.setAttribute("x2", width - 1.575 * scaleX);
  right3PointLine1.setAttribute("y2", height / 2 - 6.75 * scaleY);
  right3PointLine1.setAttribute("stroke", lineColor);
  right3PointLine1.setAttribute("stroke-width", 2);
  svg.appendChild(right3PointLine1);

  const right3PointLine2 = document.createElementNS(svgNS, "line");
  right3PointLine2.setAttribute("x1", width);
  right3PointLine2.setAttribute("y1", height / 2 + 6.75 * scaleY);
  right3PointLine2.setAttribute("x2", width - 1.575 * scaleX);
  right3PointLine2.setAttribute("y2", height / 2 + 6.75 * scaleY);
  right3PointLine2.setAttribute("stroke", lineColor);
  right3PointLine2.setAttribute("stroke-width", 2);
  svg.appendChild(right3PointLine2);

  const right3PointArc = document.createElementNS(svgNS, "path");
  right3PointArc.setAttribute(
    "d",
    `M ${width - 1.575 * scaleX} ${height / 2 - 6.75 * scaleY} A ${
      6.75 * scaleX
    } ${6.75 * scaleY} 0 0 0 ${width - 1.575 * scaleX} ${
      height / 2 + 6.75 * scaleY
    }`
  );
  right3PointArc.setAttribute("stroke", lineColor);
  right3PointArc.setAttribute("stroke-width", 2);
  right3PointArc.setAttribute("fill", "none");
  svg.appendChild(right3PointArc);

  // Kotak kunci kiri (4.9m lebar, 5.8m tinggi)
  const leftKey = document.createElementNS(svgNS, "rect");
  leftKey.setAttribute("x", 0);
  leftKey.setAttribute("y", height / 2 - 2.9 * scaleY);
  leftKey.setAttribute("width", 4.9 * scaleX);
  leftKey.setAttribute("height", 5.8 * scaleY);
  leftKey.setAttribute("stroke", lineColor);
  leftKey.setAttribute("stroke-width", 2);
  leftKey.setAttribute("fill", "none");
  svg.appendChild(leftKey);

  // Kotak kunci kanan
  const rightKey = document.createElementNS(svgNS, "rect");
  rightKey.setAttribute("x", width - 4.9 * scaleX);
  rightKey.setAttribute("y", height / 2 - 2.9 * scaleY);
  rightKey.setAttribute("width", 4.9 * scaleX);
  rightKey.setAttribute("height", 5.8 * scaleY);
  rightKey.setAttribute("stroke", lineColor);
  rightKey.setAttribute("stroke-width", 2);
  rightKey.setAttribute("fill", "none");
  svg.appendChild(rightKey);

  // Semi-circle di dalam kotak kunci kiri (1.575m radius)
  const leftRestrictedAreaArc = document.createElementNS(svgNS, "path");
  leftRestrictedAreaArc.setAttribute(
    "d",
    `M ${4.9 * scaleX} ${height / 2 - 1.575 * scaleY} A ${1.575 * scaleX} ${
      1.575 * scaleY
    } 0 0 1 ${4.9 * scaleX} ${height / 2 + 1.575 * scaleY}`
  );
  leftRestrictedAreaArc.setAttribute("stroke", lineColor);
  leftRestrictedAreaArc.setAttribute("stroke-width", 2);
  leftRestrictedAreaArc.setAttribute("fill", "none");
  svg.appendChild(leftRestrictedAreaArc);

  // Semi-circle di dalam kotak kunci kanan
  const rightRestrictedAreaArc = document.createElementNS(svgNS, "path");
  rightRestrictedAreaArc.setAttribute(
    "d",
    `M ${width - 4.9 * scaleX} ${height / 2 - 1.575 * scaleY} A ${
      1.575 * scaleX
    } ${1.575 * scaleY} 0 0 0
            ${width - 4.9 * scaleX} ${height / 2 + 1.575 * scaleY}`
  );
  rightRestrictedAreaArc.setAttribute("stroke", lineColor);
  rightRestrictedAreaArc.setAttribute("stroke-width", 2);
  rightRestrictedAreaArc.setAttribute("fill", "none");
  svg.appendChild(rightRestrictedAreaArc);

  // Ring basket kiri (0.45m radius)
  const leftBasketCircle = document.createElementNS(svgNS, "circle");
  leftBasketCircle.setAttribute("cx", 1.22 * scaleX + 0.45 * scaleX);
  leftBasketCircle.setAttribute("cy", height / 2);
  leftBasketCircle.setAttribute("r", 0.45 * scaleX);
  leftBasketCircle.setAttribute("stroke", lineColor);
  leftBasketCircle.setAttribute("stroke-width", 2);
  leftBasketCircle.setAttribute("fill", "none");
  svg.appendChild(leftBasketCircle);

  const leftBasketLine = document.createElementNS(svgNS, "line");
  leftBasketLine.setAttribute("x1", 1.22 * scaleX);
  leftBasketLine.setAttribute("y1", height / 2 - 0.915 * scaleY);
  leftBasketLine.setAttribute("x2", 1.22 * scaleX);
  leftBasketLine.setAttribute("y2", height / 2 + 0.915 * scaleY);
  leftBasketLine.setAttribute("stroke", lineColor);
  leftBasketLine.setAttribute("stroke-width", 2);
  svg.appendChild(leftBasketLine);

  // Ring basket kanan (0.45m radius)
  const rightBasketCircle = document.createElementNS(svgNS, "circle");
  rightBasketCircle.setAttribute("cx", width - (1.22 * scaleX + 0.45 * scaleX));
  rightBasketCircle.setAttribute("cy", height / 2);
  rightBasketCircle.setAttribute("r", 0.45 * scaleX);
  rightBasketCircle.setAttribute("stroke", lineColor);
  rightBasketCircle.setAttribute("stroke-width", 2);
  rightBasketCircle.setAttribute("fill", "none");
  svg.appendChild(rightBasketCircle);

  const rightBasketLine = document.createElementNS(svgNS, "line");
  rightBasketLine.setAttribute("x1", width - 1.22 * scaleX);
  rightBasketLine.setAttribute("y1", height / 2 - 0.915 * scaleY);
  rightBasketLine.setAttribute("x2", width - 1.22 * scaleX);
  rightBasketLine.setAttribute("y2", height / 2 + 0.915 * scaleY);
  rightBasketLine.setAttribute("stroke", lineColor);
  rightBasketLine.setAttribute("stroke-width", 2);
  svg.appendChild(rightBasketLine);

  document.getElementById("basketballCourt").innerHTML = "";
  document.getElementById("basketballCourt").appendChild(svg);
}

onMounted(() => {
  drawBasketballCourt();
});
</script>
