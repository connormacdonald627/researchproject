import Header from "../components/header/Header.js";
import { CreateChart } from "./CreateChart.js";
import Carousel from "../components/carousel/Carousel.js";
import Bandwidth_TCP from "../../data/bandwidth/tcp-summary.json" with { type: "json" };
import Bandwidth_UDP from "../../data/bandwidth/udp-summary.json" with { type: "json" };

Bandwidth_TCP.sort((a, b) => {
  const rateA = parseFloat(a.File.match(/rate(\d+\.?\d*)/)[1]);
  const rateB = parseFloat(b.File.match(/rate(\d+\.?\d*)/)[1]);
  return rateA - rateB;
});
Bandwidth_UDP.sort((a, b) => {
  const RateA = parseFloat(a.File.match(/rate(\d+\.?\d*)/)[1]);
  const RateB = parseFloat(b.File.match(/rate(\d+\.?\d*)/)[1]);
  return RateA - RateB;
});

const BandwidthTCPData = {
  label: "TCP Throughput",
  data: Bandwidth_TCP.map((entry) => Number(entry.Analysis.ThroughputKbps)),
  backgroundColor: "cyan",
  borderColor: "cyan",
  fill: false,
};

const BandwidthUDPData = {
  label: "UDP Throughput",
  data: Bandwidth_UDP.map((entry) => Number(entry.Analysis.ThroughputKbps)),
  backgroundColor: "blue",
  borderColor: "blue",
  fill: false,
};

const Labels = Bandwidth_TCP.map(entry => {
  const match = entry.File.match(/rate(\d+\.?\d*)/);
  return match ? `${parseInt(match[1]).toLocaleString()} bytes/s` : entry.File;
});


const PacketLossTCPData = {
  label: "TCP Packet Loss",
  data: Bandwidth_TCP.map(entry => Number(entry.Analysis.DropRatePercent)),
  backgroundColor: "red",
  borderColor: "red",
  fill: false,
};

const PacketLossUDPData = {
  label: "UDP Packet Loss",
  data: Bandwidth_UDP.map(entry => Number(entry.Analysis.DropRatePercent)),
  backgroundColor: "orange",
  borderColor: "orange",
  fill: false,
};


Header("header", "UDP/TCP Performance in IoT Evaluation", true, [
  { Text: "Introduction", URL: "#introduction" },
  { Text: "Data Analysis", URL: "#data-analysis" },
  { Text: "Bandwidth & Throughput", URL: "#bandwidth" },
  { Text: "Node Count", URL: "#node-count" },
  { Text: "Citations & References", URL: "#citations" },
]);

CreateChart("bandwidth-chart", [BandwidthTCPData, BandwidthUDPData], Labels, "line", "Bandwidth", "Throughput (Kbps)");
CreateChart("packetloss-chart", [PacketLossTCPData, PacketLossUDPData], Labels, "line", "Bandwidth", "Packet Loss (%)");
Carousel('carousel', ['Bandwidth', 'Packet Loss'], ["bandwidth-chart", "packetloss-chart"]);



Carousel('carousel-node-count', ['Throughput', 'Packet Loss'], ["fig_a", "fig_b"]);