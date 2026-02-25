import Header from "../components/header/Header.js";
import { CreateChart } from "./CreateChart.js";
import Carousel from "../components/carousel/Carousel.js";

//Bandwidth
import BandwidthTCP from "../../data/bandwidth/tcp-summary.json" with { type: "json" };
import BandwidthUDP from "../../data/bandwidth/udp-summary.json" with { type: "json" };

//Upstream
import UpstreamTCP from "../../data/streamdirection/upstream/tcp/upstream-summary.json" with { type: "json" };;
import UpstreamUDP from "../../data/streamdirection/upstream/udp/upstream-summary.json" with { type: "json" };;

//Downstream
import DownstreamTCP from "../../data/streamdirection/downstream/tcp/downstream-summary.json" with { type: "json" };;
import DownstreamUDP from "../../data/streamdirection/downstream/udp/downstream-summary.json" with { type: "json" };;


Header("header", "UDP/TCP Performance in IoT Evaluation", true, [
  { Text: "Introduction", URL: "#introduction" },
  { Text: "Data Analysis", URL: "#data-analysis" },
  { Text: "Bandwidth & Throughput", URL: "#bandwidth" },
  { Text: "Upstream & Downstream", URL: "#streamdirection" },
  { Text: "Node Count", URL: "#node-count" },
  { Text: "Citations & References", URL: "#citations" },
]);

//Bandwidth Charts
BandwidthTCP.sort((a, b) => {
  const rateA = parseFloat(a.File.match(/rate(\d+\.?\d*)/)[1]);
  const rateB = parseFloat(b.File.match(/rate(\d+\.?\d*)/)[1]);
  return rateA - rateB;
});
BandwidthUDP.sort((a, b) => {
  const RateA = parseFloat(a.File.match(/rate(\d+\.?\d*)/)[1]);
  const RateB = parseFloat(b.File.match(/rate(\d+\.?\d*)/)[1]);
  return RateA - RateB;
});

const BandwidthTCPData = {
  label: "TCP Throughput",
  data: BandwidthTCP.map((entry) => Number(entry.Analysis.ThroughputKbps)),
  backgroundColor: "cyan",
  borderColor: "cyan",
  fill: false,
};

const BandwidthUDPData = {
  label: "UDP Throughput",
  data: BandwidthUDP.map((entry) => Number(entry.Analysis.ThroughputKbps)),
  backgroundColor: "blue",
  borderColor: "blue",
  fill: false,
};

const Labels = BandwidthTCP.map(entry => {
  const match = entry.File.match(/rate(\d+\.?\d*)/);
  return match ? `${parseInt(match[1]).toLocaleString()} bytes/s` : entry.File;
});


const PacketLossTCPData = {
  label: "TCP Packet Loss",
  data: BandwidthTCP.map(entry => Number(entry.Analysis.DropRatePercent)),
  backgroundColor: "red",
  borderColor: "red",
  fill: false,
};

const PacketLossUDPData = {
  label: "UDP Packet Loss",
  data: BandwidthUDP.map(entry => Number(entry.Analysis.DropRatePercent)),
  backgroundColor: "orange",
  borderColor: "orange",
  fill: false,
};

CreateChart("bandwidth-chart", [BandwidthTCPData, BandwidthUDPData], Labels, "line", "Transmission Rate", "Throughput (Kbps)");
CreateChart("packetloss-chart", [PacketLossTCPData, PacketLossUDPData], Labels, "line", "Transmission Rate", "Packet Loss (%)");
Carousel('carousel', ['Throughput', 'Packet Loss'], ["bandwidth-chart", "packetloss-chart"]);

//Upstream & Downstream Charts

const StreamDirectionLabels = ["Upstream TCP", "Upstream UDP", "Downstream TCP", "Downstream UDP"];
const StreamDirectionThroughputData = {
  label: "Throughput",
  data: [
    UpstreamTCP[0].Analysis.ThroughputKbps,
    UpstreamUDP[0].Analysis.ThroughputKbps,
    DownstreamTCP[0].Analysis.ThroughputKbps,
    DownstreamUDP[0].Analysis.ThroughputKbps],
  backgroundColor: ["#fc0303", "#fc4a03", "#ad03fc", "#fc03ef"],
  fill: false,
}

const StreamDirectionPacketLossData = {
  label: "Packet Loss",
  data: [
    UpstreamTCP[0].Analysis.DropRatePercent,
    UpstreamUDP[0].Analysis.DropRatePercent,
    DownstreamTCP[0].Analysis.DropRatePercent,
    DownstreamUDP[0].Analysis.DropRatePercent],
  backgroundColor: ["#0314fc", "#03adfc", "#fcad03", "#fcf803"],
  fill: false,
}

CreateChart("streamdirection-throughput-chart", [StreamDirectionThroughputData], StreamDirectionLabels, "bar", "Protocol & Direction", "Throughput (Kbps)");
CreateChart("streamdirection-packetloss-chart", [StreamDirectionPacketLossData], StreamDirectionLabels, "bar", "Protocol & Direction", "Packet Loss (%)");
Carousel('carousel-streamdirection', ['Throughput', 'Packet Loss'], ["streamdirection-throughput-chart", "streamdirection-packetloss-chart"]);

Carousel('carousel-node-count', ['Throughput', 'Packet Loss'], ["fig_a", "fig_b"]);