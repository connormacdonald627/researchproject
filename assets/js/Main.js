import Header from "../components/header/Header.js";
import { CreateChart } from "./CreateChart.js";
import Carousel from "../components/carousel/Carousel.js";
import bandwidth_tcp from "../../data/bandwidth/tcp-summary.json" with { type: "json" };
import bandwidth_udp from "../../data/bandwidth/udp-summary.json" with { type: "json" };

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
  label: "TCP Packet Loss (%)",
  data: bandwidth_tcp.map(entry => Number(entry.Analysis.DropRatePercent)),
  backgroundColor: "red",
  borderColor: "red",
  fill: false,
};

const PacketLossUDPData = {
  label: "UDP Packet Loss (%)",
  data: bandwidth_udp.map(entry => Number(entry.Analysis.DropRatePercent)),
  backgroundColor: "orange",
  borderColor: "orange",
  fill: false,
};


Header("header", "UDP/TCP Performance in IoT Evaluation", true, [
  { Text: "Introduction", URL: "#introduction" },
  { Text: "Section #1", URL: "#section1" },
  { Text: "Citations & References", URL: "#citations" },
]);

CreateChart("bandwidth", [BandwidthTCPData, BandwidthUDPData], Labels, "line", "Network Scenario", "Throughput (Kbps)");
CreateChart("packetloss", [PacketLossTCPData, PacketLossUDPData], Labels, "line", "Network Scenario", "Packet Loss (%)");
Carousel('carousel', ['Bandwidth', 'Packet Loss'], ["bandwidth", "packetloss"]);