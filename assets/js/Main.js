import Header from "../components/header/Header.js";
import { CreateChart } from "./CreateChart.js";
import Carousel from "../components/carousel/Carousel.js";
import bandwidth_tcp from "../../data/bandwidth/tcp-summary.json" with { type: "json" };
import bandwidth_udp from "../../data/bandwidth/udp-summary.json" with { type: "json" };

bandwidth_tcp.sort((a, b) => {
  const rateA = parseFloat(a.File.match(/rate(\d+\.?\d*)/)[1]);
  const rateB = parseFloat(b.File.match(/rate(\d+\.?\d*)/)[1]);
  return rateA - rateB;
});
bandwidth_udp.sort((a, b) => {
  const rateA = parseFloat(a.File.match(/rate(\d+\.?\d*)/)[1]);
  const rateB = parseFloat(b.File.match(/rate(\d+\.?\d*)/)[1]);
  return rateA - rateB;
});

const BandwidthTCPData = {
  label: "TCP Throughput",
  data: bandwidth_tcp.map((entry) => Number(entry.Analysis.ThroughputKbps)),
  backgroundColor: "cyan",
  borderColor: "cyan",
  fill: false,
};

const BandwidthUDPData = {
  label: "UDP Throughput",
  data: bandwidth_udp.map((entry) => Number(entry.Analysis.ThroughputKbps)),
  backgroundColor: "blue",
  borderColor: "blue",
  fill: false,
};

const Labels = bandwidth_tcp.map(entry => {
  const match = entry.File.match(/rate(\d+\.?\d*)/);
  return match ? `${parseInt(match[1]).toLocaleString()} bytes/s` : entry.File;
});


const PacketLossTCPData = {
  label: "TCP Packet Loss",
  data: bandwidth_tcp.map(entry => Number(entry.Analysis.DropRatePercent)),
  backgroundColor: "red",
  borderColor: "red",
  fill: false,
};

const PacketLossUDPData = {
  label: "UDP Packet Loss",
  data: bandwidth_udp.map(entry => Number(entry.Analysis.DropRatePercent)),
  backgroundColor: "orange",
  borderColor: "orange",
  fill: false,
};


Header("header", "UDP/TCP Performance in IoT Evaluation", true, [
  { Text: "Introduction", URL: "#introduction" },
  { Text: "Data Analysis", URL: "#data-analysis" },
  { Text: "Citations & References", URL: "#citations" },
]);

CreateChart("bandwidth-chart", [BandwidthTCPData, BandwidthUDPData], Labels, "line", "Bandwidth", "Throughput (Kbps)");
CreateChart("packetloss-chart", [PacketLossTCPData, PacketLossUDPData], Labels, "line", "Bandwidth", "Packet Loss (%)");
Carousel('carousel', ['Bandwidth', 'Packet Loss'], ["bandwidth-chart", "packetloss-chart"]);



Carousel('carousel-node-count', ['Throughput', 'Packet Loss'], ["fig_a", "fig_b"]);