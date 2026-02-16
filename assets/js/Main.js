import Header from "../components/header/Header.js";
import { CreateChart } from "./CreateChart.js";
import Carousel from "../components/carousel/Carousel.js";

const Dataset1 = {
  label: "Dataset 1",
  data: [30, 80, 45, 60, 20],
  backgroundColor: "blue",
  borderColor: "blue",
  fill: false,
};

const Dataset2 = {
  label: "Dataset 2",
  data: [50, 60, 30, 80, 40],
  backgroundColor: "cyan",
  borderColor: "cyan",
  fill: false,
};

const Labels = ["A", "B", "C", "D", "E"];

Header("header", "UDP/TCP Performance in IoT Evaluation", true, [
  { Text: "Introduction", URL: "#introduction" },
  { Text: "Section #1", URL: "#section1" },
  { Text: "Citations & References", URL: "#citations" },
]);

CreateChart("chart", [Dataset1, Dataset2], Labels, "bar");
CreateChart("chart2", [Dataset2, Dataset1], Labels, "line");
Carousel('carousel', ['Chart 1', 'Chart 2'], ["chart", "chart2"]);